"use client"

import { useState, useMemo } from "react"

const METHODS = [
  { key: "snowball",  label: "Snowball",  desc: "Smallest balance first" },
  { key: "avalanche", label: "Avalanche", desc: "Highest interest first" },
  { key: "emotional", label: "Emotional", desc: "Most hated first" },
]

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }
function fmtDec(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

function simulate(cards, extraPayment) {
  if (!cards.length || cards.every(c => !c.balance)) return null

  let balances = cards.map(c => ({ ...c, remaining: parseFloat(c.balance) || 0, interestPaid: 0 }))
  const totalMin = balances.reduce((s, c) => s + (parseFloat(c.min) || 0), 0)
  const extra = parseFloat(extraPayment) || 0
  let months = 0
  let totalInterest = 0

  while (balances.some(b => b.remaining > 0) && months < 600) {
    balances.forEach(b => {
      if (b.remaining <= 0) return
      const rate = (parseFloat(b.rate) || 0) / 100 / 12
      const interest = b.remaining * rate
      totalInterest += interest
      b.interestPaid += interest
      b.remaining += interest
      const payment = Math.min(parseFloat(b.min) || 0, b.remaining)
      b.remaining -= payment
      if (b.remaining < 0.01) b.remaining = 0
    })
    if (extra > 0) {
      const target = balances.find(b => b.remaining > 0)
      if (target) {
        target.remaining = Math.max(0, target.remaining - extra)
      }
    }
    months++
  }

  return { months, totalInterest, cards: balances }
}

export default function DebtPayoffCalculator({ cards: initialCards, nextId: initialNextId }) {
  const [cards, setCards] = useState(initialCards)
  const [method, setMethod] = useState("snowball")
  const [extra, setExtra] = useState("")
  const [results, setResults] = useState(null)
  const [nextId, setNextId] = useState(initialNextId)

  const updateCard = (id, field, value) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const addCard = () => {
    setCards(prev => [...prev, { id: nextId, name: "", balance: "", rate: "", min: "", priority: "" }])
    setNextId(n => n + 1)
  }

  const removeCard = (id) => {
    if (cards.length === 1) return
    setCards(prev => prev.filter(c => c.id !== id))
  }

  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => {
      if (method === "snowball")  return (parseFloat(a.balance) || 0) - (parseFloat(b.balance) || 0)
      if (method === "avalanche") return (parseFloat(b.rate) || 0) - (parseFloat(a.rate) || 0)
      if (method === "emotional") return (parseFloat(b.priority) || 0) - (parseFloat(a.priority) || 0)
      return 0
    })
  }, [cards, method])

  const calculate = () => {
    setResults(simulate(sortedCards, extra))
  }

  const totalBalance = cards.reduce((s, c) => s + (parseFloat(c.balance) || 0), 0)
  const maxInterest = results ? Math.max(...results.cards.map(c => c.interestPaid)) : 0

  return (
    <div className="cc-card">
      {cards.map((c, i) => (
        <div className="cc-debt-card" key={c.id}>
          <div className="cc-debt-card-header">
            <span className="cc-card-num">{String(i + 1).padStart(2, "0")}</span>
            <input
              className="cc-name-input"
              placeholder="Card name (e.g. Chase Sapphire)"
              value={c.name}
              onChange={e => updateCard(c.id, "name", e.target.value)}
            />
            {cards.length > 1 && (
              <button className="cc-remove-btn" onClick={() => removeCard(c.id)} title="Remove">✕</button>
            )}
          </div>
          <div className="cc-fields">
            <div className="cc-field-wrap">
              <label className="cc-field-label">Balance</label>
              <span className="cc-field-prefix">$</span>
              <input className="cc-num-input" type="number" min="0" placeholder="0"
                value={c.balance} onChange={e => updateCard(c.id, "balance", e.target.value)} />
            </div>
            <div className="cc-field-wrap">
              <label className="cc-field-label">APR</label>
              <input className="cc-num-input no-prefix" type="number" min="0" step="0.01" placeholder="0.00"
                value={c.rate} onChange={e => updateCard(c.id, "rate", e.target.value)} />
              <span className="cc-field-suffix">%</span>
            </div>
            <div className="cc-field-wrap">
              <label className="cc-field-label">Min payment</label>
              <span className="cc-field-prefix">$</span>
              <input className="cc-num-input" type="number" min="0" placeholder="0"
                value={c.min} onChange={e => updateCard(c.id, "min", e.target.value)} />
            </div>
          </div>
          {method === "emotional" && (
            <div style={{ marginTop: ".6rem" }}>
              <div className="cc-field-wrap" style={{ maxWidth: "160px" }}>
                <label className="cc-field-label">Stress level (1–10)</label>
                <input className="cc-num-input no-prefix" type="number" min="1" max="10" placeholder="5"
                  value={c.priority} onChange={e => updateCard(c.id, "priority", e.target.value)} />
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="cc-add-btn" onClick={addCard}>+ Add another card</button>

      <div className="cc-method-row">
        <span className="cc-method-label">Payoff strategy</span>
        <div className="cc-method-tabs">
          {METHODS.map(m => (
            <button key={m.key} className={"cc-method-tab" + (method === m.key ? " on" : "")}
              onClick={() => setMethod(m.key)}>
              {m.label} <span style={{ opacity: .6, fontSize: "10px", marginLeft: ".3rem" }}>{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cc-extra-row">
        <span className="cc-extra-label">Extra monthly payment</span>
        <span className="cc-extra-prefix">$</span>
        <input className="cc-extra-input" type="number" min="0" placeholder="0"
          value={extra} onChange={e => setExtra(e.target.value)} />
      </div>

      <button className="cc-calc-btn" onClick={calculate}>Calculate payoff plan →</button>

      {results && (
        <div className="cc-results">
          <div className="cc-result-grid">
            <div className="cc-result-cell">
              <p className="cc-result-label">Total balance</p>
              <p className="cc-result-val">{fmt(totalBalance)}</p>
            </div>
            <div className="cc-result-cell">
              <p className="cc-result-label">Payoff time</p>
              <p className="cc-result-val">
                {results.months >= 600 ? "50+ yrs" : results.months < 12
                  ? results.months + " mo"
                  : Math.floor(results.months / 12) + "y " + (results.months % 12) + "m"}
              </p>
            </div>
            <div className="cc-result-cell">
              <p className="cc-result-label">Total interest</p>
              <p className="cc-result-val red">{fmtDec(results.totalInterest)}</p>
            </div>
          </div>

          <div className="cc-payoff-order">
            <p className="cc-payoff-label">Payoff order — {METHODS.find(m => m.key === method)?.label} method</p>
            <div className="cc-payoff-list">
              {sortedCards.filter(c => parseFloat(c.balance) > 0).map((c, i) => {
                const res = results.cards.find(r => r.id === c.id)
                const barPct = maxInterest > 0 ? Math.round((res?.interestPaid || 0) / maxInterest * 100) : 0
                return (
                  <div className="cc-payoff-row" key={c.id}>
                    <span className="cc-payoff-pos">{i + 1}</span>
                    <span className="cc-payoff-name">{c.name || "Card " + (i + 1)}</span>
                    <span className="cc-payoff-detail">{fmt(parseFloat(c.balance) || 0)} · {c.rate || 0}% APR</span>
                    <div className="cc-payoff-bar-wrap">
                      <div className="cc-payoff-bar" style={{ width: barPct + "%" }} />
                    </div>
                    <span className="cc-payoff-detail">{fmtDec(res?.interestPaid || 0)} interest</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="cc-interest-note">
            At minimum payments only, you would pay <span>{fmtDec(results.totalInterest)}</span> in interest over <span>{results.months} months</span>. Adding even <span>$50/month</span> extra can significantly reduce both the timeline and total cost.
          </div>
        </div>
      )}
    </div>
  )
}
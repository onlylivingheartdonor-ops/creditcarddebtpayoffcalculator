"use client"

import { useState, useMemo } from "react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .cc-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .cc-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .cc-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .cc-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .cc-title em { font-style: italic; color: #b91c1c; }
  .cc-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .cc-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .cc-debt-card { border: 1px solid #e0dbd3; border-radius: 3px; padding: 1rem; margin-bottom: .75rem; position: relative; transition: border-color .15s; }
  .cc-debt-card:hover { border-color: #b91c1c; }
  .cc-debt-card-header { display: flex; align-items: center; gap: .75rem; margin-bottom: .75rem; }
  .cc-card-num { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #ddd; min-width: 1.5rem; }
  .cc-name-input { flex: 1; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .3rem 0; outline: none; transition: border-color .2s; }
  .cc-name-input:focus { border-color: #b91c1c; }
  .cc-name-input::placeholder { color: #ccc; }
  .cc-remove-btn { background: none; border: none; cursor: pointer; color: #ccc; font-size: 1rem; padding: .2rem; transition: color .15s; line-height: 1; }
  .cc-remove-btn:hover { color: #b91c1c; }
  .cc-fields { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .75rem; }
  .cc-field-wrap { position: relative; }
  .cc-field-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #aaa; display: block; margin-bottom: .25rem; }
  .cc-field-prefix { position: absolute; left: 0; bottom: .35rem; font-size: .9rem; color: #aaa; }
  .cc-field-suffix { position: absolute; right: 0; bottom: .35rem; font-size: .9rem; color: #aaa; }
  .cc-num-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .3rem 1rem .3rem 1rem; outline: none; transition: border-color .2s; text-align: right; }
  .cc-num-input.no-prefix { padding-left: 0; }
  .cc-num-input:focus { border-color: #b91c1c; }

  .cc-add-btn { display: flex; align-items: center; gap: .5rem; background: none; border: 1px dashed #e0dbd3; border-radius: 3px; width: 100%; padding: .75rem 1rem; font-family: 'DM Mono', monospace; font-size: 12px; color: #aaa; cursor: pointer; transition: all .15s; margin-bottom: 1.25rem; }
  .cc-add-btn:hover { border-color: #b91c1c; color: #b91c1c; }

  .cc-method-row { margin-bottom: 1.25rem; }
  .cc-method-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .5rem; }
  .cc-method-tabs { display: flex; gap: .5rem; flex-wrap: wrap; }
  .cc-method-tab { padding: .5rem 1rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; transition: all .15s; background: none; }
  .cc-method-tab.on { border-color: #b91c1c; background: #fff5f5; color: #b91c1c; }

  .cc-extra-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
  .cc-extra-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; white-space: nowrap; }
  .cc-extra-input { flex: 1; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .3rem 0 .3rem 1rem; outline: none; transition: border-color .2s; }
  .cc-extra-input:focus { border-color: #b91c1c; }
  .cc-extra-prefix { font-size: .9rem; color: #aaa; }

  .cc-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .cc-calc-btn:hover { background: #b91c1c; }

  .cc-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .cc-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .cc-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .cc-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .cc-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .cc-result-val.red { color: #b91c1c; }
  .cc-result-val.green { color: #1a6b3a; }

  .cc-payoff-order { margin-bottom: 1rem; }
  .cc-payoff-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .6rem; }
  .cc-payoff-list { display: flex; flex-direction: column; gap: .4rem; }
  .cc-payoff-row { display: flex; align-items: center; gap: .75rem; padding: .6rem .9rem; background: #faf8f4; border-radius: 2px; font-size: 12px; }
  .cc-payoff-pos { font-family: 'DM Serif Display', serif; font-size: 1rem; color: #ddd; min-width: 1.2rem; }
  .cc-payoff-name { flex: 1; color: #1a1a1a; }
  .cc-payoff-detail { color: #888; }
  .cc-payoff-bar-wrap { flex: 1; height: 3px; background: #e0dbd3; border-radius: 2px; overflow: hidden; }
  .cc-payoff-bar { height: 100%; background: #b91c1c; border-radius: 2px; transition: width .5s; }

  .cc-interest-note { font-size: 12px; color: #888; line-height: 1.6; padding: .9rem 1rem; background: #fff8f8; border: 1px solid #fcd4d4; border-radius: 3px; }
  .cc-interest-note span { color: #b91c1c; }

  .cc-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .cc-info-item { padding: .75rem; border-left: 2px solid #fcd4d4; }
  .cc-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cc-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .cc-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .cc-prose p:last-child { margin-bottom: 0; }
  .cc-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .cc-prose ul li { margin-bottom: .3rem; }

  .cc-strategy-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
  .cc-strategy-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fcd4d4; line-height: 1; margin-bottom: .4rem; }
  .cc-strategy-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cc-strategy-body { font-size: 12px; color: #888; line-height: 1.5; }

  .cc-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cc-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fcd4d4; line-height: 1; margin-bottom: .4rem; }
  .cc-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .cc-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .cc-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .cc-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .cc-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .cc-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .cc-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .cc-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .cc-fields { grid-template-columns: 1fr 1fr; }
    .cc-result-grid, .cc-strategy-grid { grid-template-columns: 1fr; }
    .cc-info-grid, .cc-tip-grid { grid-template-columns: 1fr; }
  }
`

const METHODS = [
  { key: "snowball",  label: "Snowball",  desc: "Smallest balance first" },
  { key: "avalanche", label: "Avalanche", desc: "Highest interest first" },
  { key: "emotional", label: "Emotional", desc: "Most hated first" },
]

const RELATED = [
  { label: "Credit Card Debt Payoff Calculator",  href: "https://creditcarddebtpayoffcalculator.com" },
  { label: "Debt Reducing Calculator",            href: "https://debtreducingcalculator.com" },
  { label: "Side Hustle Tax Estimator",           href: "https://sidehustletaxestimator.com" },
  { label: "High Yield Savings Calculator",       href: "https://highyieldsavingscalculator.com" },
  { label: "Retirement Savings Gap",              href: "https://retirementsavingsgap.com" },
  { label: "Life Insurance Coverage Calculator",  href: "https://lifeinsurancecoveragecalculator.com" },
  { label: "Online Course ROI Calculator",        href: "https://onlinecourseroi.com" },
  { label: "Subscription Cost Calculator",        href: "https://mysubscriptioncost.com" },
  { label: "Email Attachment Size Checker",       href: "https://emailattachmentsize.com" },
  { label: "GPA Calculator",                      href: "https://gpacalculator.site" },
  { label: "YouTube Title Checker",               href: "https://youtubetitlechecker.com" },
  { label: "Strong Password Builder",             href: "https://strongpasswordbuilder.com" },
  { label: "Cool Username Generator",             href: "https://coolusernamegenerator.com" },
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
    // Apply interest and minimums to all cards
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
    // Apply extra to first non-zero card
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

export default function Page() {
  const [cards, setCards] = useState([
    { id: 1, name: "", balance: "", rate: "", min: "", priority: "" },
  ])
  const [method, setMethod]   = useState("snowball")
  const [extra, setExtra]     = useState("")
  const [results, setResults] = useState(null)
  const [nextId, setNextId]   = useState(2)

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
  const maxInterest  = results ? Math.max(...results.cards.map(c => c.interestPaid)) : 0

  return (
    <>
      <style>{css}</style>
      <main className="cc-wrap">

        <div className="cc-header">
          <p className="cc-eyebrow">Personal Finance</p>
          <h1 className="cc-title">Credit Card<br /><em>Debt Payoff Planner</em></h1>
        </div>

        {/* TOOL */}
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
                <button key={m.key} className={`cc-method-tab${method === m.key ? " on" : ""}`}
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
                      ? `${results.months} mo`
                      : `${Math.floor(results.months / 12)}y ${results.months % 12}m`}
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
                        <span className="cc-payoff-name">{c.name || `Card ${i + 1}`}</span>
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

        {/* STRATEGIES */}
        <div className="cc-card">
          <p className="cc-section-title">The three payoff strategies</p>
          <div className="cc-strategy-grid">
            <div>
              <p className="cc-strategy-num">01</p>
              <p className="cc-strategy-title">Snowball</p>
              <p className="cc-strategy-body">Pay off the smallest balance first, regardless of interest rate. Each card you eliminate frees up its minimum payment to attack the next one. The wins come faster, which helps with motivation — research suggests many people stick with this method longer as a result.</p>
            </div>
            <div>
              <p className="cc-strategy-num">02</p>
              <p className="cc-strategy-title">Avalanche</p>
              <p className="cc-strategy-body">Target the highest interest rate first. This is mathematically optimal — you pay less total interest over time. It takes longer to see a card paid off, but every dollar goes further. Best suited for people who can stay motivated without quick wins.</p>
            </div>
            <div>
              <p className="cc-strategy-num">03</p>
              <p className="cc-strategy-title">Emotional</p>
              <p className="cc-strategy-body">Eliminate the card that causes the most stress, regardless of balance or rate. Sometimes the psychological relief of eliminating a particular creditor — an old debt, a high-fee card, a store account you resent — is worth more than pure optimization.</p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="cc-card">
          <p className="cc-section-title">How this calculator works</p>
          <div className="cc-prose">
            <p>Enter the balance, APR, and minimum payment for each card you carry. The calculator simulates month-by-month repayment using compound interest, applying your chosen strategy to determine which card receives any extra payment beyond minimums.</p>
            <p>The payoff order shows your cards sorted by the selected strategy. The interest bar for each card shows how much of your total interest cost each one contributes — longer bars mean that card is costing you more over time, which is useful context regardless of which strategy you choose.</p>
            <p>Adding an extra monthly payment accelerates the simulation significantly. Even a modest extra amount — $25 or $50 — applied consistently to the priority card can cut months or years off the payoff timeline.</p>
          </div>
          <div className="cc-info-grid">
            <div className="cc-info-item">
              <p className="cc-info-title">Compound interest</p>
              <p className="cc-info-body">Credit card interest compounds monthly. The calculator applies your APR divided by 12 to the remaining balance each month before subtracting your payment — matching how your actual statement works.</p>
            </div>
            <div className="cc-info-item">
              <p className="cc-info-title">Minimum payments</p>
              <p className="cc-info-body">The simulation holds your minimum payments fixed. In reality, many issuers recalculate minimums as balances drop — meaning fixed minimums are a conservative estimate that slightly overstates payoff time.</p>
            </div>
            <div className="cc-info-item">
              <p className="cc-info-title">Extra payment routing</p>
              <p className="cc-info-body">Any extra payment you specify goes entirely to the first card in your chosen payoff order each month, then rolls to the next card once that balance is cleared — the core mechanic of all three strategies.</p>
            </div>
            <div className="cc-info-item">
              <p className="cc-info-title">Stress level field</p>
              <p className="cc-info-body">The stress level (1–10) only appears when the Emotional strategy is selected. It has no effect on the other two methods — you can leave it blank when using Snowball or Avalanche.</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="cc-card">
          <p className="cc-section-title">Tips for getting out of credit card debt faster</p>
          <div className="cc-tip-grid">
            <div>
              <p className="cc-tip-num">01</p>
              <p className="cc-tip-title">Stop adding to the balance</p>
              <p className="cc-tip-body">No payoff strategy works if the balance keeps growing. Freezing new charges — even temporarily — while you pay down debt is often the single most effective step you can take.</p>
            </div>
            <div>
              <p className="cc-tip-num">02</p>
              <p className="cc-tip-title">Consider a balance transfer</p>
              <p className="cc-tip-body">Many issuers offer 0% APR promotional periods for transferred balances. Moving a high-rate balance to a 0% card for 12–18 months can dramatically reduce interest cost — but watch for transfer fees and what happens when the promo ends.</p>
            </div>
            <div>
              <p className="cc-tip-num">03</p>
              <p className="cc-tip-title">Automate your payments</p>
              <p className="cc-tip-body">Set up automatic payments at or above the minimum to avoid late fees and interest penalties. Even one missed payment can set back progress by weeks and damage your credit score.</p>
            </div>
            <div>
              <p className="cc-tip-num">04</p>
              <p className="cc-tip-title">Use windfalls strategically</p>
              <p className="cc-tip-body">Tax refunds, bonuses, or side income applied directly to your priority card can compress a multi-year payoff into months. Even a single lump payment makes a meaningful dent in both balance and total interest.</p>
            </div>
          </div>
        </div>

        {/* CONTEXT */}
        <div className="cc-card">
          <p className="cc-section-title">Understanding the real cost of carrying a balance</p>
          <div className="cc-prose">
            <p>The average credit card APR in the US sits above 20%, which means a $5,000 balance paying only minimums can take over a decade to clear and cost more in interest than the original debt. Most people significantly underestimate this because the monthly interest charge is easy to overlook when it&apos;s folded into a single statement number.</p>
            <p>Carrying a balance also affects your credit utilization ratio — one of the biggest factors in your credit score. High utilization (above 30% of your available credit) suppresses your score, which can raise the cost of other borrowing like auto loans or mortgages. Paying down cards improves utilization and often produces a measurable score improvement within one or two billing cycles.</p>
            <p>If you&apos;re carrying balances on multiple cards, the combined interest cost is usually far higher than it appears. This calculator makes that total visible — which is often the most motivating thing of all.</p>
          </div>
        </div>

        {/* RELATED */}
        <div className="cc-card">
          <p className="cc-section-title">Related tools</p>
          <div className="cc-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="cc-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="cc-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume fixed minimum payments and do not account for fees, promotional rates, or changes in APR. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="cc-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

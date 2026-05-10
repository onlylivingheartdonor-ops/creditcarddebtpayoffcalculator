"use client"

import { useState } from "react"

export default function Page() {
  const [cards, setCards] = useState([
    { name: "", balance: 0, rate: 0, min: 0, priority: 0 }
  ])
  const [method, setMethod] = useState("snowball")

  const updateCard = (index, field, value) => {
    const updated = [...cards]
    updated[index][field] = value
    setCards(updated)
  }

  const addCard = () => {
    setCards([
      ...cards,
      { name: "", balance: 0, rate: 0, min: 0, priority: 0 }
    ])
  }

  const sortedCards = [...cards].sort((a, b) => {
    if (method === "snowball") return a.balance - b.balance
    if (method === "avalanche") return b.rate - a.rate
    if (method === "emotional") return b.priority - a.priority
    return 0
  })

  let months = 0
  let totalInterest = 0

  let balances = sortedCards.map(c => ({
    ...c,
    remaining: c.balance
  }))

  while (balances.some(b => b.remaining > 0) && months < 600) {
    balances.forEach(b => {
      if (b.remaining > 0) {
        const monthlyRate = b.rate / 100 / 12
        const interest = b.remaining * monthlyRate
        totalInterest += interest
        b.remaining = b.remaining + interest - b.min
        if (b.remaining < 0) b.remaining = 0
      }
    })
    months++
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        background: "#f4f6fb",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
          padding: "0.8rem 1.5rem",
          fontWeight: 600
        }}
      >
        Credit Card Debt Payoff Planner
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h1>Credit Card Debt Payoff Planner</h1>
        <p>
          Compare different payoff strategies for multiple credit cards —
          snowball, avalanche, or paying off the card you hate most first.
        </p>

        <div
          style={{
            background: "#ffffff",
            padding: "1.5rem",
            borderRadius: "10px",
            marginTop: "1.5rem"
          }}
        >
          {cards.map((c, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <input
                placeholder="Card name"
                value={c.name}
                onChange={(e) => updateCard(i, "name", e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "6px" }}
              />

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  type="number"
                  placeholder="Balance ($)"
                  onChange={(e) =>
                    updateCard(i, "balance", Number(e.target.value))
                  }
                  style={{ padding: "8px", width: "140px" }}
                />
                <input
                  type="number"
                  placeholder="APR (%)"
                  onChange={(e) =>
                    updateCard(i, "rate", Number(e.target.value))
                  }
                  style={{ padding: "8px", width: "120px" }}
                />
                <input
                  type="number"
                  placeholder="Min Payment ($)"
                  onChange={(e) =>
                    updateCard(i, "min", Number(e.target.value))
                  }
                  style={{ padding: "8px", width: "160px" }}
                />
                <input
                  type="number"
                  placeholder="Hate level (1–10)"
                  onChange={(e) =>
                    updateCard(i, "priority", Number(e.target.value))
                  }
                  style={{ padding: "8px", width: "160px" }}
                />
              </div>
            </div>
          ))}

          <button onClick={addCard} style={{ marginBottom: "1rem" }}>
            + Add Credit Card
          </button>

          <div style={{ marginBottom: "1rem" }}>
            <strong>Payoff Method:</strong>{" "}
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{ padding: "6px", marginLeft: "6px" }}
            >
              <option value="snowball">Snowball (smallest balance)</option>
              <option value="avalanche">Avalanche (highest interest)</option>
              <option value="emotional">Emotional (hate most first)</option>
            </select>
          </div>

          <div
            style={{
              background: "#f8fafc",
              padding: "1rem",
              borderRadius: "8px"
            }}
          >
            <div><strong>Estimated payoff time:</strong> {months} months</div>
            <div><strong>Total interest paid:</strong> ${totalInterest.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px"
        }}
      >
        <h2>Payoff Strategies Explained</h2>
        <ul>
          <li><strong>Snowball:</strong> Pay off the smallest balance first for quick wins.</li>
          <li><strong>Avalanche:</strong> Pay off the highest interest card first to save money.</li>
          <li><strong>Emotional:</strong> Eliminate the card that causes the most stress.</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "2rem",
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px"
        }}
      >
        <div
  style={{
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    marginBottom: "1.5rem"
  }}
>
  <h2>Related Tools</h2>
  <ul>
    <li onClick={() => window.location.href = "https://creditcarddebtpayoffcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Credit Card Debt Payoff Calculator
    </li>
    <li onClick={() => window.location.href = "https://debtreducingcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Debt Reducing Calculator
    </li>
    <li onClick={() => window.location.href = "https://sidehustletaxestimator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Side Hustle Tax Estimator
    </li>
    <li onClick={() => window.location.href = "https://highyieldsavingscalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      High Yield Savings Calculator
    </li>
    <li onClick={() => window.location.href = "https://retirementsavingsgap.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Retirement Savings Gap
    </li>
    <li onClick={() => window.location.href = "https://lifeinsurancecoveragecalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Life Insurance Coverage Calculator
    </li>
    <li onClick={() => window.location.href = "https://onlinecourseroi.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Online Course ROI Calculator
    </li>
    <li onClick={() => window.location.href = "https://mysubscriptioncost.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Subscription Cost Calculator
    </li>
    <li onClick={() => window.location.href = "https://emailattachmentsize.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Email Attachment Size Checker
    </li>
    <li onClick={() => window.location.href = "https://gpacalculator.site"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      GPA Calculator
    </li>
    <li onClick={() => window.location.href = "https://youtubetitlechecker.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      YouTube Title Checker
    </li>
    <li onClick={() => window.location.href = "https://strongpasswordbuilder.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Strong Password Builder
    </li>
    <li onClick={() => window.location.href = "https://coolusernamegenerator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Cool Username Generator
    </li>
  </ul>
</div>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "13px", color: "#666" }}>
        This tool provides estimates for informational purposes only.
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "13px", color: "#555" }}>
        This site may use cookies and analytics. By using this site,
        you agree to our Privacy Policy and Terms of Service.
      </div>

      <div
        style={{
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e2e8f0",
          fontSize: "14px"
        }}
      >
        <span onClick={() => window.location.href = "/privacy"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Privacy Policy
        </span>
        {" | "}
        <span onClick={() => window.location.href = "/terms"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Terms of Service
        </span>
      </div>
    </main>
  )
}

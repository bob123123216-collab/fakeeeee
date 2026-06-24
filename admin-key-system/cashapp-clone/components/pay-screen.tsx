"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function PayScreen({
  amount,
  balance,
  onBack,
  onConfirm,
}: {
  amount: number
  balance: number
  onBack: () => void
  onConfirm: (username: string, note: string) => void
}) {
  const [query, setQuery] = useState("")
  const [recipient, setRecipient] = useState<string | null>(null)
  const [note, setNote] = useState("")

  const cleaned = query.trim().replace(/^\$/, "")
  const insufficient = amount > balance

  if (recipient) {
    return (
      <div className="flex h-full flex-col px-5 pb-6 pt-4">
        <header className="flex items-center">
          <button
            type="button"
            onClick={() => setRecipient(null)}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full active:bg-muted"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">Paying</p>
          <p className="mt-1 text-xl font-semibold text-foreground">${recipient}</p>
          <p className="mt-6 text-6xl font-semibold tabular-nums text-foreground">{formatMoney(amount)}</p>
          {insufficient && (
            <p className="mt-4 text-sm font-medium text-destructive">Not enough balance for this payment</p>
          )}
        </div>

        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="For pizza 🍕"
          className="mb-4 w-full rounded-2xl bg-muted px-4 py-3 text-center text-base text-foreground outline-none placeholder:text-muted-foreground"
        />

        <button
          type="button"
          disabled={insufficient}
          onClick={() => onConfirm(recipient, note)}
          className="h-14 rounded-full bg-cash-green text-lg font-semibold text-cash-green-foreground transition-opacity disabled:opacity-40"
        >
          Pay {formatMoney(amount)}
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-4">
      <header className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-muted"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <p className="text-lg font-semibold text-foreground">To</p>
      </header>

      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="$Cashtag, name, or phone"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-4 flex-1 overflow-y-auto">
        {cleaned.length > 0 && (
          <button
            type="button"
            onClick={() => setRecipient(cleaned)}
            className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left active:bg-muted"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cash-green text-cash-green-foreground font-semibold">
              {cleaned.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-foreground">${cleaned}</p>
              <p className="text-sm text-muted-foreground">Send {formatMoney(amount)}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

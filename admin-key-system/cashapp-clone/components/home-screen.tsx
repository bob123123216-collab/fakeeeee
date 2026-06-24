"use client"

import { Clock } from "lucide-react"
import { CashAvatar } from "./cash-avatar"
import { Keypad } from "./keypad"
import type { CashProfile } from "@/hooks/use-cash-store"

function formatBalance(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export function HomeScreen({
  profile,
  amount,
  onKey,
  onPay,
  onRequest,
  onOpenSettings,
  onOpenActivity,
}: {
  profile: CashProfile
  amount: string
  onKey: (key: string) => void
  onPay: () => void
  onRequest: () => void
  onOpenSettings: () => void
  onOpenActivity: () => void
}) {
  const display = amount === "" ? "0" : amount
  const canPay = Number(amount) > 0

  return (
    <div className="flex h-full flex-col px-5 pb-5 pt-4">
      <header className="flex items-center justify-between">
        <button type="button" onClick={onOpenSettings} aria-label="Open profile settings">
          <CashAvatar avatar={profile.avatar} username={profile.username} className="h-10 w-10 text-base" />
        </button>
        <button
          type="button"
          onClick={onOpenActivity}
          aria-label="Activity"
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors active:bg-muted"
        >
          <Clock className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={onOpenSettings}
          className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
        >
          {formatBalance(profile.balance)} available
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex items-start text-foreground">
          <span className="mt-3 text-4xl font-semibold tabular-nums">$</span>
          <span className="text-7xl font-semibold tabular-nums">{display}</span>
        </div>
      </div>

      <Keypad onPress={onKey} />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onRequest}
          disabled={!canPay}
          className="h-14 rounded-full bg-muted text-lg font-semibold text-foreground transition-opacity disabled:opacity-40"
        >
          Request
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={!canPay}
          className="h-14 rounded-full bg-cash-green text-lg font-semibold text-cash-green-foreground transition-opacity disabled:opacity-40"
        >
          Pay
        </button>
      </div>
    </div>
  )
}

// Cash App shows a recipient's photo + display name as soon as you type their
// $cashtag. We don't have a real user directory, so we deterministically derive
// a believable profile (avatar color, initial, and display name) from the
// cashtag itself. The same cashtag always produces the same profile.

const AVATAR_COLORS = [
  "#00C244", // green
  "#1E90FF", // blue
  "#00BFA5", // teal
  "#FF7A00", // orange
  "#FF3B30", // red
  "#FF2D78", // pink
] as const

export type PreviewProfile = {
  clean: string
  cashtag: string
  color: string
  initial: string
  displayName: string
}

export function previewProfile(input: string): PreviewProfile {
  const clean = input.replace(/^\$/, "").trim()

  let hash = 0
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) >>> 0
  }

  const color = AVATAR_COLORS[hash % AVATAR_COLORS.length]
  const initial = (clean.charAt(0) || "?").toUpperCase()

  // Turn "johnDoe_22", "john.doe", "john-doe" into "John Doe".
  const words = clean
    .replace(/[_\-.]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\d+/g, "")
    .trim()

  const displayName = (words || clean)
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return {
    clean,
    cashtag: `$${clean}`,
    color,
    initial,
    displayName: displayName || clean,
  }
}

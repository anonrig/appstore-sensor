export function ensureArray(value) {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

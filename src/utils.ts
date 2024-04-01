export function coerceToRuleSlug(input: string): string {
  return input
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll('"', "")
    .replaceAll("'", "")
    .replaceAll(".", "");
}

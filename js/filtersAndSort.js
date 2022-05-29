export function sortNew(a, b) {
  return Date.parse(b.date) - Date.parse(a.date);
}

//filters posts after tags
export function filterTag(event) {
  for (let tag of event.tags) {
    if (this == tag) {
      return true;
    }
  }
}

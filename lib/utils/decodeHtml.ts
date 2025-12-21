export function decodeHtmlEntities(input: string) {
  if (!input) return "";
  
  if (typeof window === "undefined") return input;

  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}
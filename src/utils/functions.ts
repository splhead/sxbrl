type Element = {
  [K: string]: Element | Array<Element> | string
}
// type ParsedElement = {
//   [K: string]: Element | [ParsedElement] | string
// }

export function simplifyObject(element: Element): Element {
  const entries = Object.entries(element)

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (Array.isArray(value)) {
        const [head] = value

        if (!head) throw new Error(`Arquivo inválido! ${key}`)

        return [key, [simplifyObject(head)]]
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return [key, value]
      }
      return [key, simplifyObject(value)]
    }),
  )
}

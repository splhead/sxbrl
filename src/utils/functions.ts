type Element = {
  [K: string]: Element | Array<Element> | string
}

export type Leaf = string | number

export type Tree =
  | Array<Tree>
  | Readonly<{
      [k in string]: Tree | Leaf
    }>

export function simplifyObject(
  element: Element | Element[],
  repeatableKey: string,
): Element {
  const entries = Object.entries(element)

  return Object.fromEntries(
    entries.map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        return [key, value]
      }
      if (key === repeatableKey && Array.isArray(value)) {
        const [head] = value

        if (!head) throw new Error(`Arquivo inválido! ${key}`)

        return [key, [simplifyObject(head, repeatableKey)]]
      }
      return [key, simplifyObject(value, repeatableKey)]
    }),
  )
}

export function isLeaf<T>(data: T | Leaf): data is Leaf {
  return typeof data === 'string' || typeof data === 'number'
}

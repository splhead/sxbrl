// type Element = {
//   [K: string]: Element | Array<Element> | string
// }

// export type Leaf = string | number

// export type Tree =
//   | Array<Tree>
//   | Readonly<{
//       [k in string]?: Tree | Leaf
//     }>

export type Tree = {
  [k in string]: Array<Tree> | Tree | string | number
}

export function simplifyObject(
  element: Tree | Tree[],
  repeatableKey: string,
): Tree {
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

export function isLeaf(data: Tree[string]): data is string | number {
  return typeof data === 'string' || typeof data === 'number'
}

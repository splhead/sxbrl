/* eslint-disable @typescript-eslint/no-namespace */
export type Tree = {
  [k in string]: Array<Tree> | Tree | string | number
}

function updateTreeArray(fn: (item: Tree) => Tree) {
  return (array: Array<Tree>): Array<Tree> => array.map(fn)
}

function updateTreeLeaf(
  fn: (leaf: string | number, key: keyof Tree) => [keyof Tree, Tree[string]],
) {
  return (tree: Tree): Tree => {
    return Object.fromEntries(
      Object.entries(tree).map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, updateTreeArray(updateTreeLeaf(fn))(value)]
        }

        if (typeof value === 'object') {
          return [key, updateTreeLeaf(fn)(value)]
        }

        return fn(value, key)
      }),
    )
  }
}

export const Tree = {
  updateTreeLeaf,
}
/*
  export function transformNodes<T>(
    tree: Tree,
    fn: (element: Element, key: keyof Tree) => T,
  ): T {
    const entries = Object.entries(tree)

    const attributes = entries.filter(
      (item): item is [`@_${string}`, string] => {
        const isAttribute = item[0].startsWith('@_')
        if (isAttribute && typeof item[1] !== 'string') {
          throw Error(`Attribute ${item[0]} is not string`)
        }
        return isAttribute
      },
    )

    const text = entries.find(([key]) => {
      return key === '#text'
    })

    const children = entries
      .filter((item) => {
        return !item[0].startsWith('@_') || item[0] !== '#text'
      })
      .map(([key, value]): T | Leaf => {
        if (Array.isArray(value)) {
          return [
            key,
            value.map((state) => {
              return Tree.transformNodes(state, fn)
            }),
          ]
        }

        if (typeof value === 'object') {
          return [key, Tree.transformNodes(value, fn)]
        }

        return fn(atributes
          {
            attributes: [],
            children: [],
          },
          key,
        )
      })

    return fn({ attributes, children }, '')
  }*/

/*
class Tree {
  
  public state: Map<keyof ITree, ITree[string]>

  constructor(state: ITree) {
    this.state = new Map(state)
  }

  add(key: keyof ITree, value: ITree[string]) {
    this.state.set(key, value)
  }

  forEach(fn: (value: ITree[string], key: keyof ITree) => void) {
    for (const [key, value] of this.state.entries()) {
      fn(value, key)
    }
  }

  transform(
    fn: (
      value: ITree[string],
      key: keyof ITree,
    ) => [ITree[string], keyof ITree],
  ) {
    return Object.fromEntries(
      [...this.state.entries()].map(([key, value]) => {
        const [nextValue, nextKey] = fn(value, key)
        return [nextKey, nextValue]
      }),
    )
  }
}*/
/*
function main() {
  const tree: Tree = { a: { b: 'c' }, d: 'silas' }

  const transformedTree = Tree.transformLeaf(tree, (value, key) => {
    return [key, value.toString().toUpperCase() + ' alguma coisa']
  })

  console.log('nextTree', transformedTree)
}

main()*/

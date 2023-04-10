import { DatasourceConfig } from '@/datasources/connectors/datasourcesutils'

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
      if (Array.isArray(value)) {
        if (key === repeatableKey) {
          const [head] = value

          if (!head) throw new Error(`Arquivo inválido! ${key}`)

          return [key, [simplifyObject(head, repeatableKey)]]
        }
        return [key, value]
      }

      return [key, simplifyObject(value, repeatableKey)]
    }),
  )
}

export function isLeaf(data: Tree[string]): data is string | number {
  return typeof data === 'string' || typeof data === 'number'
}

export function assertConnectorType<T extends DatasourceConfig>(
  datasourceConfig: DatasourceConfig,
  type: string,
): asserts datasourceConfig is T {
  if (datasourceConfig.connector !== type) {
    throw new Error(`Configuração do conector diferente de ${type}`)
  }
}

export interface Connector {
  query<T>(sql: string): Promise<T[]>
}
export interface Datasource {
  getData<T>(sql: string): Promise<T[]>
}

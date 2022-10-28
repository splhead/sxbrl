import sqlite3, { Database } from 'sqlite3'
import path from 'path'
import { Datasource } from './datasource'

class Sqlite3Datasource implements Datasource {
  private database: Database | null = null

  constructor(private databaseFileName: string) {}

  private async connect(databaseFileName: string) {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(__dirname, '..', databaseFileName)
      this.database = new sqlite3.Database(
        absolutePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) reject(err)

          resolve(
            console.log(`Conectou com a fonte de dados sqlite ${absolutePath}`),
          )
        },
      )
    })
  }

  async getData<T>(sql: string): Promise<T[]> {
    await this.connect(this.databaseFileName)

    return new Promise((resolve, reject) => {
      this.database?.all(sql, [], (error, rows) => {
        if (error) reject(error)
        resolve(rows)
      })
    })
  }

  close() {
    console.log('Encerrou a conexão com a fonte de dados sqlite')
    this.database?.close()
  }
}

export { Sqlite3Datasource }

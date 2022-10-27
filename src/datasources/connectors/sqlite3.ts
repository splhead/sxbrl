import sqlite3, { Database } from 'sqlite3'
import path from 'path'
import { Connector } from './connector'

class Sqlite3Datasource implements Connector {
  private database: Database | null = null

  constructor(private databaseFileName: string) {
  }

  private async connect(databaseFileName: string) {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(__dirname, '..', databaseFileName)
      this.database = new sqlite3.Database(absolutePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) reject(err)

        resolve(console.log(`Conectou no banco sqlite ${absolutePath}`))

      })
    })
  }

  async query<T>(sql: string): Promise<T[]> {
    await this.connect(this.databaseFileName)

    return new Promise((resolve, reject) => {
      this.database?.all(sql, [], (error, rows) => {
        if (error) reject(error)
        if (this.database) {
          this.close()
        }
        resolve(rows)
      })

    })


  }

  private close() {
    console.log('Conexão com banco encerrada')
    this.database?.close()
  }
}

export { Sqlite3Datasource }
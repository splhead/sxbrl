import { assertConnectorType } from '@/utils/functions';
import { Client } from 'pg'
import { datasourceConfig } from '../config/datasource';
import { DataModelMSC, Datasource } from "./datasource";
import { PostgresConnector } from './datasourcesutils';

export class PostgresDatasource implements Datasource {
  private client: Client | null = null

  private async connect() {
    assertConnectorType<PostgresConnector>(datasourceConfig, 'postgres')
    this.client = new Client({
      host: datasourceConfig.host,
      port: datasourceConfig.port,
      user: datasourceConfig.user,
      password: datasourceConfig.password,
      database: datasourceConfig.database
    })
    await this.client.connect()
    console.log('Conectado ao banco postgres')
  }

  async getData(sql?: string | undefined): Promise<DataModelMSC[]> {
    await this.connect()
    return new Promise((resolve, reject) => {
      if (!sql) reject(new Error('SQL não definido'))
      else {
        this.client?.query(sql, (err, res) => {
          if (err) {
            console.log('Erro ao buscar dados no postgres')
            reject(err)
          }
          console.log('obtendo dados no postgres')
          resolve(res.rows)
        })
      }
    })
  }

  close(): void {
    console.log('finalizando a conexão com postgres')
    this.client?.end()
  }

}
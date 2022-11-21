import { Datasource } from "./datasource";

class MysqlDatasource implements Datasource {

  async getData<T>(sql: string): Promise<T[]> {

    throw new Error("Method not implemented.");
  }

  close() {
    
  }

}

export { MysqlDatasource }
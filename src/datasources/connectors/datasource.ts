/**
  Espera - se que os registros resultantes
  da consulta SQL obedeção o tipo DataModelMSC. 
  Ou seja, segue a estrutura descrita abaixo
*/

export type DataModelMSC = Array<{
  conta: string
  ic1: string
  tipo1: string
  ic2: string
  tipo2: string
  ic3: string
  tipo3: string
  ic4: string
  tipo4: string
  ic5: string
  tipo5: string
  ic6: string
  tipo6: string
  valor: number
  tipo_valor: string
  natureza_valor: string
}>

export interface Datasource {
  /**
 * Pode receber a consulta ao banco de dados relacional e vincula os dados a estrutura definida no DataModelMSC.
 * Caso NoSQL não recebera a instrução de consulta.
 * @param sql 
 * @returns 
 */
  getData(sql?: string): Promise<DataModelMSC[]>
  /**
   * Encerra a conexão com a fonte de dados. Todos as classes conectoras são obrigadas a implementar a função close.
   */
  close(): void
}


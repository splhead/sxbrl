# Criador de instancias XBRL

## Requisitos
- node versão 16 ou superior
- yarn

## Configuração
 1 - Renomeie o arquivo `.env.example` para `.env`
 
 2 - Crie as variáveis de ambiente necessária conforme o conector de fonte de dados que irá utilizar

 3 - Use as variáveis criadas no arquivo `datasource/config/datasource.ts`

 4 - Edite o arquivo template em `template/default.xml` conforme sua necessidade

 5 - Instale as dependências com `yarn install`

 6 - Transpile o código com `yarn build`

 7 - Execute com `yarn start`, se tudo ocorrer como esperado será gerado o arquivo `dist/instances/instance.xml`

 ## Criar novo conector
 Deve implementar a interface/contrato/protocolo contido em `src/datasources/connectors/datasource.ts`

 Adicionar a no arquivo `src/datasources/connectors/datasourcesutils.ts` na constante `datasourcesAvailable` a classe criada
 e também a tipagem de suas configurações em `DatasourceConfig`

 Observação: sua fonte de dados deve retornar cada linha no seguinte formato, conforme o tipo descrito em `src/datasources/connectors/datasource.ts`
 ```
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
  ```
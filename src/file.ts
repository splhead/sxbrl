import fs from 'fs'
import path from 'path'

const relativePath = path.resolve(__dirname)
console.log(relativePath)
const readFilePromise = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err)
      console.log(`Lendo arquivo ${filePath}`)
      resolve(data)
    })
  })
}

const writeFilePromise = (filePath: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, { flag: 'w+' }, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export function writeTextFile(pathname: string) {
  return (data: string) => {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, pathname),
        data,
        { flag: 'w+' },
        (err) => {
          if (err) reject(err)
          resolve()
        },
      )
    })
  }
}

export function writeInstanceFile(filename: string) {
  console.log(`Escrevendo arquivo ${filename}`)
  return writeTextFile(path.join('instances', filename))
}

export { readFilePromise, writeFilePromise }

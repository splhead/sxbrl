import fs from 'fs'

const readFilePromise = (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export { readFilePromise }

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Goal } from '../app'

const dbPath = path.join(__dirname, '.', 'data.json')

function writeFile(content: any) {
    const stringifiedContent = JSON.stringify(content, null, 2)
    fs.writeFileSync(dbPath, stringifiedContent, { flag: 'w' })
}

function readFile() {
    const fileContent = fs.readFileSync(dbPath, 'utf-8')
    const data = JSON.parse(fileContent)

    return data
}

export class StorageManager {
    static store(goals: Goal[]) {
        writeFile(goals)
    }

    static getData() {
        let data: Goal[]

        try {
            data = readFile()

            if (data.length === 0) {
                console.warn('No data was recovered')
            }
        } catch (error) {
            console.warn('Error reading file:', error)
            console.warn('No data was recovered')

            data = []
        }

        return data
    }
}

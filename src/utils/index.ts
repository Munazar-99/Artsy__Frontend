import { supriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

export const getRandomPrompt = (prompt:string):string => {
    const randomIndex = Math.floor(Math.random() * supriseMePrompts.length)
    const randomPrompt = supriseMePrompts[randomIndex]

    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt)
    }

    return randomPrompt;
}

export const downloadImage = (_id:string, photo:string) => {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
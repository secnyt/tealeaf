export default class Error {
    constructor (index, indexEnd, name, details) {
        this.index = index
        this.indexEnd = indexEnd
        this.name = name
        this.details = details
    }

    getFormattedText () {
        let text = `Error in file ${this.index.fileName}, line ${this.index.l + 1}:\n${this.name}: ${this.details}`
        return text
    }
}

export class IllegalCharError extends Error {
    constructor (index, indexEnd, details) {
        super(index, indexEnd,'Illegal Character', details);
    }
}

export class InvalidSyntaxError extends Error {
    constructor (index, indexEnd, details) {
        super(index, indexEnd,'Invalid Syntax', details);
    }
}
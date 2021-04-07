export default class Position {
    constructor (i, l, c, fileName, fileText) {
        this.i = i
        this.l = l
        this.c = c
        this.fileName = fileName
        this.fileText = fileText
    }

    advance (char) {
        this.i ++
        this.c ++

        if (char === '\n') {
            this.l ++
            this.c = 0
        }
    }

    copy () {
        return new Position(this.i, this.l, this.c, this.fileName, this.fileText)
    }
}
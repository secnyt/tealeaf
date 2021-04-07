export default class Token {
    constructor (t, v, index, indexEnd) {
        this.type = t
        this.value = v

        this.index = index ? index.copy() : null
        this.indexEnd = indexEnd ? indexEnd.copy() : null
        if (this.index && !this.indexEnd) {
            this.indexEnd = this.index.copy()
            this.indexEnd.advance()
        }
    }

    getFormattedText () {
        return this.value ? `${this.type}:${this.value}` : `${this.type}`
    }

    static types = {
        INT: 'INT',
        FLOAT: 'FLOAT',
        PLUS: 'PLUS',
        MINUS: 'MINUS',
        MUL: 'MUL',
        DIV: 'DIV',
        LPAREN: 'LPAREN',
        RPAREN: 'RPAREN',
        EOF: 'EOF',
    }
}
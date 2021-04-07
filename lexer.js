import Token from "./token.js";
import {IllegalCharError} from "./error.js";
import Position from "./position.js";

export default class Lexer {
    constructor (fileName, text) {
        this.fileName = fileName
        this.text = text
        this.pos = new Position(-1, 0, -1, fileName, text)
        this.char = null
        this.advance()
    }

    advance () {
        this.pos.advance(this.char)
        this.char = this.pos.i < this.text.length ? this.text[this.pos.i] : null
        return this.char
    }

    createTokens () {
        let tokens = []

        while (this.char != null) {
            if (' \t'.includes(this.char)) {
                this.advance()
                continue
            } else if (/\d/.test(this.char)) {
                tokens.push(this.createNumber())
                continue
            } else if (this.char === '+') {
                tokens.push(new Token(Token.types.PLUS, null, this.pos))
            } else if (this.char === '-') {
                tokens.push(new Token(Token.types.MINUS, null, this.pos))
            } else if (this.char === '*') {
                tokens.push(new Token(Token.types.MUL, null, this.pos))
            } else if (this.char === '/') {
                tokens.push(new Token(Token.types.DIV, null, this.pos))
            } else if (this.char === '(') {
                tokens.push(new Token(Token.types.LPAREN, null, this.pos))
            } else if (this.char === ')') {
                tokens.push(new Token(Token.types.RPAREN, null, this.pos))
            } else {
                let start = this.pos.copy()
                return {
                    tokens: [],
                    err: new IllegalCharError(start, this.pos, `'${this.char}'`),
                }
            }
            this.advance()
        }

        tokens.push(new Token(Token.types.EOF, null, this.pos))
        return {
            tokens: tokens,
            err: null,
        }
    }

    createNumber () {
        let num = ''
        let dot = false
        let index = this.pos.copy()

        while (this.char != null && /\d|\./.test(this.char)) {
            if (this.char === '.') {
                if (dot) break
                dot = true
                num += '.'
            } else {
                num += this.char
            }
            this.advance()
        }

        if (dot) {
            return new Token(Token.types.FLOAT, num, index, this.pos)
        } else {
            return new Token(Token.types.INT, num, index, this.pos)
        }
    }
}
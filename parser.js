import Token from "./token.js";
import {BinaryOperationNode, NumberNode} from "./nodes.js";
import {InvalidSyntaxError} from "./error.js";

export class ParseResult {
    constructor () {
        this.error = null
        this.node = null
    }

    register (res) {
        if (res instanceof ParseResult) {
            if (res.error) this.error = res.error
            return res.node
        }
        return res
    }

    success (node) {
        this.node = node
        return this
    }

    failure (err) {
        this.error = err
        return this
    }
}

export default class Parser {
    constructor (tokens) {
        this.tokens = tokens
        this.pos = -1
        this.token = null
        this.advance()
    }

    advance () {
        this.pos += 1
        this.token = this.pos < this.tokens.length ? this.tokens[this.pos] : null
        return this.token
    }

    parse () {
        let result = new ParseResult()
        let expression = this.getExpression()
        if (!expression.error && this.token.type !== Token.types.EOF) {
            return {
                ast: result.failure(new InvalidSyntaxError(this.token.index, this.token.indexEnd, `Expected '+', '-', '*', or '/'`))
            }
        }
        return { ast: result.success(expression) }
    }

    getFactor () {
        let result = new ParseResult()
        if (this.token.type === Token.types.INT || this.token.type === Token.types.FLOAT) {
            let factor = new NumberNode(this.token)
            result.register(this.advance())
            if (result.error) return result
            return result.success(factor)
        }

        let missingNumberError = new InvalidSyntaxError(this.token.index, this.token.indexEnd, "Expected int or float")
        return result.failure(missingNumberError)
    }

    getTerm () {
        return this.binaryOperation(this.getFactor, this.getFactor, [Token.types.MUL, Token.types.DIV])
    }

    getExpression () {
        return this.binaryOperation(this.getTerm, this.getTerm, [Token.types.PLUS, Token.types.MINUS])
    }

    binaryOperation (getLeft, getRight, operations) {
        let result = new ParseResult()
        let left = result.register(getLeft.bind(this)())
        if (result.error) return result

        while (operations.includes(this.token?.type)) {
            let operationToken = this.token
            result.register(this.advance())
            let right = result.register(getRight.bind(this)())
            if (result.err) return
            left = new BinaryOperationNode(left, operationToken, right)
        }

        return result.success(left)
    }
}

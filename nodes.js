export class NumberNode {
    constructor (token) {
        this.token = token
    }

    getFormattedText () {
        return `${this.token.getFormattedText()}`
    }
}

export class BinaryOperationNode {
    constructor (left, operatorToken, right) {
        this.left = left
        this.operatorToken = operatorToken
        this.right = right
    }

    getFormattedText () {
        return `(${this.left.getFormattedText()} ${this.operatorToken.getFormattedText()} ${this.right?.getFormattedText()})`
    }
}
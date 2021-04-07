import Lexer from "./lexer.js";
import readline from 'readline'
import Parser from "./parser.js";

export class TeaLeaf {
    static prompt () {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })


        rl.question("tl > ", (text) => {
            let { tokens, err, ast } = run('<stdin>', text)
            if (err) {
                console.log(err.getFormattedText())
            } else {
                console.log('Tokens: ', tokens?.map(t => t.getFormattedText()))
                if (ast) {
                    if (ast.error) {
                        console.log(ast.error.getFormattedText())
                    } else {
                        console.log('AST: ', ast.node.getFormattedText())
                    }
                } else {
                    console.log('Something went wrong.')
                }
            }
            rl.close()

            setTimeout(TeaLeaf.prompt, 100)
        })
    }
}

TeaLeaf.prompt()

export function run (fn, text) {
    let lexer = new Lexer(fn, text)
    let { tokens, err, } = lexer.createTokens()
    if (err) {
        return {
            tokens: tokens,
            err: err,
        }
    }

    let parser = new Parser(tokens)
    let { ast } = parser.parse()

    return {
        tokens: tokens,
        err: err,
        ast: ast?.node || ast,
    }
}
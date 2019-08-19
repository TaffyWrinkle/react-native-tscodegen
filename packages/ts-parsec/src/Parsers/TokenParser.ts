import { Token } from '../Lexer';
import { Parser, ParseError, ParseResult } from './ParserInterface';

export function nil<T>(): Parser<T, undefined> {
    return {
        parse(token: Token<T> | undefined): ParseResult<T, undefined>[] | ParseError {
            return [{
                nextToken: token,
                result: undefined
            }];
        }
    };
}

export function str<T>(toMatch: string): Parser<T, Token<T>> {
    return {
        parse(token: Token<T> | undefined): ParseResult<T, Token<T>>[] | ParseError {
            if (token === undefined || token.text !== toMatch) {
                return [];
            }
            return [{
                nextToken: token.next,
                result: token
            }];
        }
    };
}

export function tok<T>(toMatch: T): Parser<T, Token<T>> {
    return {
        parse(token: Token<T> | undefined): ParseResult<T, Token<T>>[] | ParseError {
            if (token === undefined || token.kind !== toMatch) {
                return [];
            }
            return [{
                nextToken: token.next,
                result: token
            }];
        }
    };
}

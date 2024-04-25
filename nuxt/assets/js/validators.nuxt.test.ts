// @vitest-environment nuxt
import {describe, expect, it} from 'vitest';
import { validateEmptyAndLength, validateEmail} from "./validators";

describe('Validators utils', () => {
    it('empty payload', () => {
        expect(validateEmptyAndLength('')).toBe('Este campo é obrigatório');
    });
    it('less 3 char', () => {
        expect(validateEmptyAndLength('12')).toBe('Este campo precisa ter no mínimo 3 caracteres')
    })
    it('return true with correct payload', () => {
        expect(validateEmptyAndLength('1234')).toBe(true)
    })
    it('e-email empty payload', () => {
        expect(validateEmail('')).toBe('Este campo é obrigatório');
    });
    it('email wrong', () => {
        expect(validateEmail('test@test.')).toBe('Este campo precisa ser um e-mail')
    })
    it('email wrong 2', () => {
        expect(validateEmail('test@test')).toBe('Este campo precisa ser um e-mail')
    })
    it('email wrong 3', () => {
        expect(validateEmail('test.c')).toBe('Este campo precisa ser um e-mail')
    })
    it('return true with correct email', () => {
        expect(validateEmail('test@test.com')).toBe(true)
    })
});
export function validateEmptyAndLength (value: string): boolean|string {
    if(!value) return 'Este campo é obrigatório';
    if(value.length < 3) return 'Este campo precisa ter no mínimo 3 caracteres';
    return true;
}

export function validateEmail (value: string): boolean|string {
    if(!value) return 'Este campo é obrigatório';
    if(!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)) return 'Este campo precisa ser um e-mail';
    return true;
}

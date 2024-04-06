export function validateEmptyAndLength6 (value){
    if(!value){
        return 'Este campo é obrigatório'
    }
    if(value.length < 3){
        return 'Este campo precisa ter no mínimo 6 caracteres'
    }
    return true
}

export function validateEmptyAndEmail (value){
    if(!value){
        return 'Este campo é obrigatório'
    }

    const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

    if(!isValid){
        return 'Este campo precisa ser um e-mail'
    }

    return true
}

export function validadePassword (value){
    if(!value){
        return 'Este campo é obrigatório'
    }
    if(value != value){
        return 'As senhas precisam ser iguais'
    }
    return true
}

module.exports = {
    isBlank:function(str){ //COMPRUEBA QUE NO ESTE VACIO
        return str.replace(/\s/g,"") === ""
    },
    isMin:function(strLength,min){ //COMPRUEBA QUE TENGA UN MINIMO DE CARACTERES
        return strLength < min
    },
    isEmail:function(str){ // COMPRUEBA QUE SEA UN EMAIL
        return str.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
    notSpace:function(str){ // COMPRUEBA QUE NO TENGA ESPACIOS
        return /\s/.test(str)
    },
    equals:function(str1,str2){ // COMPRUEBA SI DOS STRING SON IGUALES
        return str1 == str2
    }
}
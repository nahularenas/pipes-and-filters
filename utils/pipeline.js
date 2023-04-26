const axios = require('axios')
const createPhone = require('../services/PhoneService')
const Pipeline = require('pipes-and-filters');
const pipeline = Pipeline.create('validación teléfono')

const API_KEY = 's0XkiI8i2vDTYSrXHooEYfeTvsssJ7Ja'

let validar_digitos = function(input, next){
    const pattern = /^(?:[+\d].*\d|\d)$/
    if(!pattern.test(input)){
        return next(Error('Formato no válido'));   
    }
    next(null, input); 
};

let validar_numero = function(input, next){
    let config = {
        headers: {
            apikey: API_KEY,
        }
    }
    axios.get(`https://api.apilayer.com/number_verification/validate?number=${input}`, config)
    .then(function (response) {
        if(!response.data.valid){
            return next(Error('Número no válido')); 
        }
        // handle success
        next(null, input); 
    })
};

let guardar_db = async function(input, next){
    const phone = await createPhone(input)
    console.log('este es el telefono nuevo')
    console.log(phone)
    next(null, phone)
}

pipeline.use(validar_digitos);
pipeline.use(validar_numero);
pipeline.use(guardar_db);

module.exports = pipeline;
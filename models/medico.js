const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },    
    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
    }    
});

MedicoSchema.method('toJSON', function () {
    const { __v, ...obj } = this.toObject();

    return obj;
});


module.exports = model( 'Medico', MedicoSchema );
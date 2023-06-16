'use strict';

const mongoose          = require('mongoose');


const userSchema = new mongoose.Schema({
   username:        {
                        type: String,
                        require: true,
                        unique: true
                    },
   email:           {
                        type: String,
                        require: true,
                        lowercase: true,
                        trim: true
                    },
    nombre:         {
                        type: String,
                        require: true
                    },
    apPaterno:      {
                        type: String,
                        require: true
                    },
    apMaterno:      {
                        type: String,
                        require: true
                    },
    password:       {
                        type: String,
                        require: true,
                        min: 6
                    },
    refreshToken:   {
                        type: String
                    },
    activo:          {
                        type: Boolean, 
                        default : true
                    }
}, {
    timestamps: true,
    versionKey: false,
    virtuals:{
        nombreCompleto: {
            get(){
                return `${this.nombre} ${this.apPaterno} ${this.apMaterno}`
            }
        }
    }
});

module.exports = mongoose.model('usuario', userSchema);
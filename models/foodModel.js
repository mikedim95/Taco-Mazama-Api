const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodSchema = new Schema(
    {
        name : {
            type : 'string',
            required : [true, 'A food must have a name'],
            unique : true,


        }

});
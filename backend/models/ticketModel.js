const mongoose = require('mongoose')

const ticketSchemea = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    product:{
        type: String,
        required: [true, 'Please Select a product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description:{
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },
    status: {
        type: String,
        required: true,
        enunm:['new', 'open', 'closed'],
        default: 'new'
    }
}, 
{
    timestamps: true,
}
)

module.exports = mongoose.model('Ticket', ticketSchemea)
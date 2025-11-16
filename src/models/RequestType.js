const mongoose = require('mongoose');

const requestTypeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: { 
            type: String,
        },
        priority: { 
            type: String, 
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        category: {
            type: String,
            required: true,
        },
        estimatedResponseTime: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    },
);

const RequestType = mongoose.model('RequestType', requestTypeSchema);

module.exports = RequestType;
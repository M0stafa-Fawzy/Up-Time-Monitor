const mongoose = require("mongoose")
const { isURL } = require("validator")
const { CustomError } = require("../utils/errors")
const joi = require("joi")


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        // validate(value) {
        //     if (!isURL(value)) {
        //         throw new CustomError("Please Enter a Correct URL To Be Monitorecdddddddddd", 406);
        //     }
        // }
    },
    lastStatus: {
        type: mongoose.Schema.Types.Mixed,
        default: 200
    },
    protocol: {
        type: String,
        required: true,
        enum: ["HTTP", "HTTPS", "TCP", "https", "http", "tcp"]
    },
    path: String,
    port: Number,
    webhook: {
        type: String,
        validate(value) {
            if (!isURL(value)) {
                throw new CustomError("Please Enter a Correct webhook url", 406);
            }
        }
    },
    timeout: {
        type: Number,
        default: 5
    },
    interval: {
        type: Number,
        default: 10
    },
    threshold: {
        type: Number,
        default: 0
    },
    authentication: {
        username: String,
        password: String
    },
    httpHeaders: mongoose.Schema.Types.Mixed,
    assert: {
        statusCode: Number
    },
    tags: String,
    ignoreSSL: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    intervalID: {
        type: mongoose.Schema.Types.Mixed,
    },
    upTime: {
        type: Number,
        default: 0
    },
    downTime: {
        type: Number,
        default: 0
    },
    outage: [Date],
    responseTime: [Number],
    history: [Date],
    tags: [String]
}, { timestamps: true })


const Check = mongoose.model('check', schema)
module.exports = Check
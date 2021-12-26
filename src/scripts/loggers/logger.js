const path = require("path")
const fs = require('fs')

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "../../", "/logs", 'access.log'), { flags: 'a' })

module.exports = accessLogStream
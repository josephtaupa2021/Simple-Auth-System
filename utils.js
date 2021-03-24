const fake_db = require('./db.js')
function matchCredentials(requestBody) {
    let user = fake_db.users[requestBody.username]
    if (user !== undefined
        && requestBody.password === user.password) {
        return true
    } else {
        return false
    }
}
module.exports = matchCredentials
const expenses = []
let dailyLimit = 0

function get() {
    return [...expenses]
}

function add(expense) {
    expenses.push(expense)
}

function setLimit(limit) {
    dailyLimit = limit
}

function getLimit() {
    return dailyLimit
}

module.exports = {
    get,
    add,
    setLimit,
    getLimit,
}

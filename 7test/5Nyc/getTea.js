const tea = ['chai', 'mocha', 'oolong'];
module.exports = (input) => {
    if (input < 2) {
        return tea[input];
    } else {
        return 'unknown'
    }
}
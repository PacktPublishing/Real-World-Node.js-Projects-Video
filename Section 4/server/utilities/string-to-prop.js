module.exports = function stringToProp(obj, path) {
    return path.split(".").reduce((value, prop) => {
        return value[prop];
    }, obj);
}
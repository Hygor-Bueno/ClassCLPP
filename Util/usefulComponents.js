export class UsefulComponents {
    splitString(stringToSplit, separator) {
        return stringToSplit.split(separator);
    }
    splitStringName(stringToSplit, separator) {
        var arrayOfStrings = this.splitString(stringToSplit, separator)
        if (arrayOfStrings.length - 1 == 0) {
            arrayOfStrings.push(separator)
        }
        return arrayOfStrings[0] + " " + arrayOfStrings[arrayOfStrings.length - 1]
    }
    createObject(values) {
        let response = {}
        for (let index = 0; index < values.length; index++) {
            response[values[index][0]] = values[index][1]
        }
        return response
    }
}

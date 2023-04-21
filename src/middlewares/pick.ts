interface ObjectWithKeys {
    [key: string]: any;
}

const pick = (object: ObjectWithKeys, ...keys: string[]) => {
    return keys.reduce((obj: ObjectWithKeys, key: string) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export {
    pick,
};
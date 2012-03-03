String.prototype.format = function(args) {
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 0);
    return this.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
};

String.prototype.trim = function() {
    return this.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}

Array.prototype.map = function(iterator) {
    for (var i = 0, len = this.length; i < len; i++) {
        this[i] = iterator.call(this, this[i]);
    }
    return this;
};

Array.prototype.filter = function(iterator) {
    var newArr = [];
    for (var i = 0, len = this.length; i < len; i++) {
        if (!!iterator.call(this, this[i])) {
            newArr.push(this[i]);
        }
    }
    return newArr;
};

function isNumber(obj) {
    return Object.prototype.toString.call(obj) == '[object Number]';
}

function isString(obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
}

function isBoolean(obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) == '[object Boolean]';
}

function isUndefined(obj) {
    return obj === void 0;
}

function isNull(obj) {
    return obj === null;
}

function isNil(v) {

    if (isNumber(v)) {
        return false;
    }

    if (isString(v)) {
        if (v.trim() == "") {
            return true;
        }
        return false;
    }

    if (isBoolean(v)) {
        if (v === false) {
            return true;
        }
        return false;
    }

    if (isNull(v)) {
        return true;
    }

    if (!v) {
        return true;
    } else {
        return false;
    }
}
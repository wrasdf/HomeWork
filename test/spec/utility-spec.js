describe("Utility", function() {

    it("should return correct map array", function() {
        var arr = [1,2,3,4];
        expect(arr.map(function(v) {
            return v + 1
        })).toEqual([2,3,4,5]);
    });

    it("should return correct map array", function() {
        var arr = ["a","b","c"];
        expect(arr.map(function(v) {
            return v + "a"
        })).toEqual(["aa","ba","ca"]);
    });

    it("should return true when given obj is string", function() {
        var str1 = "as";
        var str2 = "as222";
        var str3 = "0";
        var str4 = "1";
        var str5 = "";
        expect(isString(str1)).toEqual(true);
        expect(isString(str2)).toEqual(true);
        expect(isString(str3)).toEqual(true);
        expect(isString(str4)).toEqual(true);
        expect(isString(str5)).toEqual(true);
    });

    it("should return false when given obj is not string", function() {
        var str1 = false;
        var str2 = 0;
        var str3 = 1;
        var str4 = null;
        var str5 = undefined;
        expect(isString(str1)).toEqual(false);
        expect(isString(str2)).toEqual(false);
        expect(isString(str3)).toEqual(false);
        expect(isString(str4)).toEqual(false);
        expect(isString(str5)).toEqual(false);
    });

    it("should return true when given obj is number", function() {
        var obj1 = 0;
        var obj2 = 1;
        expect(isNumber(obj1)).toEqual(true);
        expect(isNumber(obj2)).toEqual(true);
    });

    it("should return true when given obj is undefined", function() {
        var obj1 = undefined;
        expect(isUndefined(obj1)).toEqual(true);
    });

    it("should return false when given obj is not undefined", function() {
        var obj1 = "";
        var obj2 = null;
        var obj3 = false;
        expect(isUndefined(obj1)).toEqual(false);
        expect(isUndefined(obj2)).toEqual(false);
        expect(isUndefined(obj3)).toEqual(false);
    });


    it("should return false when given obj is not a number", function() {
        var obj1 = null;
        var obj2 = false;
        var obj3 = "";
        var obj4 = undefined;
        expect(isNumber(obj1)).toEqual(false);
        expect(isNumber(obj2)).toEqual(false);
        expect(isNumber(obj3)).toEqual(false);
        expect(isNumber(obj4)).toEqual(false);
    });

    it("should return true when given obj is boolean", function() {
        var obj1 = true;
        var obj2 = false;
        expect(isBoolean(obj1)).toEqual(true);
        expect(isBoolean(obj2)).toEqual(true);
    });

    it("should return false when given obj is not a boolean", function() {
        var obj1 = null;
        var obj3 = "";
        var obj4 = undefined;
        expect(isBoolean(obj1)).toEqual(false);
        expect(isBoolean(obj3)).toEqual(false);
        expect(isBoolean(obj4)).toEqual(false);
    });


    it("should return true when give str is null", function() {
        expect(isNil("")).toEqual(true);
        expect(isNil(false)).toEqual(true);
        expect(isNil(null)).toEqual(true);
        expect(isNil(undefined)).toEqual(true);
        expect(isNil(0)).toEqual(false);
        expect(isNil("0")).toEqual(false);
    });

    it("should return correct filter array", function() {
        var arr = ["a","b","c","","false",false,null];
        expect(arr.filter(function(v) {
            return !isNil(v);
        })).toEqual(["a","b","c","false"]);
    });



    it("should return correct filter array", function() {
        var arr = ["0","b","c","","false",false,null];
        expect(arr.filter(function(v) {
            return !isNil(v);
        })).toEqual(["0","b","c","false"]);
    });

    it("should return correct filter array", function() {
        var arr = [0,"b","c","","false",false,null];
        expect(arr.filter(function(v) {
            return !isNil(v);
        })).toEqual([0,"b","c","false"]);
    });

    it("should return correct format str", function() {
        var str = "I am a {0} , and I'm from {1} .";
        expect(str.format("student", "beijing")).toEqual("I am a student , and I'm from beijing .");
    });

    it("should return correct trim str", function() {
        var str1 = "test ";
        var str2 = " test ";
        var str3 = "   test ";
        expect(str1.trim()).toEqual("test");
        expect(str2.trim()).toEqual("test");
        expect(str3.trim()).toEqual("test");
    });

});
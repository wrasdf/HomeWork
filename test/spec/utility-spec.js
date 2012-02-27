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
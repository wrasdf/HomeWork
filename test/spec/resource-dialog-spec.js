describe('Resource Dialog Manager', function () {
    var logManager = {
        add:function(){}
    };
    var dialog;

    beforeEach(function () {
        dialog = new ResourceDialog();
    });

    it('should convert correct resource', function () {
        expect(dialog._convertStr("test1,test2")).toEqual(["test1","test2"]);
        expect(dialog._convertStr(" test1,test2 ")).toEqual(["test1","test2"]);
        expect(dialog._convertStr(" test1 , test2")).toEqual(["test1","test2"]);
        expect(dialog._convertStr(" test1 , test2 ")).toEqual(["test1","test2"]);
    });
});
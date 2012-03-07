describe('Resource Manager', function () {
    var dialog = {
        show:function(fun){},
        hide:function(){}
    };
    var logManager = {
        agentAdd:function(){}
    };
    var dom,resourceManager;

    beforeEach(function () {
        dom = $("<div><ul class='resource'></ul></div>");
        resourceManager = new ResourceManager(dom, ["Tiger-Core","Tiger-Regression"], dialog, logManager);
    });

    it('should add resource by given resources', function () {
        expect(dom.find("li").eq(0).text()).toContain("Tiger-Core");
        expect(dom.find("li").eq(1).text()).toContain("Tiger-Regression");
    });

    it('should add resource by given resource', function () {
        resourceManager.resourcesAdd("Tiger-FireFox");
        expect(dom.find("li").eq(2).text()).toContain("Tiger-FireFox");
    });

    it('should convert correct resource by given string', function () {
        var str1 = "test1, test2, test3";
        var str2 = " test1, test2, test3 ";
        var str3 = " , test1 , test2, test3 ";
        var str4 = "  test1 , test2, test3 , ";
        var str5 = " , test1 , test2, test3 , ";
        expect(resourceManager._convertStr(str1)).toEqual(["test1","test2","test3"]);
        expect(resourceManager._convertStr(str2)).toEqual(["test1","test2","test3"]);
        expect(resourceManager._convertStr(str3)).toEqual(["test1","test2","test3"]);
        expect(resourceManager._convertStr(str4)).toEqual(["test1","test2","test3"]);
        expect(resourceManager._convertStr(str5)).toEqual(["test1","test2","test3"]);
    });

});


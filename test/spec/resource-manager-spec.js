describe('Resource Manager', function () {
    var dialog = {
        show:function(){},
        hide:function(){}
    };
    var logManager = {
        add:function(){}
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
});


function ResourceDialog() {
    this.wrapper = $('.add-resource');
    this.resources = $('#resourceValue');
    this.saveBtn = $('#saveBtn');
    this.cancelBtn = $('#cancelBtn');
    this.recourseManager = "";
    this._bind();
}

ResourceDialog.prototype = {
    show : function(recourseManager) {
        this.resources.val('');
        this.wrapper.show();
        this.recourseManager = recourseManager;
    },
    hide : function() {
        this.wrapper.hide();
    },
    _bind:function() {
        var me = this;
        me.saveBtn.bind('click', function() {
            me.save();
        });
        me.cancelBtn.bind('click', function() {
            me.cancel();
        });
    },
    _convertStr:function(str) {
        var agentArr = str.split(',');
        return agentArr.map(function(v) {
            return v.trim();
        });
    },
    save : function() {
        var me = this;
        $.each(me._convertStr(me.resources.val()), function(index, value) {
            me.recourseManager.resourcesAdd(value);
        });
        me.hide();
    },
    cancel : function() {
        this.hide();
    }
}

function AgentManager(data, summaryManager, logManager) {
    this.agentWrapper = $('.agents-list');
    this.agents = data;
    this.summaryManager = summaryManager;
    this.logManager = logManager;
}
AgentManager.prototype = {
    init:function() {
        var me = this;
        $.each(me.agents, function(index, value) {
            me.add(value);
        });
        this.updateSummary();
    },
    updateSummary:function(){
        var me = this;
        me.summaryManager.updateBuildingAgentNum(me.getBuildingAgent());
        me.summaryManager.updateIdleAgentNum(me.getIdleAgent());
    },
    tmpAgentStr : "<li class='{4}'><dl class='clearfix'>" +
        "<dt>{0} | {1} | {2} | {3}</dt>" +
        "<dd>" +
        "<a href='#' class='add'> + Specify Resources</a>" +
        "<ul class='resource clearfix'></ul>" +
        "</dd>" +
        "</dl></li>",
    add : function(agent) {
        var me = this;
        var agentDom = $(me.tmpAgentStr.format(agent.description, agent.status, agent.ip, agent.url, agent.status));
        me.agentWrapper.append(agentDom);
        me._addLastClass(agentDom);
        new ResourceManager(agentDom, agent.resource, dialog, me.logManager);
        me.logManager.add("Agent " + agent.ip + ' add');
    },
    getBuildingAgent:function() {
        return this.agentWrapper.find('li.building').length;
    },
    getIdleAgent:function() {
        return this.agentWrapper.find('li.idle').length;
    },
    _addLastClass:function(dom) {
        this.agentWrapper.find('li').removeClass('last');
        dom.addClass("last");
    }
};

function ResourceManager(dom, resources, dialog, logManager) {
    this.resourceWrapper = dom.find('.resource');
    this.addResourceLink = dom.find('a.add');
    this.dialog = dialog;
    this.resources = resources;
    this.logManager = logManager;
    this.init();
}
ResourceManager.prototype = {
    tmplResourceStr : "<li><b>x</b>{0}</li>",
    init:function() {
        this.build();
        this.bind();
    },
    bind:function() {
        var me = this;
        me.addResourceLink.bind('click', function() {
            me.dialog.show(me);
        });
        me.resourceWrapper.delegate("b", "click", function(e) {
            me.del(e);
        });
    },
    build:function() {
        var me = this;
        $.each(me.resources, function(index, value) {
            me.resourcesAdd(value);
        });
    },
    resourcesAdd : function(resource) {
        var me = this;
        this.resourceWrapper.append(me.tmplResourceStr.format(resource));
    },
    del : function(e) {
        $(e.target).parent().remove();
    }
};


function SummaryManager(agentManager) {
    this.buildingNum = $('#buildingNum');
    this.idleNum = $('#idleNum');
}

SummaryManager.prototype = {
    updateBuildingAgentNum : function(num) {
        this.buildingNum.html(num);
    },
    updateIdleAgentNum : function(num) {
        this.idleNum.html(num);
    }
};


function LogManager() {
    this.logWrapper = $('.logs');
}
LogManager.prototype = {
    tmp:function() {
        return "<li>{0}</li>"
    },
    add : function(str) {
        var me = this;
        this.logWrapper.append(me.tmp().format(str));
    },
    clear : function() {
        this.logWrapper.html('');
    }
};


function Page(data, agentManager, logManager) {
    this.data = data;
    this.logManager = logManager;
    this.agentManager = agentManager;
    this.agentList = $('.agents-list');
    this.init();
}
Page.prototype = {
    init : function() {
        var me = this;
        me.agentManager.init();
    }
}

var logManager = new LogManager();
var dialog = new ResourceDialog();
var summaryManager = new SummaryManager();
var agentManager = new AgentManager(Config.agents,summaryManager,logManager);

new Page(Config, agentManager, logManager);

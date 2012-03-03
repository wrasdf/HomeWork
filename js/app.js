function ResourceDialog() {
    this.wrapper = $('.add-resource');
    this.resources = $('#resourceValue');
    this.saveBtn = $('#saveBtn');
    this.cancelBtn = $('#cancelBtn');
    this._bind();
}

ResourceDialog.prototype = {
    show : function(callback,context) {
        this.resources.val('');
        this.wrapper.show();
        this.resources.focus();
        this.successCallback = callback;
        this.callContext = context;
    },
    hide : function() {
        this.wrapper.hide();
    },
    setPosition:function(x,y){
        this.wrapper.css({left:x,top:y});
    },
    _bind:function() {
        var me = this;
        me.saveBtn.bind('click', function() {
            me.save();
        });
        me.cancelBtn.bind('click', function() {
            me.cancel();
        });
        $(window).bind('keydown',function(e){
            var code =  e.keyCode;
            switch(code){
                case 13:
                    me.save();
                break;
                case 27:
                    me.cancel();
                break;
            }
        })
    },
    save : function() {
        var me = this;
        me.successCallback.call(me.callContext,me.resources.val());
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
    updateSummary:function() {
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
    this.resourceWrapper = dom.find('ul.resource');
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
    _getWrapperPosition:function(){
        var pos =  this.addResourceLink.offset();
        return {
            x : pos.left - 11,
            y : pos.top + this.addResourceLink.outerHeight() + 5
        }
    },
    bind:function() {
        var me = this;
        me.addResourceLink.bind('click', function(e) {
            e.preventDefault();
            var position = me._getWrapperPosition();
            me.dialog.show(me.resourcesAdd,me);
            me.dialog.setPosition(position.x,position.y);
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
    _convertStr:function(str) {
        var agentArr = str.split(',');
        return agentArr.filter(function(v){
            return !isNil(v);
        }).map(function(v){
            return v.trim();
        });
    },
    resourcesAdd : function(resource) {
        var me = this;
        if (!resource) {
            return;
        }
        if (resource.indexOf(',') > 0) {
            $.each(me._convertStr(resource), function(index, value) {
                me.resourcesAdd(value);
            });
        } else {
            this.resourceWrapper.append(me.tmplResourceStr.format(resource));
        }
    },
    del : function(e) {
        $(e.target).parent().remove();
    }
};


function SummaryManager() {
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


function Page(agentManager) {
    this.agentManager = agentManager;
    this.agentList = $('.agents-list');
    this.init();
}
Page.prototype = {
    init : function() {
        this.agentManager.init();
    }
}

var logManager = new LogManager();
var dialog = new ResourceDialog();
var summaryManager = new SummaryManager();
var agentManager = new AgentManager(Config.agents, summaryManager, logManager);

new Page(agentManager);

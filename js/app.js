function ResourceDialog() {
    this.wrapper = $('.add-resource');
    this.resources = $('#resourceValue');
    this.saveBtn = $('#saveBtn');
    this.cancelBtn = $('#cancelBtn');
    this._bind();
}
ResourceDialog.prototype = {
    show : function(callback, context) {
        this.resources.val('');
        this.wrapper.show();
        this.resources.focus();
        this.successCallback = callback;
        this.callContext = context;
    },
    hide : function() {
        this.wrapper.hide();
    },
    setPosition:function(x, y) {
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
        $(window).bind('keydown', function(e) {
            if (me.wrapper.css('display') == 'none') {
                return;
            }
            var code = e.keyCode;
            switch (code) {
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
        me.successCallback.call(me.callContext, me.resources.val());
        me.cancel();
    },
    cancel : function() {
        this.hide();
    }
}

function AgentDialog() {
    this.wrapper = $('.add-agent');
    this.agentName = $('#agentName');
    this.agentIp = $('#agentIp');
    this.addAgent = $('#addAgent');
    this.closeAgentDialog = $('#closeAgentDialog');
    this._bind();
}
AgentDialog.prototype = {
    show : function(callback, context) {
        this.agentName.val('');
        this.agentIp.val('');
        this.wrapper.show();
        this.agentName.focus();
        this.successCallback = callback;
        this.callContext = context;
    },
    hide : function() {
        this.wrapper.hide();
    },
    setPosition:function(x, y) {
        this.wrapper.css({left:x,top:y});
    },
    getWrapper:function(){
        return this.wrapper;
    },
    _bind:function() {
        var me = this;
        me.addAgent.bind('click', function() {
            me.save();
        });
        me.closeAgentDialog.bind('click', function() {
            me.cancel();
        });
        $(window).bind('keydown', function(e) {
            if (me.wrapper.css('display') == 'none') {
                return;
            }
            var code = e.keyCode;
            switch (code) {
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
        me.successCallback.call(me.callContext, {
            ip: me.agentIp.val(),
            description : me.agentName.val()
        });
        me.cancel();
    },
    cancel : function() {
        this.hide();
    }
}


function AgentManager(data, summaryManager, agentDialog, logManager) {
    this.agentList = $('.agents-list');
    this.addAgentSpan = $('.agents-wrapper span');
    this.agents = data;
    this.agentDialog = agentDialog;
    this.summaryManager = summaryManager;
    this.logManager = logManager;
}
AgentManager.prototype = {
    init:function() {
        this._build();
        this._bind();
    },
    _build:function() {
        var me = this;
        $.each(me.agents, function(index, value) {
            me.agentAdd(value);
        });
    },
    _position:function(){
        return {
            x: this.agentList.offset().left + this.agentList.width() - this.agentDialog.getWrapper().width() -12 ,
            y: this.addAgentSpan.offset().top + 24
        }
    },
    _bind:function() {
        var me = this;
        var position = this._position();
        this.addAgentSpan.bind('click', function() {
            me.agentDialog.show(me.agentAdd, me);
            me.agentDialog.setPosition(position.x, position.y);
        });
    },
    updateSummary:function() {
        var me = this;
        me.summaryManager.updateBuildingAgentNum(me.getBuildingAgent());
        me.summaryManager.updateIdleAgentNum(me.getIdleAgent());
    },
    tmpAgentStr : "<li class='{4}'><strong>{5}</strong><dl class='clearfix'>" +
        "<dt>{0} | {1} | {2} | {3}</dt>" +
        "<dd>" +
        "<a href='#' class='add'> + Specify Resources</a>" +
        "<ul class='resource clearfix'></ul>" +
        "</dd>" +
        "</dl></li>",
    agentAdd : function(agent) {
        var me = this;
        if(!agent.description && !agent.url){
            return;
        }
        var config = {
            description : "ThoughtWorks.com.cn",
            status : 'idle',
            ip : '192.168.0.1',
            url : '/agent/',
            resource:[]
        }
        $.extend(config, agent);
        var agentDom = $(me.tmpAgentStr.format(config.description, config.status, config.ip, config.url, config.status, config.status));
        me.agentList.append(agentDom);
        me._addLastClass(agentDom);
        new ResourceManager(agentDom, config.resource, resourceDialog, me.logManager);
        me.updateSummary();
        me.logManager.agentAdd("Agent " + config.ip + 'agentAddd');
    },
    getBuildingAgent:function() {
        return this.agentList.find('li.building').length;
    },
    getIdleAgent:function() {
        return this.agentList.find('li.idle').length;
    },
    _addLastClass:function(dom) {
        this.agentList.find('li').removeClass('last');
        dom.addClass("last");
    }

};


function ResourceManager(dom, resources, resourceDialog, logManager) {
    this.resourceWrapper = dom.find('ul.resource');
    this.addResourceLink = dom.find('a.add');
    this.resourceDialog = resourceDialog;
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
    _getWrapperPosition:function() {
        var pos = this.addResourceLink.offset();
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
            me.resourceDialog.show(me.resourcesAdd, me);
            me.resourceDialog.setPosition(position.x, position.y);
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
        return agentArr.filter(
            function(v) {
                return !isNil(v);
            }).map(function(v) {
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
    agentAdd : function(str) {
        var me = this;
        this.logWrapper.append(me.tmp().format(str));
    },
    clear : function() {
        this.logWrapper.html('');
    }
};


function Page(agentManager) {
    this.agentManager = agentManager;
    this.init();
}
Page.prototype = {
    init : function() {
        this.agentManager.init();
    }
}


var logManager = new LogManager();
var resourceDialog = new ResourceDialog();
var agentDialog = new AgentDialog();
var summaryManager = new SummaryManager();
var agentManager = new AgentManager(Config.agents, summaryManager, agentDialog, logManager);

$(function() {
    new Page(agentManager);
});
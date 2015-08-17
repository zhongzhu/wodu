Ext.define('Wodu.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginPanel: 'loginpanel',
            mainPanel: 'main'
        },

        control: {
            'loginpanel #loginButton': {
                tap: 'login'
            }
        }            
    },

    login: function(theButton, e, eOpts) {
        var me = this;
        Wodu.util.Util.authentication(
            function() { // success
                var mainPanel = me.getMainPanel();
                Ext.Viewport.animateActiveItem(mainPanel, {type: 'slide', direction: 'left'});
            },
            function() { // failure
                var loginPanel = me.getLoginPanel();
                Ext.Msg.alert('出错了', '无法登陆到豆瓣网');
                Ext.Viewport.animateActiveItem(loginPanel, {type: 'slide', direction: 'left'});
            }
        );
    }


});

Ext.define('Wodu.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginPanel: 'loginpanel'
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
                var main = Ext.create('Wodu.view.Main');
                Ext.Viewport.add(main);
                Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'left'});
            },

            function() { // failure
                Ext.Msg.alert('出错了', '无法登陆到豆瓣网');
            }
        );
    }


});

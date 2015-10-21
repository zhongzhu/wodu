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

    bringUpTheMainGUI: function() {
      var main = Ext.Viewport.down('main');
      if (!main) {
          main = Ext.create('Wodu.view.Main');
      }

      Ext.Viewport.add(main);
      Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'left'});
    },

    reportCannotLoginToDouban: function() {
      Ext.Msg.alert('出错了', '无法登陆到豆瓣网');
    },

    login: function(theButton, e, eOpts) {
      var me = this;

      Wodu.util.Util.renewMyToken(
        me.bringUpTheMainGUI,
        function() {
          Wodu.util.Util.authentication(
            me.bringUpTheMainGUI,
            me.reportCannotLoginToDouban
          );
        }
      );
    }
});

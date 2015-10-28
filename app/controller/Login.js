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

      Wodu.util.Util.login()
      .then(function(response) {
        Wodu.util.Util.showMainView();
      }).then(undefined, function(e) {
        Ext.Msg.alert('出错了', '无法登陆到豆瓣网');
        Wodu.util.Util.showLoginView();
      });
    }
});

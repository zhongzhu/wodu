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

        // auto-renew my access token
        if (localStorage.myToken && localStorage.myRefreshToken) {
            Wodu.util.Util.renewMyToken(localStorage.myRefreshToken);
        } else {
            // new auth
            Wodu.util.Util.authentication(
                function() { // success
                    var main = Ext.Viewport.down('main');
                    if (main) {
                        // re-login, need to clear the states
                        // Ext.getStore('BooksReadingStore').removeAll();
                        // Ext.getStore('BooksWishStore').removeAll();
                        // Ext.getStore('BooksReadStore').removeAll();
                        // Ext.getStore('SearchBooksStore').removeAll();

                        // main.setActiveItem(0);//BooksReadingNaviView
                    } else {
                        main = Ext.create('Wodu.view.Main');
                        Ext.Viewport.add(main);
                    }

                    Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'left'});
                },

                function() { // failure
                    Ext.Msg.alert('出错了', '无法登陆到豆瓣网');
                }
            );
        }
    }


});

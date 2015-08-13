/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Wodu',

    requires: [
        'Ext.MessageBox',
        'Wodu.util.Util'
    ],

    views: [
        'Main', 'BooksReadingNaviView', 'BooksWishNaviView', 'BooksReadNaviView'
    ],

    controllers: [
        'Main', 'BooksReading', 'BooksWish', 'BooksRead', 'BookDetails'
    ],    

    stores: ['BooksReadingStore', 'BooksWishStore', 'BooksReadStore'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

   authentication: function() {
        $.oauth2({
            auth_url: 'https://www.douban.com/service/auth2/auth',  // required
            response_type: 'code',      // required - "code"/"token"
            token_url: 'https://www.douban.com/service/auth2/token',  // required if response_type = 'code'
            logout_url: '',         // recommended if available
            client_id: Wodu.util.Util.myApikey,  // required
            client_secret: Wodu.util.Util.mySecret,      // required if response_type = 'code'
            redirect_uri: 'http://localhost',       // required - some dummy url
            other_params: {scope: 'book_basic_r,book_basic_w,douban_basic_common'}  // optional params object for scope, state, display...
        }, function(token, response){
            localStorage.myToken = token;
            localStorage.myId = response.douban_user_id;
            localStorage.myRefreshToken = response.refresh_token;
            localStorage.myName = response.douban_user_name;

            Ext.Viewport.add(Ext.create('Wodu.view.Main'));
        }, function(error, response){
            localStorage.removeItem('myToken');         
        });
    },    

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
    

        // localStorage.myToken = 'xxx';

        var myToken = localStorage.myToken;
        if (myToken === undefined) {
            this.authentication();
        } else {
            Ext.Viewport.add(Ext.create('Wodu.view.Main'));
        }   

        // Initialize the main view
        // Ext.Viewport.add(Ext.create('Wodu.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

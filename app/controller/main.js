Ext.define('Wodu.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainPanel: 'main'
        },

        control: {
            mainPanel: {
                initialize: 'onMainPanelInitialize'
            }
        }            
    },

    onMainPanelInitialize: function(component, eOpts) {
        localStorage.myApikey = 'xxx';
        var myToken = localStorage.myToken;
        if (myToken === undefined) {
            this.authentication();
        }        
    },    

    authentication: function() {
        $.oauth2({
            auth_url: 'https://www.douban.com/service/auth2/auth',  // required
            response_type: 'code',      // required - "code"/"token"
            token_url: 'https://www.douban.com/service/auth2/token',  // required if response_type = 'code'
            logout_url: '',         // recommended if available
            client_id: localStorage.myApikey,  // required
            client_secret: 'yyy',      // required if response_type = 'code'
            redirect_uri: 'http://localhost',       // required - some dummy url
            other_params: {scope: 'shuo_basic_r,shuo_basic_w,douban_basic_common'}  // optional params object for scope, state, display...
        }, function(token, response){
            // alert(JSON.stringify(response));
            localStorage.myToken = token;
            localStorage.myId = response.douban_user_id;
            localStorage.myRefreshToken = response.refresh_token;
            localStorage.myName = response.douban_user_name;
        }, function(error, response){
            // alert(JSON.stringify(response));
            localStorage.removeItem('myToken');         
        });
    }

});
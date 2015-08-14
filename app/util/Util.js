Ext.define('Wodu.util.Util', {
    singleton: true,

    myApikey: 'xxx',
    mySecret: 'yyy',

    showNavBarTitle: function(theNavView, title) {
      var navBar = theNavView.getNavigationBar();

      if (theNavView.getInnerItems().length === navBar.backButtonStack.length) {
        var stack = navBar.backButtonStack;
        stack[stack.length - 1] = title;
        navBar.setTitle(title);
      }             
    },

    oauth2Config: function() {
      return {
        auth_url: 'https://www.douban.com/service/auth2/auth',  // required
        response_type: 'code',      // required - "code"/"token"
        token_url: 'https://www.douban.com/service/auth2/token',  // required if response_type = 'code'
        logout_url: '',         // recommended if available
        client_id: this.myApikey,  // required
        client_secret: this.mySecret,      // required if response_type = 'code'
        redirect_uri: 'http://localhost',       // required - some dummy url
        other_params: {scope: 'book_basic_r,book_basic_w,douban_basic_common'}  // optional params object for scope, state, display...
      };
    }
});
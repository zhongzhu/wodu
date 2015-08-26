Ext.define('Wodu.util.Util', {
    singleton: true,

    myApikey: 'xxx', // put your douban apikey here
    mySecret: 'yyy', // put your douban secret here

    showNavBarTitle: function(theNavView, title) {
      var navBar = theNavView.getNavigationBar();

      if (theNavView.getInnerItems().length === navBar.backButtonStack.length) {
        var stack = navBar.backButtonStack;
        stack[stack.length - 1] = title;
        navBar.setTitle(title);
      }             
    },

    checkLogin: function(success, failure) {
      if (localStorage.myToken === undefined) {
        failure();
      } else {
        success();
      }
    },

    // check access_token_has_expired from ajax response
    checkIfAccessTokenExpired: function(response, callBackIfNotExpired) {
      console.log(response);
      var resp = Ext.JSON.decode(response.responseText);
      if (resp.code === 106 || resp.code === 103) { 
        // access_token_has_expired, 106;
        // invalid_access_token: undefined, 103
        Ext.Msg.alert('出错啦', '你的豆瓣网登录已超时，请重新登录。');
        // activeItem: 0, Index; 1, main
        Ext.Viewport.animateActiveItem(0, {type: 'slide', direction: 'left'});
      } else {
        if (callBackIfNotExpired === undefined) {
          Ext.Msg.alert('出错啦',resp.msg);
        } else {
          callBackIfNotExpired(response);
        }
      }
    },

    // oauth2 with douban
    authentication: function(success, failure) {
      if (localStorage.myToken === undefined) {
        $.oauth2(
          {
            auth_url: 'https://www.douban.com/service/auth2/auth',
            response_type: 'code',      // required - "code"/"token"
            token_url: 'https://www.douban.com/service/auth2/token',  // required if response_type = 'code'
            logout_url: '',  // recommended if available
            client_id: this.myApikey,
            client_secret: this.mySecret, // required if response_type = 'code'
            redirect_uri: 'http://aikanshu.sinaapp.com', // required - some dummy url
            other_params: {scope: 'book_basic_r,book_basic_w,douban_basic_common'}  // optional params object for scope, state, display...
          }, 

          function(token, response) { // success
            localStorage.myToken = token;
            localStorage.myId = response.douban_user_id;
            localStorage.myRefreshToken = response.refresh_token;
            localStorage.myName = response.douban_user_name;

            success();
          }, 

          function(error, response){ // failure
            localStorage.removeItem('myToken');   
            failure();      
        });  
      } else {
        success();
      }
    },

    // 搜索图书
    // GET  https://api.douban.com/v2/book/search?q=searchText
    searchForBooks: function(searchText, store) {
      var me = this;

      if (localStorage.myId) {
          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'title,image,author,summary,publisher,pubdate,isbn13,pages,price,id,rating,images',
            q: searchText,
            apikey: this.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/search');
          proxy.setHeaders({Authorization: 'Bearer ' + localStorage.myToken});
          proxy.on('exception', function(theProxy, response, operation, eOpts) {
            me.checkIfAccessTokenExpired(response);
          });

          store.load();
      }
    },

    // 获取某个用户的所有图书收藏信息
    // GET  https://api.douban.com/v2/book/user/:name/collections?status=xx
    getBookCollections: function(status, store, done, fail) {
          store.on('load', done);

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: status,
            apikey: this.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
    },

    // 用户删除对某本图书的收藏
    // DELETE  https://api.douban.com/v2/book/:id/collection    
    deleteBookFromCollection: function(bookId, done, fail) {
      if (localStorage.myToken === undefined) {
        fail('');
      }

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'DELETE',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      }).done(done)
      .fail(function(response) {
        this.checkIfAccessTokenExpired(response, fail);
      });
    },

    // 用户收藏某本图书
    // POST  https://api.douban.com/v2/book/:id/collection&status=wish
    addBookToCollection: function(bookId, done, fail) {
      if (localStorage.myToken === undefined) {
        fail('');
      }

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'POST',
          data: 'status=wish',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })
      .done(done)
      .fail(function(response) {
        this.checkIfAccessTokenExpired(response, fail);
      });
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection?status=xxx
    changeBookCollectionStatus: function(bookId, status, done, fail) {
      if (localStorage.myToken === undefined) {
        fail('');
      }

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'PUT',
          data: 'status=' + status,
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      }).done(done)
      .fail(function(response) {
        this.checkIfAccessTokenExpired(response, fail);
      });
    }

});

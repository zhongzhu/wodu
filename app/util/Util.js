Ext.define('Wodu.util.Util', {
    singleton: true,

    myApikey: 'xxx', // put your douban apikey here
    mySecret: 'yyy', // put your douban secret here

    getMyAvatar: function() {
      var avatar = localStorage.myAvatar;
      if (!avatar) {
        avatar = 'http://img3.douban.com/icon/user_normal.jpg';
      }

      return avatar;
    },

    getMyName: function() {
      var name = localStorage.myName;
      if (!name) {
        name = '你没有设置名字';
      }

      return name;
    },

    handleNaviBarTitleChange: function(theNaviView, store) {
      store.on({
        load: function(theStore, records, successful, operation, eOpts) {
          if (successful) {
            this.showNaviBarTitle(theNaviView, theStore);
          } else {
            Ext.Msg.alert('出错啦', '貌似网络有问题，请试试下拉来重新加载。');
          }
        },
        addrecords: function(theStore, records, eOpts) {
          // maybe a bug in Sencah Touch, after insert/remove the store.totalCount won't change
          theStore.setTotalCount(theStore.getTotalCount() + records.length);
        },
        removerecords: function(theStore, records, indices, eOpts) {
          // maybe a bug in Sencah Touch, after insert/remove the store.totalCount won't change
          theStore.setTotalCount(theStore.getTotalCount() - records.length);
        },
        scope: this
      });
    },

    /**
     * 我在读的书(23)
     * 我想读的书(25)
     * 我读过的书(173)
    **/
    showNaviBarTitle: function(theNaviView, theStore) {
      var title = theNaviView.myTitle + '(' + theStore.getTotalCount() + ')';
      var navBar = theNaviView.getNavigationBar();
      if (theNaviView.getInnerItems().length === navBar.backButtonStack.length) {
        var stack = navBar.backButtonStack;
        stack[stack.length - 1] = title;
        navBar.setTitle(title);
      }
    },

    login: function() {
      var login = Ext.create('Wodu.view.Login');

      if (localStorage.myToken === undefined) {
        // failure
        Ext.Viewport.add(login);
      } else {
        // success
        var main = Ext.create('Wodu.view.Main');
        Ext.Viewport.add([login, main]);
        // activeIndex: 0, login; 1, main
        Ext.Viewport.animateActiveItem(1, {type: 'slide', direction: 'left'});
      }
    },

    logout: function() {
      localStorage.removeItem('myToken');
      localStorage.removeItem('myId');
      localStorage.removeItem('myRefreshToken');
      localStorage.removeItem('myName');
      localStorage.removeItem('myAvatar');

      Ext.getStore('BooksReadingStore').removeAll();
      Ext.getStore('BooksWishStore').removeAll();
      Ext.getStore('BooksReadStore').removeAll();
      Ext.getStore('SearchBooksStore').removeAll();    
      
      var main = Ext.Viewport.down('main');
      main.setActiveItem(0); // BooksReadingNaviView  

      Ext.Viewport.animateActiveItem(0, {type: 'slide', direction: 'left'});
    },

    prepareForAutoReLogin: function() {
      Ext.Viewport.animateActiveItem(0, {type: 'slide', direction: 'left'});
    },

    // check access_token_has_expired from ajax response
    checkIfAccessTokenExpired: function(response, callBackIfNotExpired) {
      var me = this;

      // maybe a network issue, no reponse is got from server
      if (response.status === 0 && response.responseText.length === 0) {
        Ext.Msg.alert('出错啦', '貌似网络有问题，请重新试试。');
        return;
      }

      var resp = Ext.JSON.decode(response.responseText);
      if (resp.code === 106 || resp.code === 103) {
        // access_token_has_expired, 106;
        // invalid_access_token: undefined, 103
        Ext.Msg.alert('出错啦', '你的豆瓣网登录已超时，请重新登录。');

        me.prepareForAutoReLogin();
      } else {
        if (callBackIfNotExpired === undefined) {
          Ext.Msg.alert('出错啦',resp.msg);
        } else {
          callBackIfNotExpired(response);
        }
      }
    },

    renewMyToken: function(refreshToken) {
      var me = this;
      $.ajax({
          url: 'https://www.douban.com/service/auth2/token',
          method: 'POST',
          data: 'client_id=' + me.myApikey
                + '&client_secret=' + me.mySecret
                + '&redirect_uri=http://aikanshu.sinaapp.com&grant_type=refresh_token'
                + '&refresh_token=' + refreshToken,
      }).done(function(respnose) {
          localStorage.myToken = response.access_token;
          localStorage.myRefreshToken = response.refresh_token;

          me.getCurrentUserInfo();
      }).fail(function(response) {
        Ext.Msg.alert('出错啦', '无法帮您自动登录，请试试手动登录。');
        me.logout();
      });
    },

    // oauth2 with douban
    authentication: function(success, failure) {
      var me = this;

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

          me.getCurrentUserInfo();

          success();
        },

        function(error, response){ // failure
          localStorage.removeItem('myToken');
          failure();
      });
    },

    // 获取当前授权用户信息
    // GET https://api.douban.com/v2/user/~me
    getCurrentUserInfo: function(success, failure) {
      var me = this;

      $.ajax({
          url: 'https://api.douban.com/v2/user/~me',
          method: 'GET',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      }).done(function(response) {
        localStorage.myAvatar = response.avatar;
      }).fail(function(response) {
        me.checkIfAccessTokenExpired(response, failure);
      });
    },


    // 搜索图书
    // GET  https://api.douban.com/v2/book/search?q=searchText
    searchForBooks: function(searchText, store) {
      var me = this;

      var proxy = store.getProxy();
      proxy.setExtraParams({
        fields: 'title,image,author,summary,publisher,pubdate,isbn13,pages,price,id,rating,images,current_user_collection',
        q: searchText,
        apikey: this.myApikey
      });

      proxy.setUrl('https://api.douban.com/v2/book/search');
      proxy.setHeaders({Authorization: 'Bearer ' + localStorage.myToken});
      proxy.on('exception', function(theProxy, response, operation, eOpts) {
        me.checkIfAccessTokenExpired(response);
      });

      store.load();
    },

    // 获取某个用户的所有图书收藏信息
    // GET  https://api.douban.com/v2/book/user/:name/collections?status=xx
    getBookCollections: function(status, store, done, fail) {
      var proxy = store.getProxy();
      proxy.setExtraParams({
        fields: 'updated,status,id,book_id,book',
        status: status,
        apikey: this.myApikey
      });

      proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

      store.load();
    },

    // 用户删除对某本图书的收藏
    // DELETE  https://api.douban.com/v2/book/:id/collection
    deleteBookFromCollection: function(bookId, done, fail) {
      var me = this;

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'DELETE',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      }).done(done)
      .fail(function(response) {
        me.checkIfAccessTokenExpired(response, fail);
      });
    },

    // 用户收藏某本图书
    // POST  https://api.douban.com/v2/book/:id/collection&status=wish
    addBookToCollection: function(bookId, done, fail) {
      var me = this;

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'POST',
          data: 'status=wish',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })
      .done(done)
      .fail(function(response) {
        me.checkIfAccessTokenExpired(response, fail);
      });
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection?status=xxx
    changeBookCollectionStatus: function(bookId, status, done, fail) {
      var me = this;

      $.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'PUT',
          data: 'status=' + status,
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      }).done(done)
      .fail(function(response) {
        me.checkIfAccessTokenExpired(response, fail);
      });
    }

});

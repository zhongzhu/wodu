Ext.define('Wodu.util.Util', {
    singleton: true,

    myApikey: 'xxx', // put your douban apikey here
    mySecret: 'yyy', // put your douban secret here

    getMyAvatar: function() {
      return (localStorage.myAvatar || 'http://img3.douban.com/icon/user_normal.jpg');
    },

    getMyName: function() {
      return (localStorage.myName || '你没有设置名字');
    },

    handleNaviBarTitleChange: function(theNaviView, store) {
      store.on({
        load: function(theStore, records, successful, operation, eOpts) {
          if (successful) {
            this.showNaviBarTitle(theNaviView, theStore);
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

    setNaviBarTitle: function(theNaviView, title) {
      var navBar = theNaviView.getNavigationBar();
      if (theNaviView.getInnerItems().length === navBar.backButtonStack.length) {
        var stack = navBar.backButtonStack;
        stack[stack.length - 1] = title;
        navBar.setTitle(title);
      }
    },

    /**
     * 我在读的书(23)
     * 我想读的书(25)
     * 我读过的书(173)
    **/
    showNaviBarTitle: function(theNaviView, theStore) {
      var title = theNaviView.myTitle + '(' + theStore.getTotalCount() + ')';
      this.setNaviBarTitle(theNaviView, title);
    },

    resetNaviBarTitles: function() {
      var naviViews = Ext.ComponentQuery.query('navigationview[myTitle]');
      var title = '';

      naviViews.map(function(theNaviView) {
        this.setNaviBarTitle(theNaviView, title);
      });
    },

    isLoggedIn: function() {
      return localStorage.myToken !== undefined;
    },

    needToRefreshMyToken: function() {
      var ret = (localStorage.renew === 'Yes' && localStorage.myToken && localStorage.myRefreshToken);
      localStorage.removeItem('renew');

      return ret;
    },

    letsLaunchTheAPP: function() {
      var me = this;
      var login = Ext.create('Wodu.view.Login');
      Ext.Viewport.add(login);

      if (me.isLoggedIn()) me.showMainView();
    },

    showLoginView: function() {
      Ext.Viewport.animateActiveItem(0, {type: 'slide', direction: 'left'});
    },

    showMainView: function() {
      var main = Ext.Viewport.down('main');
      if (!main) {
          main = Ext.create('Wodu.view.Main');
          Ext.Viewport.add(main);
      }
      
      Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'left'});
    },    

    clearUserData: function() {
      localStorage.removeItem('myToken');
      localStorage.removeItem('myId');
      localStorage.removeItem('myRefreshToken');
      localStorage.removeItem('myName');
      localStorage.removeItem('myAvatar');
      localStorage.removeItem('renew');

      Ext.getStore('BooksReadingStore').removeAll();
      Ext.getStore('BooksWishStore').removeAll();
      Ext.getStore('BooksReadStore').removeAll();
      Ext.getStore('SearchBooksStore').removeAll();

      var main = Ext.Viewport.down('main');
      if (main) main.setActiveItem(0); // BooksReadingNaviView
    },

    processAjaxResponseToDetectErrorReason: function(response) {
      var me = this;

      // maybe a network issue, no reponse is got from server
      if (response.status === 0) {
        throw new Error('貌似网络没有连上？请重新试试。');
      }

      var resp = Ext.JSON.decode(response.responseText);
      switch (resp.code) {
        case 106: // access_token_has_expired
        case 103: // invalid_access_token: undefined
          Ext.Msg.alert('出错啦', '你的豆瓣网登录已超时，请重新登录。');
          localStorage.renew = "Yes";
          me.showLoginView();
          break;
        case 6011: // collection_exist(try PUT if you want to update)
          throw new Error('你已经加过这本书了，不能重复加。');
          break;
        default:
          throw new Error(resp.msg);
          break;
      }
    },

    login: function() {
      var me = this;

      return me.renewMyToken()
        .then(undefined, function(e) {
          me.clearUserData();
          return me.authentication();      
        }).then(function(response) {
          // renew or authentication successfull
          return me.getCurrentUserInfo(response);
        }).then(undefined, function(e) {
          throw new Error('登录失败了，请重新登录。');        
        });
    },

    renewMyToken: function() {
      var me = this;

      return new Promise(function(resolve, reject) {
        if (me.needToRefreshMyToken()) {
          $.ajax({
              url: 'https://www.douban.com/service/auth2/token',
              method: 'POST',
              data: 'client_id=' + me.myApikey
                    + '&client_secret=' + me.mySecret
                    + '&redirect_uri=http://aikanshu.sinaapp.com'
                    + '&grant_type=refresh_token'
                    + '&refresh_token=' + localStorage.myRefreshToken,
              headers: {Authorization: 'Bearer ' + localStorage.myToken}
          }).done(function(respnose) {
            resolve(response);
          }).fail(function(response) {
            reject(new Error('自动登录失败'));
          });
        } else {
          reject(new Error('不具备自动登录条件'));
        }
      });
    },

    //oauth2 with douban
    authentication: function() {
      var me = this;

      return new Promise(function(resolve, reject) {
        $.oauth2(
          {
            auth_url: 'https://www.douban.com/service/auth2/auth',
            response_type: 'code',
            token_url: 'https://www.douban.com/service/auth2/token',
            logout_url: '',
            client_id: me.myApikey,
            client_secret: me.mySecret,
            redirect_uri: 'http://aikanshu.sinaapp.com',
            other_params: {scope: 'book_basic_r,book_basic_w,douban_basic_common'}
          },

          function(token, response) {
            resolve(response);
          },

          function(error, response){
            reject(new Error(error));
        });
      });
    },

    // 获取当前授权用户信息
    // GET https://api.douban.com/v2/user/~me
    getCurrentUserInfo: function(response) {
      var me = this;

      localStorage.myToken = response.access_token;
      localStorage.myId = response.douban_user_id;
      localStorage.myRefreshToken = response.refresh_token;
      localStorage.myName = response.douban_user_name;

      return Promise.resolve($.ajax({
          url: 'https://api.douban.com/v2/user/~me',
          method: 'GET',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })).then(function(resp) {
        localStorage.myAvatar = resp.avatar;
        return resp;
      }).then(undefined, function(resp) {
        me.processAjaxResponseToDetectErrorReason(resp);
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
        apikey: this.myApikey,
        timeout: 15000
      });

      proxy.setUrl('https://api.douban.com/v2/book/search');
      proxy.setHeaders({Authorization: 'Bearer ' + localStorage.myToken});
      proxy.on('exception', function(theProxy, response, operation, eOpts) {
        me.processAjaxResponseToDetectErrorReason(response);
      });

      store.load();
    },

    // 获取某个用户的所有图书收藏信息
    // GET  https://api.douban.com/v2/book/user/:name/collections?status=xx
    getBookCollections: function(status, store) {
      var me = this;
      var proxy = store.getProxy();

      proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');
      proxy.setExtraParams({
        fields: 'updated,status,id,book_id,book',
        status: status,
        apikey: this.myApikey,
        timeout: 15000
      });
      proxy.on('exception', function(theProxy, response, operation, eOpts) {
        me.processAjaxResponseToDetectErrorReason(response);
      });

      store.load();
    },

    // 用户删除对某本图书的收藏
    // DELETE  https://api.douban.com/v2/book/:id/collection
    deleteBookFromCollection: function(bookId) {
      var me = this;
      
      return Promise.resolve($.ajax({
        url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
        method: 'DELETE',
        headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })).then(undefined, function(response) {
        me.processAjaxResponseToDetectErrorReason(response);
      });
    },    

    // 用户收藏某本图书
    // POST  https://api.douban.com/v2/book/:id/collection&status=wish
    addBookToCollection: function(bookId) {
      var me = this;

      return Promise.resolve($.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'POST',
          data: 'status=wish',
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })).then(undefined, function(response) {
        me.processAjaxResponseToDetectErrorReason(response);
      });
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection?status=xxx
    changeBookCollectionStatus: function(bookId, status) {
      var me = this;

      return Promise.resolve($.ajax({
          url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
          method: 'PUT',
          data: 'status=' + status,
          headers: {Authorization: 'Bearer ' + localStorage.myToken}
      })).then(undefined, function(response) {
        me.processAjaxResponseToDetectErrorReason(response);
      });
    }

});

Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            booksreadingNaviView: 'booksreading'
        },

        control: {
            booksreadingNaviView: {
                show: 'onBooksReadingNaviViewShow'
            }
        }            
    },

    onBooksReadingNaviViewShow: function(component, eOpts) {      
      var douban_user_id = localStorage.myId;      
      if (douban_user_id) {
        var store = Ext.getStore('BooksReadingStore');
        var proxy = store.getProxy()

        proxy.setExtraParams({
          start: 0,
          count: 10,
          apikey: localStorage.myApikey,
        });

        proxy.setUrl('https://api.douban.com/v2/book/user/' + douban_user_id + '/collections');

        store.load();
      }
    }

});
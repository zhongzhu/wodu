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

    onBooksReadingNaviViewShow: function(theBooksreadingNaviView, eOpts) {      
      var douban_user_id = localStorage.myId;      
      if (douban_user_id) {
        var store = Ext.getStore('BooksReadingStore');
        if (!store.alreadyLoadedBooksReading) {
          store.on('load', function(theStore, records, successful, operation, eOpts) {          
            theBooksreadingNaviView.getNavigationBar().setTitle('我在读的书(' + theStore.getTotalCount() + ')');          
            
            theStore.alreadyLoadedBooksReading = true;
          });

          var proxy = store.getProxy();
          proxy.setExtraParams({
            start: 0,
            count: 10,
            status: 'reading',
            apikey: localStorage.myApikey,
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + douban_user_id + '/collections');

          store.load();
        }
      }
    }

});
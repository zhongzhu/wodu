Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails'
    ],       

    config: {
        refs: {
            booksReadingNaviView: 'booksreading'
        },

        control: {
            booksReadingNaviView: {
                show: 'onBooksReadingNaviViewShow'
            },

            'booksreading #booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap'    
            }
        }            
    },

    onBooksReadingNaviViewShow: function(theBooksreadingNaviView, eOpts) {      
      var douban_user_id = localStorage.myId;      
      if (douban_user_id) {
        var store = Ext.getStore('BooksReadingStore');
        if (0 === store.getCount()) {
          store.on('load', function(theStore, records, successful, operation, eOpts) {          
            theBooksreadingNaviView.getNavigationBar().setTitle('我在读的书(' + theStore.getTotalCount() + ')');
          });

          var proxy = store.getProxy();
          proxy.setExtraParams({
            count: 2,
            fields: 'updated,id,book_id,book',
            status: 'reading',
            apikey: localStorage.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + douban_user_id + '/collections');

          store.load();
        }
      }
    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log(record.data.book);

      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);

      this.getBooksReadingNaviView().push(bookDetailsView);
    }

});
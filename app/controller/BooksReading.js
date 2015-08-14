Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadingList',
      'Wodu.view.BooksReadingNaviView'
    ],       

    config: {
        refs: {
            theNaviView: 'booksreadingnaviview'
        },

        control: {
            theNaviView: {
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap' 
            }
        } 
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('bookdetails')) {
        Wodu.util.Util.showNavBarTitle(theNaviView, '我在读的书(' + Ext.getStore('BooksReadingStore').getTotalCount() + ')');
      }
    },

    onNaviViewShow: function(theBooksreadingNaviView, eOpts) {        
      var store = Ext.getStore('BooksReadingStore');   
      if (0 === store.getCount() && localStorage.myId) {
          store.on('load', 
            function(theStore, records, successful, operation, eOpts) {          
              Wodu.util.Util.showNavBarTitle(theBooksreadingNaviView, '我在读的书(' + theStore.getTotalCount() + ')');
          });

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: 'reading',
            apikey: Wodu.util.Util.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);
      bookDetailsView.down('#bookdetails_actionbutton').setText('看完了');

      this.getTheNaviView().push(bookDetailsView);
    }

});
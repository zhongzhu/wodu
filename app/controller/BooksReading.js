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

      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'reading', 
          store, 
          function(theStore, records, successful, operation, eOpts) { // done
            Wodu.util.Util.showNavBarTitle(theBooksreadingNaviView, '我在读的书(' + theStore.getTotalCount() + ')');
          },
          null // fail
        );
      }

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log(record);
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#bookdetails_actionbutton').setText('已看完');

      this.getTheNaviView().push(bookDetailsView);
    }

});
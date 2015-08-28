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
                initialize: 'onNaviViewInit',
                show: 'onNaviViewShow'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap' 
            }
        } 
    },

    onNaviViewInit: function(theNaviView, eOpts) {
      Wodu.util.Util.handleNaviBarTitleChange(theNaviView, Ext.getStore('BooksReadingStore'));
    },

    onNaviViewShow: function(theBooksreadingNaviView, eOpts) {    
      var store = Ext.getStore('BooksReadingStore');   

      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'reading', 
          store, 
          null,
          null // fail
        );
      }

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#bookdetails_actionbutton').setText('已看完');

      this.getTheNaviView().push(bookDetailsView);
    }

});
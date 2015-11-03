Ext.define('Wodu.controller.BooksRead', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadList',
      'Wodu.view.BooksReadNaviView'
    ],

    config: {
        refs: {
            theNaviView: 'booksreadnaviview'
        },

        control: {
            theNaviView: {
                initialize: 'onNaviViewInit',
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'booksreadlist': {
              itemtap: 'onlistItemTap'
            }
        }
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('booksreadlist')) {
        theNaviView.down('#readAgainButton').show();
      } else if (oldValue.isXType('bookdetails')) {
        theNaviView.down('#readAgainButton').hide();
      }
    },

    onNaviViewInit: function(theNaviView, eOpts) {
      Wodu.util.Util.handleNaviBarTitleChange(theNaviView, Ext.getStore('BooksReadStore'));
    },

    onNaviViewShow: function(theNaviView, eOpts) {
      var store = Ext.getStore('BooksReadStore');
      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections('read', store);
      }
    },

    onlistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#summary').setRecord(Ext.create('Wodu.model.Book', record.data.book));      
      bookDetailsView.down('#deleteButton').hide();

      this.getTheNaviView().push(bookDetailsView);
    }

});
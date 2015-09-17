Ext.define('Wodu.controller.BooksWish', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksWishList',
      'Wodu.view.BooksWishNaviView'
    ],

    config: {
        refs: {
            theNaviView: 'bookswishnaviview'
        },

        control: {
            theNaviView: {
                initialize: 'onNaviViewInit',
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'bookswishlist': {
              itemtap: 'onBooksWishlistItemTap'
            }
        }
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('bookswishlist')) {
        theNaviView.down('#readingButton').show();
      } else if (oldValue.isXType('bookdetails')) {
        theNaviView.down('#readingButton').hide();
      }
    },

    onNaviViewInit: function(theNaviView, eOpts) {
      Wodu.util.Util.handleNaviBarTitleChange(theNaviView, Ext.getStore('BooksWishStore'));
    },

    onNaviViewShow: function(theNaviView, eOpts) {
      var store = Ext.getStore('BooksWishStore');
      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'wish',
          store,
          null,
          null // fail
        );
      }

    },

    onBooksWishlistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);

      this.getTheNaviView().push(bookDetailsView);
    }

});
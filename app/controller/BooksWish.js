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
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'bookswishlist': {
              itemtap: 'onBooksWishlistItemTap' 
            }
        } 
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('bookdetails')) {
        Wodu.util.Util.showNavBarTitle(theNaviView, '我想读的书(' + Ext.getStore('BooksWishStore').getTotalCount() + ')');
      }
    },

    onNaviViewShow: function(theNaviView, eOpts) {        
      var store = Ext.getStore('BooksWishStore');   
      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'wish', 
          store, 
          function(theStore, records, successful, operation, eOpts) { // done
            Wodu.util.Util.showNavBarTitle(theNaviView, '我想读的书(' + theStore.getTotalCount() + ')');
          },
          null // fail
        );
      }

    },

    onBooksWishlistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#bookdetails_actionbutton').setText('开始看');

      this.getTheNaviView().push(bookDetailsView);
    }

});
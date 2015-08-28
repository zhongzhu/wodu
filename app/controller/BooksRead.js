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
                show: 'onNaviViewShow'
            },

            'booksreadlist': {
              itemtap: 'onlistItemTap' 
            }
        } 
    },

    onNaviViewInit: function(theNaviView, eOpts) {
      Wodu.util.Util.handleNaviBarTitleChange(theNaviView, Ext.getStore('BooksReadStore'));
    },    

    onNaviViewShow: function(theNaviView, eOpts) {        
      var store = Ext.getStore('BooksReadStore');  
      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'read', 
          store, 
          null, // done
          null // fail
        );
      }

    },

    onlistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#bookdetails_actionbutton').setText('再看一遍');
      bookDetailsView.down('#bookdetails_deletebutton').hide();

      this.getTheNaviView().push(bookDetailsView);
    }

});
Ext.define('Wodu.controller.SearchBooks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
          theNaviView: 'searchbooksnaviview'
        },

        control: {
            theNaviView: {
              initialize: 'onTheNaviViewInitialize',
              activeitemchange: 'onNaviViewActiveItemChange'
            },

            'searchbooksnaviview searchfield': {
              action: 'searchAction'
            },
            
            'searchbookslist': {
              itemtap: 'onListItemTap'
            }
        }            
    },

    onTheNaviViewInitialize: function(theNaviView, eOpts) {
      theNaviView.getNavigationBar().leftBox.setCentered(true);
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('searchbookslist')) {
        theNaviView.down('searchfield').hide();
        theNaviView.getNavigationBar().leftBox.setCentered(false);
      } else if (oldValue.isXType('bookdetails')) {
        theNaviView.down('searchfield').show();
        theNaviView.getNavigationBar().leftBox.setCentered(true);
      }
    },

    searchAction: function(theSearchField, e, eOpts) {
      var searchText = theSearchField.getValue();
      var store = Ext.getStore('SearchBooksStore');   

      Wodu.util.Util.searchForBooks(searchText, store);       
    },

    onListItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data));

      var newRecord = Ext.create('Wodu.model.ReadingInfo', {
        updated: '',
        book_id: record.data.id,
        book: record.data
      });

      bookDetailsView.down('#book_title').setRecord(newRecord);
      bookDetailsView.down('#bookdetails_actionbutton').setText('想看这本书');
      bookDetailsView.down('#bookdetails_deletebutton').hide();

      this.getTheNaviView().push(bookDetailsView);
    }    

});

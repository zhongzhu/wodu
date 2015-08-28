Ext.define('Wodu.controller.SearchBooks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
          theNaviView: 'searchbooksnaviview',
          searchBooksList: 'searchbookslist',
          theSearchField: 'searchbooksnaviview searchfield'
        },

        control: {
            theNaviView: {
              activeitemchange: 'onNaviViewActiveItemChange'
            },

            theSearchField: {
              action: 'searchAction'
            },
            
            'searchbookslist': {
              itemtap: 'onListItemTap'
            },

            'searchbooksnaviview #scanButton': {
              tap: 'scanBarCode'
            }
        }            
    },

    scanBarCode: function(theButton, e, eOpts) {
      var me = this;

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var theSearchField = me.getTheSearchField();
          theSearchField.setValue(result.text);
          me.searchAction(theSearchField);
        }, 
        function (error) {
          Ext.Msg.alert('扫描出错了', error);
        }
      );      
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('searchbookslist')) {
        theNaviView.down('searchfield').hide();
        theNaviView.down('#scanButton').hide();
      } else if (oldValue.isXType('bookdetails')) {
        theNaviView.down('searchfield').show();
        theNaviView.down('#scanButton').show();
      }
    },

    searchAction: function(theSearchField, e, eOpts) {
      var searchText = theSearchField.getValue();

      var store = Ext.create('Wodu.store.SearchBooksStore');
      this.getSearchBooksList().setStore(store);

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

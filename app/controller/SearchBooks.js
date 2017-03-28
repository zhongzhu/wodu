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
        theNaviView.down('#readingButton').hide();
        theNaviView.down('#wishButton').hide();
        theNaviView.down('#readButton').hide();
        theNaviView.down('#readAgainButton').hide();
      }
    },

    searchAction: function(theSearchField, e, eOpts) {
      var me = this;
      var searchText = theSearchField.getValue();

      var store = Ext.create('Wodu.store.SearchBooksStore');
      this.getSearchBooksList().setStore(store);

      Wodu.util.Util.searchForBooks(searchText, store);
    },

    onListItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.down('#summary').setRecord(Ext.create('Wodu.model.Book', record.data));

      var newRecord;
      if (record.data.current_user_collection) {
        newRecord = Ext.create('Wodu.model.ReadingInfo', {
          updated: record.data.current_user_collection.updated,
          id: record.data.current_user_collection.id,
          book_id: record.data.id,
          book: record.data
        });
      } else {
        newRecord = Ext.create('Wodu.model.ReadingInfo', {
          updated: '',
          book_id: record.data.id,
          book: record.data
        });
      }

      bookDetailsView.down('#book_title').setRecord(newRecord);
      bookDetailsView.down('#moveToWishButton').hide();

      var theNaviView = this.getTheNaviView();
      var current_user_collection = record.data.current_user_collection;
      if (current_user_collection) {
        switch (current_user_collection.status) {
          case 'reading':
            theNaviView.down('#readButton').show();
            break;
          case 'wish':
            theNaviView.down('#readingButton').show();
            break;
          case 'read':
            theNaviView.down('#readAgainButton').show();
            bookDetailsView.down('#deleteButton').hide();
            break;
        }
      } else {
        theNaviView.down('#wishButton').show();
        bookDetailsView.down('#deleteButton').hide();
      }

      theNaviView.push(bookDetailsView);
    }

});

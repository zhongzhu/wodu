Ext.define('Wodu.controller.BookDetails', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadingNaviView',
      'Wodu.view.BooksWishNaviView',
      'Wodu.view.BooksReadNaviView'
    ],

    config: {
        refs: {
            bookDetails: 'bookdetails',
            loginPanel: 'loginpanel',
            booksReadingNaviView: 'booksreadingnaviview',
            booksWishNaviView: 'bookswishnaviview',
            booksReadNaviView: 'booksreadnaviview'
        },

        control: {
            'bookdetails #deleteButton': {
                tap: 'onDeleteButtonTap'
            },
            'bookdetails #moveToWishButton': {
              tap: 'changeBookFromReadingToWish'
            },

            'searchbooksnaviview #readButton': {
              tap: 'changeBookFromReadingToRead'
            },
            'booksreadingnaviview #readButton': {
              tap: 'changeBookFromReadingToRead'
            },

            'searchbooksnaviview #readingButton': {
              tap: 'iAmReadingTheBook'
            },
            'bookswishnaviview #readingButton': {
              tap: 'iAmReadingTheBook'
            },

            'searchbooksnaviview #readAgainButton': {
              tap: 'iWantToReadAgainTheBook'
            },
            'booksreadnaviview #readAgainButton': {
              tap: 'iWantToReadAgainTheBook'
            },

            'searchbooksnaviview #wishButton': {
              tap: 'iWishToReadTheBook'
            },
            bookDetails: {
              destroy: 'onBookDetailsPanelDestroy'
            }
        }
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection
    // status   收藏状态    必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
    iWantToReadAgainTheBook: function(theButton, e, eOpts) {
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      Wodu.util.Util.changeBookCollectionStatus(bookId, 'wish')
      .then(function(response) {
          Ext.getStore('BooksReadStore').remove(record);

          var toStore = Ext.getStore('BooksWishStore');
          if (toStore.getCount() > 0) {
              toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
          }

          theButton.up('navigationview').pop();
      }).then(undefined, function(e) {  
          Ext.Msg.alert('出错了', e.message);
      }); 
    },

    changeBookFromReadingToWish: function(theButton, e, eOpts) {
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      Wodu.util.Util.changeBookCollectionStatus(bookId, 'wish')
      .then(function(response) {
          Ext.getStore('BooksReadingStore').remove(record);

          var toStore = Ext.getStore('BooksWishStore');
          if (toStore.getCount() > 0) {
              toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
          }

          theButton.up('navigationview').pop();
      }).then(undefined, function(e) {  
          Ext.Msg.alert('出错了', e.message);
      }); 
    },    

    iWishToReadTheBook: function(theButton, e, eOpts) {
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      Wodu.util.Util.addBookToCollection(bookId)
      .then(function(response) {
          var toStore = Ext.getStore('BooksWishStore');
          if (toStore.getCount() > 0) {
              toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
          }

          theButton.up('navigationview').pop();
      }).then(undefined, function(e) {
            Ext.Msg.alert('出错了', e.message);
      });
    },

    changeBookFromReadingToRead: function(theButton, e, eOpts) {
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      // Books Reading
      Wodu.util.Util.changeBookCollectionStatus(bookId, 'read')
      .then(function(response) {
          Ext.getStore('BooksReadingStore').remove(record);

          var toStore = Ext.getStore('BooksReadStore');
          if (toStore.getCount() > 0) {
              toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
          }

          theButton.up('navigationview').pop();
      }).then(undefined, function(e) {
            Ext.Msg.alert('出错了', e.message);
      });      
    },

    iAmReadingTheBook: function(theButton, e, eOpts) {
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      Wodu.util.Util.changeBookCollectionStatus(bookId, 'reading')
      .then(function(response) {
          Ext.getStore('BooksWishStore').remove(record);

          var toStore = Ext.getStore('BooksReadingStore');
          if (toStore.getCount() > 0) {
              toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
          }

          theButton.up('navigationview').pop();
      }).then(undefined, function(e) {
            Ext.Msg.alert('出错了', e.message);
      });
    },

    onBookDetailsPanelDestroy: function(eOpts) {
      Wodu.util.Util.showNaviBarTitle(this.getBooksReadingNaviView(), Ext.getStore('BooksReadingStore'));
      Wodu.util.Util.showNaviBarTitle(this.getBooksWishNaviView(), Ext.getStore('BooksWishStore'));
      Wodu.util.Util.showNaviBarTitle(this.getBooksReadNaviView(), Ext.getStore('BooksReadStore'));
    },

    // 用户删除对某本图书的收藏
    // DELETE  https://api.douban.com/v2/book/:id/collection
    onDeleteButtonTap: function(theButton, e, eOpts) {
      // Reading / wish
      var record = this.getBookDetails().down('#book_title').getRecord();
      var bookId = record.data.book.id;

      Wodu.util.Util.deleteBookFromCollection(bookId)
      .then(function(response) {
          var theNaviView = theButton.up('navigationview');

          if (theNaviView.isXType('booksreadingnaviview')) {
              Ext.getStore('BooksReadingStore').remove(record);
          } else if (theNaviView.isXType('bookswishnaviview')) {
              Ext.getStore('BooksWishStore').remove(record);
          }

          theNaviView.pop();
      }).then(undefined, function(e) {
        Ext.Msg.alert('无法删除这本书', e.message);
      });
    }

});

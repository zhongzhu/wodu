Ext.define('Wodu.controller.BookDetails', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails'
    ],       

    config: {
        refs: {
            bookDetails: 'bookdetails'
        },

        control: {
            'bookdetails #bookdetails_actionbutton': {
                tap: 'onBookDetailsActionButtonTap'
            },

            'bookdetails #bookdetails_deletebutton': {
                tap: 'onDeleteButtonTap'
            }
        } 
    },

    // 用户删除对某本图书的收藏
    // DELETE  https://api.douban.com/v2/book/:id/collection
    onDeleteButtonTap: function(theButton, e, eOpts) {
      // Reading / wish
      var record = this.getBookDetails().down('#book_title').getRecord();        
      var bookId = record.data.book.id;

      Wodu.util.Util.deleteBookFromCollection(
        bookId,          
        function(response) { // done
          var theNaviView = theButton.up('navigationview');
          
          if (theNaviView.isXType('booksreadingnaviview')) {
              Ext.getStore('BooksReadingStore').remove(record);
          } else if (theNaviView.isXType('bookswishnaviview')) {
              Ext.getStore('BooksWishStore').remove(record);
          }

          theNaviView.pop();
        },
        function(response) { // fail
          Ext.Msg.alert('出错了', '无法改变成想读状态');
        }          
      );          
                      
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection
    // status   收藏状态    必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
    onBookDetailsActionButtonTap: function(theButton, e, eOpts) {
        var record = this.getBookDetails().down('#book_title').getRecord();
        var bookId = record.data.book.id;

        var buttonText = theButton.getText();        
        if (buttonText === '已看完') {
            // Books Reading
            Wodu.util.Util.changeBookCollectionStatus(
              bookId,
              'read',
              function(response) { // done
                Ext.getStore('BooksReadingStore').remove(record);

                var toStore = Ext.getStore('BooksReadStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                theButton.up('navigationview').pop();
              },
              function(response) { // fail
                Ext.Msg.alert('出错了', '无法改变成已读状态');
              }
            );

        } else if (buttonText === '开始看') {
            // Books Wish
            Wodu.util.Util.changeBookCollectionStatus(
              bookId,
              'reading',
              function(response) {
                Ext.getStore('BooksWishStore').remove(record);

                var toStore = Ext.getStore('BooksReadingStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                theButton.up('navigationview').pop();
              },
              function(response) {
                Ext.Msg.alert('出错了', '无法改变成正在读状态');
              }                  
            );      

        } else if (buttonText === '再看一遍') {
            // Books read
            Wodu.util.Util.changeBookCollectionStatus(
              bookId,
              'wish',
              function(response) {
                Ext.getStore('BooksReadStore').remove(record);

                var toStore = Ext.getStore('BooksWishStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                theButton.up('navigationview').pop();
              },
              function(response) {
                Ext.Msg.alert('出错了', '无法改变成想读状态');
              }                            
            );        
                 
        } else if (buttonText === '想看这本书') {
            // Search Books
            Wodu.util.Util.addBookToCollection(
              bookId,
              function(response) { // done
                var toStore = Ext.getStore('BooksWishStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                theButton.up('navigationview').pop();
              },
              function(response) { // fail
                Ext.Msg.alert('出错了', '无法改变成想读状态');
              }                      
            );             
        }

    }    

});
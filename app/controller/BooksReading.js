Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadingList',
      'Wodu.view.BooksReadingNaviView'
    ],       

    config: {
        refs: {
            booksReadingNaviView: 'booksreadingnaviview',
            bookDetails: 'bookdetails'
        },

        control: {
            booksReadingNaviView: {
                show: 'onBooksReadingNaviViewShow',
                pop: 'onBooksReadingNaviViewPop'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap' 
            },

            'bookdetails #bookdetails_actionbutton': {
                tap: 'onBookDetailsActionButtonTap'
            }            
        } 
    },

    /** if return from bookdetails to booksreadinglist, set the naviview title
    */
    onBooksReadingNaviViewPop: function(theBooksReadingNaviView, view, eOpts) {
      console.log('onBooksReadingNaviViewPop');      
      if (view.isXType('bookdetails')) {
        this.showTotalBooksReadingTitle(Ext.getStore('BooksReadingStore'));
      }      
    },

    /** update BooksReadingNavView's title    
    */
    showTotalBooksReadingTitle: function(theStore) {
      console.log("call showTotalBooksReadingTitle");
      
      var totalBooksReading = theStore.getTotalCount();
      if (totalBooksReading > 0) {
        console.log('totalBooksReading > 0');
        this.getBooksReadingNaviView().getNavigationBar().setTitle('我在读的书(' + totalBooksReading + ')');
      } else {
        console.log('totalBooksReading <= 0');
        this.getBooksReadingNaviView().getNavigationBar().setTitle('正在获取我在读的书。。。');
      }
    },

    onBooksReadingNaviViewShow: function(theBooksreadingNaviView, eOpts) {        
      console.log('onBooksReadingNaviViewShow');    

      var store = Ext.getStore('BooksReadingStore');   
      var totalBooksReading = store.getCount();        
      if (0 === totalBooksReading && localStorage.myId) {
          console.log('store is empty. going to load');
          store.on('load', 
            function(theStore, records, successful, operation, eOpts) {          
              this.showTotalBooksReadingTitle(store);
            },
            this
          );

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: 'reading',
            count: 5,
            apikey: localStorage.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log('onBooksReadinglistItemTap');
      console.log(record);

      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);

      this.getBooksReadingNaviView().push(bookDetailsView);
    },

    onBookDetailsActionButtonTap: function(theButton, e, eOpts) {
        console.log('onBookDetailsActionButtonTap');

        var bookId = this.getBookDetails().down('#book_id').getValue();
        console.log(bookId);

        var buttonText = theButton.getText();        
        if (buttonText === '看完了') {
            console.log('going to do ajax');
            // 用户修改对某本图书的收藏
            // PUT  https://api.douban.com/v2/book/:id/collection
            // status   收藏状态    必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=read',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksReadingStore');
                store.remove(store.getById(response.id));

                this.getBookDetails().down('#book_id').setText('正在看这本书');
            }).fail(function(response) {
                console.log('fail');
                console.log(response);
                Ext.Msg.alert('出错了', '无法改变成已读状态');
            })
        } else if (buttonText === '正在看这本书') {
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=reading',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksReadingStore');
                store.add(store.getById(response.id));

                this.getBookDetails().down('#book_id').setText('看完了');
            }).fail(function(response) {
                console.log('fail');
                console.log(response);
                Ext.Msg.alert('出错了', '无法改变成正在读状态');
            })          
        }

    }    

});
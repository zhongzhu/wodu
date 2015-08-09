Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadingList',
      'Wodu.view.BooksReadingNaviView'
    ],       

    config: {
        refs: {
            booksReadingNaviView: 'booksreadingnaviview'
        },

        control: {
            booksReadingNaviView: {
                show: 'onBooksReadingNaviViewShow',
                pop: 'onBooksReadingNaviViewPop'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap' 
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
            apikey: localStorage.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log('onBooksReadinglistItemTap');

      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);

      this.getBooksReadingNaviView().push(bookDetailsView);
    }

});
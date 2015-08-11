Ext.define('Wodu.controller.BooksWish', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails',
      'Wodu.view.BooksWishList',
      'Wodu.view.BooksWishNaviView'
    ],       

    config: {
        refs: {
            booksWishNaviView: 'bookswishnaviview'            
        },

        control: {
            booksWishNaviView: {
                show: 'onBooksWishNaviViewShow'
            }
        } 
    },

   

    onBooksWishNaviViewShow: function(theBooksWishNaviView, eOpts) {        
      console.log('onBooksWishNaviViewShow');    

      var store = Ext.getStore('BooksWishStore');   
      var totalBooksReading = store.getCount();        
      if (0 === totalBooksReading && localStorage.myId) {
          console.log('store is empty. going to load');
          store.on('load', 
            function(theStore, records, successful, operation, eOpts) {          
              theBooksWishNaviView.getNavigationBar().setTitle('我想读的书(' + theStore.getTotalCount() + ')');
            },
            this
          );

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: 'wish',
            apikey: localStorage.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    }


});
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

    onNaviViewShow: function(theNaviView, eOpts) {        
      var store = Ext.getStore('BooksWishStore');   
      if (0 === store.getCount() && localStorage.myId) {
          store.on('load', 
            function(theStore, records, successful, operation, eOpts) {    
              Wodu.util.Util.showNavBarTitle(theNaviView, '我想读的书(' + theStore.getTotalCount() + ')');      
          });

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: 'wish',
            apikey: Wodu.util.Util.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    },

    onBooksWishlistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log('onBooksWishlistItemTap');
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);
      bookDetailsView.down('#bookdetails_actionbutton').setText('开始看');

      this.getTheNaviView().push(bookDetailsView);
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('bookdetails')) {
        Wodu.util.Util.showNavBarTitle(theNaviView, '我想读的书(' + Ext.getStore('BooksWishStore').getTotalCount() + ')');
      }
    }    

});
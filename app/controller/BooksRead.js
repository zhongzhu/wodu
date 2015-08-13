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
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'booksreadlist': {
              itemtap: 'onlistItemTap' 
            }
        } 
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('bookdetails')) {
        Wodu.util.Util.showNavBarTitle(theNaviView, '我读过的书(' + Ext.getStore('BooksReadStore').getTotalCount() + ')');
      }
    },

    onNaviViewShow: function(theNaviView, eOpts) {        
      var store = Ext.getStore('BooksReadStore');   

      if (0 === store.getCount() && localStorage.myId) {
          console.log('store is empty. going to load');
          store.on('load', 
            function(theStore, records, successful, operation, eOpts) {          
              Wodu.util.Util.showNavBarTitle(theNaviView, '我读过的书(' + theStore.getTotalCount() + ')');
          });

          var proxy = store.getProxy();
          proxy.setExtraParams({
            fields: 'updated,id,book_id,book',
            status: 'read',
            count: 3,
            apikey: Wodu.util.Util.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections');

          store.load();
      };

    },

    onlistItemTap: function(theList, index, target, record, e, eOpts) {
      console.log('onBooksReadinglistItemTap');
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setData(record.data);
      bookDetailsView.down('#bookdetails_actionbutton').hide();

      this.getTheNaviView().push(bookDetailsView);
    }

});
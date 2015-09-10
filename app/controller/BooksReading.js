Ext.define('Wodu.controller.BooksReading', {
    extend: 'Ext.app.Controller',

    requires: [
      'Ext.Menu',
      'Wodu.view.BookDetails',
      'Wodu.view.BooksReadingList',
      'Wodu.view.BooksReadingNaviView'
    ],

    config: {
        refs: {
            theNaviView: 'booksreadingnaviview'
        },

        control: {
            theNaviView: {
                initialize: 'onNaviViewInit',
                show: 'onNaviViewShow'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap'
            },

            'booksreadingnaviview titlebar #userButton': {
              tap: 'onUserButtonTap'
            }
        }
    },

    onUserButtonTap: function(theButton, e, eOpts) {
      var menu = Ext.create('Ext.Menu', {
           items: [
               {
                xtype: 'image',
                width: '64px',
                height: '64px',
                style: {
                  'border-radius':'25px',
                  'margin': '10px auto 10px auto'
                },
                src: localStorage.myAvatar
               },
               {
                  xtype: 'component',
                  html: '<div style="color:white;margin:10px auto 15px auto;text-align:center">' + localStorage.myName + '</div>'
               },
               {
                   text: '退出登陆',
                   ui: 'decline',
                   itemId: 'logoutButton'
               }
           ]
       });

       Ext.Viewport.setMenu(menu, {side: 'left'});
       Ext.Viewport.toggleMenu('left');
    },

    onNaviViewInit: function(theNaviView, eOpts) {
      Wodu.util.Util.handleNaviBarTitleChange(theNaviView, Ext.getStore('BooksReadingStore'));
    },

    onNaviViewShow: function(theBooksreadingNaviView, eOpts) {
      var store = Ext.getStore('BooksReadingStore');

      if (0 === store.getCount()) {
        Wodu.util.Util.getBookCollections(
          'reading',
          store,
          null,
          null // fail
        );
      }

    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);
      bookDetailsView.down('#bookdetails_actionbutton').setText('已看完');

      this.getTheNaviView().push(bookDetailsView);
    }

});
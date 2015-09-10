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
           layout: 'vbox',
           items: [
               {
                xtype: 'image',
                width: '64px',
                height: '64px',
                style: {
                  'border-radius':'25px',
                  'margin-left':'auto',
                  'margin-right':'auto'
                },
                src: localStorage.myAvatar
               },
               {
                  xtype: 'label',
                  html: localStorage.myName
               },
               {
                   text: 'Settings',
                   iconCls: 'settings'
               },
               {
                   text: 'New Item',
                   iconCls: 'compose'
               },
               {
                   text: 'Star',
                   iconCls: 'star'
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
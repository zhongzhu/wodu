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
                show: 'onNaviViewShow',
                activeitemchange: 'onNaviViewActiveItemChange'
            },

            'booksreadinglist': {
              itemtap: 'onBooksReadinglistItemTap'
            },

            'booksreadingnaviview titlebar #userButton': {
              tap: 'onUserButtonTap'
            }
        }
    },

    onNaviViewActiveItemChange: function(theNaviView, value, oldValue, eOpts) {
      if (oldValue.isXType('booksreadinglist')) {
        theNaviView.down('#userButton').hide();
        theNaviView.down('#readButton').show();
      } else if (oldValue.isXType('bookdetails')) {
        theNaviView.down('#userButton').show();
        theNaviView.down('#readButton').hide();
      }
    },

    onUserButtonTap: function(theButton, e, eOpts) {
      var avatar = Wodu.util.Util.getMyAvatar();
      var name = Wodu.util.Util.getMyName();

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
              src: avatar
           },
           {
              xtype: 'component',
              html: '<div style="color:white;margin:10px auto 15px auto;text-align:center">' + name + '</div>'
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
    },

    onBooksReadinglistItemTap: function(theList, index, target, record, e, eOpts) {
      var bookDetailsView = Ext.create('Wodu.view.BookDetails');

      bookDetailsView.setRecord(Ext.create('Wodu.model.Book', record.data.book));
      bookDetailsView.down('#book_title').setRecord(record);

      this.getTheNaviView().push(bookDetailsView);
    }

});
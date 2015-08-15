Ext.define('Wodu.view.BooksReadingNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadingnaviview',

    requires: [
      'Wodu.view.BooksReadingList'
    ],

    config: {
      defaultBackButtonText: '返回',
      items: [{xtype: 'booksreadinglist'}]      
    }
});
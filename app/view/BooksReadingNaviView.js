Ext.define('Wodu.view.BooksReadingNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadingnaviview',

    requires: [
      'Wodu.view.BooksReadingList'
    ],

    config: {
        items: [{xtype: 'booksreadinglist'}]      
    }
});
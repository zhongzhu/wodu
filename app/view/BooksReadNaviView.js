Ext.define('Wodu.view.BooksReadNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadnaviview',

    requires: [
      'Wodu.view.BooksReadList'
    ],

    config: {
        items: [{xtype: 'booksreadlist'}]      
    }
});
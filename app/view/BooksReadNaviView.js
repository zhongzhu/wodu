Ext.define('Wodu.view.BooksReadNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadnaviview',

    requires: [
      'Wodu.view.BooksReadList'
    ],

    config: {
    	defaultBackButtonText: '返回',
        items: [{xtype: 'booksreadlist'}]      
    }
});
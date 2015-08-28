Ext.define('Wodu.view.BooksReadNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadnaviview',

    requires: [
      'Wodu.view.BooksReadList'
    ],

	myTitle: '我读过的书',    

    config: {
    	defaultBackButtonText: '返回',
        items: [{xtype: 'booksreadlist'}]      
    }
});
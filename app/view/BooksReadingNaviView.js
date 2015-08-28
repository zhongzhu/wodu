Ext.define('Wodu.view.BooksReadingNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadingnaviview',

    requires: [
      'Wodu.view.BooksReadingList'
    ],

	myTitle: '我在读的书',

    config: {
      defaultBackButtonText: '返回',    
      items: [{xtype: 'booksreadinglist'}]      
    }
});
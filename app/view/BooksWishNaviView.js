Ext.define('Wodu.view.BooksWishNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'bookswishnaviview',

    requires: [
      'Wodu.view.BooksWishList'
    ],

	myTitle: '我想读的书', 

    config: {
    	defaultBackButtonText: '返回',
        items: [{xtype: 'bookswishlist'}]      
    }
});
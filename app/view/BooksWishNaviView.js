Ext.define('Wodu.view.BooksWishNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'bookswishnaviview',

    requires: [
      'Wodu.view.BooksWishList'
    ],

    config: {
    	defaultBackButtonText: '返回',
        items: [{xtype: 'bookswishlist'}]      
    }
});
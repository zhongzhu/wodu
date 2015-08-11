Ext.define('Wodu.view.BooksWishNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'bookswishnaviview',

    requires: [
      'Wodu.view.BooksWishList'
    ],

    config: {
        items: [{xtype: 'bookswishlist'}]      
    }
});
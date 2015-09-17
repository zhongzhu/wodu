Ext.define('Wodu.view.BooksWishNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'bookswishnaviview',

    requires: [
      'Wodu.view.BooksWishList'
    ],

	myTitle: '我想读的书',

    config: {
    	defaultBackButtonText: '返回',
        navigationBar: {
          docked: 'top',
          items: [
              {
                xtype: 'button',
                align: 'right',
                text: '开始看',
                ui: 'confirm',
                hidden: true,
                itemId: 'readingButton'
              }
          ]
        },
        items: [{xtype: 'bookswishlist'}]
    }
});
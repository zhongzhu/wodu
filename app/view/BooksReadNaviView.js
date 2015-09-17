Ext.define('Wodu.view.BooksReadNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreadnaviview',

    requires: [
      'Wodu.view.BooksReadList'
    ],

	myTitle: '我读过的书',

    config: {
    	defaultBackButtonText: '返回',
        navigationBar: {
          docked: 'top',
          items: [
              {
                xtype: 'button',
                align: 'right',
                text: '再看一遍',
                ui: 'confirm',
                hidden: true,
                itemId: 'readAgainButton'
              }
          ]
        },
        items: [{xtype: 'booksreadlist'}]
    }
});
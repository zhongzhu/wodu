Ext.define('Wodu.view.SearchBooksNaviView', {
    extend: 'Ext.navigation.View',
    xtype: 'searchbooksnaviview',

    requires: [
        'Wodu.view.SearchBooksList',
        'Ext.field.Search'   
    ],

    config: {
        defaultBackButtonText: '返回',
        navigationBar: {
          docked: 'top',
          items: [
              {
                  xtype: 'searchfield',
                  placeHolder: '书名，作者，ISBN'
              }
          ]
        },

        items: [{xtype: 'searchbookslist'}]
    }
});
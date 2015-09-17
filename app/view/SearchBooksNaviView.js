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
            },
            {
              xtype: 'button',
              itemId: 'scanButton',
              iconCls: 'camera'
            },
            {
              xtype: 'button',
              align: 'right',
              text: '已看完',
              ui: 'confirm',
              hidden: true,
              itemId: 'readButton'
            },
            {
              xtype: 'button',
              align: 'right',
              text: '开始看',
              ui: 'confirm',
              hidden: true,
              itemId: 'readingButton'
            },
            {
              xtype: 'button',
              align: 'right',
              text: '再看一遍',
              ui: 'confirm',
              hidden: true,
              itemId: 'readAgainButton'
            },
            {
              xtype: 'button',
              align: 'right',
              text: '想看这本书',
              ui: 'confirm',
              hidden: true,
              itemId: 'wishButton'
            }
          ]
        },

        items: [{xtype: 'searchbookslist'}]
    }
});
Ext.define('Wodu.view.BooksReadingNaviView', {
  extend: 'Ext.navigation.View',
  xtype: 'booksreadingnaviview',

  requires: [
    'Wodu.view.BooksReadingList'
  ],

  myTitle: '我在读的书',

  config: {
    defaultBackButtonText: '返回',
    navigationBar: {
      docked: 'top',
      items: [
          {
            xtype: 'button',
            align: 'left',
            itemId: 'userButton',
            iconCls: 'user'
          },
          {
            xtype: 'button',
            align: 'right',
            text: '已看完',
            ui: 'confirm',
            hidden: true,
            itemId: 'readButton'
          }
      ]
    },
    items: [{xtype: 'booksreadinglist'}]
  }
});

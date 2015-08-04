Ext.define('Wodu.view.BooksReading', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreading',

    requires: [
        'Ext.TitleBar', 
        'Ext.Button',
        'Ext.XTemplate'
    ],

    config: {       
        items: [{
              xtype: 'list',
              store: 'BooksReadingStore',
              itemTpl: ['<div>{book_id}</div>']
        }]      
    }
});
Ext.define('Wodu.view.BooksReading', {
    extend: 'Ext.navigation.View',
    xtype: 'booksreading',

    requires: [
        'Ext.TitleBar',         
        'Ext.XTemplate',
        'Ext.dataview.List'
    ],

    config: {   
        items: [{
              xtype: 'list',
              itemId: 'booksreadinglist',
              store: 'BooksReadingStore',
              itemHeight: '135px',
              variableHeights: false,

              itemTpl: [
                '<div class="img" style="background-image:url({image}); display:inline-block; width: 90px; height: 113px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                '<div class="content" style="font-family:Helvetica,sans-serif;">',
                  '<div class="title" style="font-size:13px; font-weight:bold;">{title}</div>',
                  '<div class="book_id" style="font-size:10px;color:#666">{id}</div>',
                '</div>']                             
        }]      
    }
});
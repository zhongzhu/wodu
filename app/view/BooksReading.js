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
                '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 90px; height: 113px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                '<div class="content" style="font-family:Helvetica,sans-serif;font-size:10px;">',
                  '<div class="title" style="font-size:13px; font-weight:bold;">{book.title}</div>',
                  '<div style="color:#666;margin:10px 0 10px 0">{book.author}</div>',
                  '<div style="color:#666">{begin_reading_date} 开始读</div>',
                '</div>']                             
        }]      
    }
});
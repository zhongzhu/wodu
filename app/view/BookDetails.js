Ext.define('Wodu.view.BookDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'bookdetails',

    requires: [
        'Ext.Label',
        'Ext.field.TextArea',
    ],

    config: {
        layout: 'vbox',
        scrollable: false,
        height: '100%',
        style: 'font-family:Helvetica,sans-serif;font-size:13px;',
        items: [
            {
                xtype: 'component',
                flex: 4,
                margin: 5,
                itemId: 'book_title',
                name: 'title',
                tpl: [
                    '<div class="book_info_title">',
                        '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 110px; height: 140px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                        '<div class="content" style="font-size:10px;">',
                          '<div class="title" style="font-weight:bold;font-size:13px;">{book.title}</div>',
                          '<div style="margin-top:5px"><span style="color:#666;">作者:   </span>{book.author}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">出版商: </span>{book.publisher}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">出版:   </span>{book.pubdate}  <span style="color:#666;">| 页数:   </span>{book.pages}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">价格:   </span>{book.price} <span style="color:#666;">| 评价:   </span>{book.rating.average}/10</div>',
                        '</div>',
                    '</div>'
                ].join('')
            },
            {
                xtype: 'container',
                layout: 'fit',
                margin: '0 0 5 0',
                scrollable: 'vertical',
                flex: 5,
                items: [{
                    xtype: 'component',
                    itemId: 'summary',
                    tpl: '<p>{summary}</p>',
                    placeHolder: '没有内容简介'
                }]  
            },           
            {
                margin: '0 5 5 5',
                flex: 1,
                xtype: 'button',
                itemId: 'deleteButton',
                text: '不看了'
            }
        ]
    }

});
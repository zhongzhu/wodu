Ext.define('Wodu.view.BookDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'bookdetails',

    requires: [
        'Ext.Img',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.field.TextArea',
        'Ext.field.Radio'
    ],

    config: {
        scrollable: null,
        style: 'font-family:Helvetica,sans-serif;',
        items: [
            {
                xtype: 'label',
                height: '150px',
                margin: '10px 5px 0 5px',
                itemId: 'book_title',
                name: 'title',
                tpl: [
                    '<div class="book_info_title">',
                        '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 110px; height: 140px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                        '<div class="content" style="font-size:10px;">',
                          '<div class="title" style="font-weight:bold;font-size:13px;">{book.title}</div>',
                          '<div style="color:#666;margin-top:10px">作者:   {book.author}</div>',
                          '<div style="color:#666;margin-top:2px">出版商: {book.publisher}</div>',
                          '<div style="color:#666;margin-top:2px">出版:   {book.pubdate}</div>',
                          '<div style="color:#666;margin-top:2px">页数:   {book.pages}</div>',
                          '<div style="color:#666;margin-top:2px">评价:   {book.rating.average}</div>',
                        '</div>',
                    '</div>'
                ].join('')                  
            },
            {
                xtype: 'textareafield',
                style: 'font-size: 13px; margin: 0 .5em 0 .5em;',
                clearIcon: false,
                readOnly: true,
                height: '150px',
                name: 'summary',
                placeHolder: '没有内容简介'
            },
           {
                margin: '1em .5em 1.5em .5em',
                xtype: 'button',
                ui: 'confirm-round',
                text: '看完了'
            }
        ]
    }

});
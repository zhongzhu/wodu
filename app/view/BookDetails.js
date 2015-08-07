Ext.define('Wodu.view.BookDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'bookdetails',

    requires: [
        'Ext.Img',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.field.TextArea'
    ],

    config: {
        // scrollable: false,
        items: [
            {
                xtype: 'label',
                // height: '135px',
                margin: '10px 0 10px 10',
                itemId: 'book_title',
                name: 'title',
                tpl: [
                    '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 90px; height: 113px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                    '<div class="content" style="font-family:Helvetica,sans-serif;font-size:10px;">',
                      '<div class="title" style="font-size:13px; font-weight:bold;">{book.title}</div>',
                      '<div style="color:#666;margin:10px 0 0  0">作者:   {book.author}</div>',
                      '<div style="color:#666;">出版商: {book.publisher}</div>',
                      '<div style="color:#666;">出版:   {book.pubdate}</div>',
                      '<div style="color:#666;">ISBN:   {book.isbn13}</div>',
                      '<div style="color:#666;margin:0 0 10px 0">页数:   {book.pages}</div>',                      
                    '</div>',
                ].join('')                  
            },
            {
                xtype: 'fieldset',
                style: 'font-family:Helvetica,sans-serif;font-size:13px;',
                title: '内容简介',
                items: [
                    {
                        xtype: 'textareafield',
                        clearIcon: false,
                        readOnly: true,
                        height: '150px',
                        name: 'summary',
                    }
                ]
            },
            {
                xtype: 'fieldset',
                // layout: 'hbox',
                items: [
                    {
                        xtype: 'radiofield',
                        label: '已看完',
                        name: 'field'
                    },
                    {
                        xtype: 'radiofield',
                        label: '不想看了',
                        name: 'field'
                    }
                ]
            }            
        ]
    }

});
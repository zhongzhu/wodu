Ext.define('Wodu.view.BookDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'bookdetails',

    requires: [
        'Ext.Img',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.field.TextArea',
        'Ext.field.Radio',
        'Ext.field.Hidden'
    ],

    config: {
        scrollable: null,
        style: 'font-family:Helvetica,sans-serif;',
        items: [
            {
                xtype: 'label',
                height: '170px',
                margin: '10px 5px 0 5px',
                itemId: 'book_title',
                name: 'title',
                tpl: [
                    '<div class="book_info_title">',
                        '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 110px; height: 140px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                        '<div class="content" style="font-size:10px;">',
                          '<div class="title" style="font-weight:bold;font-size:13px;">{book.title}</div>',
                          '<div style="margin-top:10px"><span style="color:#666;">作者:   </span>{book.author}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">出版商: </span>{book.publisher}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">出版:   </span>{book.pubdate}</div>',
                          '<div style="margin-top:2px"><span style="color:#666;">页数:   </span>{book.pages}</div>',
                          '<div style="margin-top:4px"><span style="color:#666;">评价:   </span>{book.rating.average}/10</div>',
                        '</div>',
                    '</div>'
                ].join('')                  
            },
            {
                xtype: 'hiddenfield',
                name: 'id',
                itemId: 'book_id'
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
                itemId: 'bookdetails_actionbutton',
                ui: 'confirm-round',
                text: '看完了'
            }
        ]
    }

});
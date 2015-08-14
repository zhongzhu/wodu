Ext.define('Wodu.view.SearchBooksForm', {
    extend: 'Ext.form.Panel',
    xtype: 'searchbooksform',

    requires: [
        'Ext.Toolbar',
        'Ext.field.Search',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    { xtype: 'spacer' },
                    {
                        xtype: 'searchfield',                        
                        placeHolder: '书名，作者，ISBN'
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'list',
                itemId: 'searchbookslist',
                store: 'SearchBooksStore',
                itemTpl: 'haha{title}'
            }
        ]
    }

});
Ext.define('Wodu.store.BooksReadingStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Wodu.model.Book',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        autoLoad: true,
        model: 'Wodu.model.Book',
        storeId: 'BooksReadingStore',
        proxy: {
            type: 'ajax',
            extraParams: {
                status: 'reading'
            },
            url: 'https://api.douban.com/v2/book/user/57855213/collections',
            reader: {
                type: 'json',
                rootProperty: 'collections'
            }
        }
    }
});
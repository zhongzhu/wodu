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
                status: 'reading',
                apikey: 'xxx'
            },
            url: 'https://api.douban.com/v2/book/user/yyy/collections',
            reader: {
                type: 'json',
                rootProperty: 'collections',
                record: 'book'
            }
        }
    }
});

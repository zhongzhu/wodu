Ext.define('Wodu.store.BooksReadingStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Wodu.model.Book',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'Wodu.model.Book',
        storeId: 'BooksReadingStore',
        proxy: {
            type: 'ajax',
            extraParams: {
                status: 'reading'
            },
            reader: {
                type: 'json',
                rootProperty: 'collections',
                record: 'book'
            }
        }
    }
});

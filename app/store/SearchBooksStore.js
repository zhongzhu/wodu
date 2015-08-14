Ext.define('Wodu.store.SearchBooksStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Wodu.model.Book',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'Wodu.model.Book',
        storeId: 'SearchBooksStore',
        pageSize: 10,
        proxy: {
            type: 'ajax',
            limitParam: 'count',
            reader: {
                type: 'json',
                rootProperty: 'books'
            }
        }
    }
});

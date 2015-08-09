Ext.define('Wodu.store.BooksReadingStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Wodu.model.Book',
        'Wodu.model.ReadingInfo',        
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'Wodu.model.ReadingInfo',
        storeId: 'BooksReadingStore',
        proxy: {
            type: 'ajax',
            limitParam: 'count',
            reader: {
                type: 'json',
                rootProperty: 'collections'
            }
        }
    }
});

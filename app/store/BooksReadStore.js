Ext.define('Wodu.store.BooksReadStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Wodu.model.Book',
        'Wodu.model.ReadingInfo',        
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'Wodu.model.ReadingInfo',
        storeId: 'BooksReadStore',
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

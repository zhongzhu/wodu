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
            extraParams: {
                fields: 'updated,id,book_id,book',
                status: 'reading',
                apikey: localStorage.myApikey
            },
            url: 'https://api.douban.com/v2/book/user/' + localStorage.myId + '/collections',
            reader: {
                type: 'json',
                rootProperty: 'collections'
            }
        }
    }
});

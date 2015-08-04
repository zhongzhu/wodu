Ext.define('Wodu.model.Book', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.data.Field'
    ],    

    config: {
        fields: [
            { name: 'title', type: 'auto' },
            { name: 'image', type: 'auto' },
            { name: 'book_id', type: 'auto' }

        ]
    }
});

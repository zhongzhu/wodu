Ext.define('Wodu.model.Book', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.data.Field'
    ],    

    config: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'image', type: 'string' },
            { name: 'author', type: 'string' },
            { name: 'id', type: 'auto' }
        ]

    }
});

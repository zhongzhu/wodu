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
            { name: 'summary', type: 'string' },
            { name: 'publisher', type: 'string' },
            { name: 'pubdate', type: 'string' },   
            { name: 'isbn13', type: 'string' }, 
            { name: 'pages', type: 'string' },                                 
            { name: 'id', type: 'auto' }
        ]

    }
});

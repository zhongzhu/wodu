Ext.define('Wodu.model.ReadingInfo', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],    

    config: {
        fields: [
            {name: 'updated', type: 'string'},
            {name: 'status', type: 'string'},            
            {name: 'id', type: 'auto'},
            {name: 'book_id', type: 'string'}
        ],

        hasOne: {
            model: 'Wodu.model.Book',
            name: 'book' //foreignKey will default to: 'book_id'          
        }
    }
});

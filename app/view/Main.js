Ext.define('Wodu.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    
    config: {
        tabBar: {
            docked: 'bottom'
        },

        items: [
            {
                xtype: 'booksreadingnaviview',
                title: '在读',
                iconCls: 'time'                
            },

            {
                xtype: 'bookswishnaviview',
                title: '想读',
                iconCls: 'star'
            },
            
            {
                xtype: 'booksreadnaviview',
                title: '读过',
                iconCls: 'organize'
            },
            
            {
                xtype: 'searchbooksform',
                title: '新书',
                iconCls: 'search'
            }

        ]
    }
});

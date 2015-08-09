Ext.define('Wodu.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    requires: [
        'Ext.TitleBar'
    ],
    
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
                title: '想读',
                iconCls: 'star'
            },
            
            {
                title: '读过',
                iconCls: 'organize'
            },
            {
                title: '新书',
                iconCls: 'search'
            }

        ]
    }
});

Ext.define('Wodu.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
    ],
    config: {
        tabBar: {
            docked: 'bottom'
        },

        items: [
            {
                xtype: 'booksreading',
                title: '在读',
                iconCls: 'home'                
            },

            {
                title: '想读',
                iconCls: 'action',
            },
            
            {
                title: '读过',
                iconCls: 'check2'
            },
            {
                title: '新书',
                iconCls: 'search'
            }

        ]
    }
});

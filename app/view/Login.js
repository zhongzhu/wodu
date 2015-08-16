Ext.define('Wodu.view.Login', {
    extend: 'Ext.Panel',
    xtype: 'loginpanel',

    requires: [
        'Ext.Toolbar',
        'Ext.Label',
        'Ext.Button'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        centered: true,
                        html: '爱看书'
                    }
                ]
            },
            {
                xtype: 'button',
                centered: true,
                itemId: 'loginButton',
                margin: '20 5 0 5',
                ui: 'confirm-round',
                text: '用豆瓣账号登陆'
            }
        ]
    }

});
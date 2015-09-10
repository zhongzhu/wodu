Ext.define('Wodu.controller.Menu', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            theMenu: 'menu'
        },

        control: {
            'menu #logoutButton': {
              tap: 'logout' 
            }
        } 
    },

    logout: function(theButton, e, eOpts) {
        Ext.Viewport.hideMenu('left');
        Wodu.util.Util.logout();
    }

});

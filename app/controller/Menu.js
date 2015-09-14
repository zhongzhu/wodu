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
      localStorage.removeItem('myToken');
      localStorage.removeItem('myId');
      localStorage.removeItem('myRefreshToken');
      localStorage.removeItem('myName');
      localStorage.removeItem('myAvatar');

      Ext.Viewport.hideMenu('left');
      Wodu.util.Util.logout();
    }

});

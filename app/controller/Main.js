Ext.define('Wodu.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainPanel: 'main'
        },

        control: {
            // mainPanel: {
            //     activeitemchange: 'activeitemchange'
            // }
        }            
    }

    // activeitemchange: function( component, value, oldValue, eOpts ) {
    //     console.log(component);
    //     console.log(value);
    //     console.log(oldValue);

    //     var a = component.getTabBar().getActiveTab().setBadgeText('5');
    //     console.log(a);        
    // }

});

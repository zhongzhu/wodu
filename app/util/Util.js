Ext.define('Wodu.util.Util', {
    singleton: true,

    myApikey: 'xxx',
    mySecret: 'yyy',

    showNavBarTitle: function(theNavView, title) {
      console.log('showNavBarTitle');

      var navBar = theNavView.getNavigationBar();

      if (theNavView.getInnerItems().length === navBar.backButtonStack.length) {
        var stack = navBar.backButtonStack;
        stack[stack.length - 1] = title;
        navBar.setTitle(title);
      }             
    }
});
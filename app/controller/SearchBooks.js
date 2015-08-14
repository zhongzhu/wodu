Ext.define('Wodu.controller.SearchBooks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            searchBooksForm: 'searchbooksform',
            searchBooksList: 'searchbooksform #searchbookslist'
        },

        control: {
            'searchbooksform toolbar searchfield': {
                action: 'searchAction'
            }
        }            
    },

    searchAction: function(theSearchField, e, eOpts) {
      var searchText = theSearchField.getValue();

      var store = Ext.getStore('SearchBooksStore');   
      // store.removeAll();

      if (localStorage.myId) {
          var proxy = store.getProxy();
          proxy.setExtraParams({
            q: searchText,
            apikey: Wodu.util.Util.myApikey
          });

          proxy.setUrl('https://api.douban.com/v2/book/search');

          store.load();
      };        
    }

});

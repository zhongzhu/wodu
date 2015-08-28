Ext.define('Wodu.view.BooksWishList', {
    extend: 'Ext.dataview.List',
    xtype: 'bookswishlist',

    requires: [
        'Ext.XTemplate',
        'Ext.plugin.ListPaging',
        'Wodu.util.RefreshFn'
    ],

    config: {
      store: 'BooksWishStore',
      disableSelection: true,
      itemHeight: '135px',
      variableHeights: false,
      emptyText: '你还没有想读的书',

      plugins: [
        {
          xclass: 'Ext.plugin.ListPaging',
          autoPaging: true,
          loadMoreText: '加载更多...',
          noMoreRecordsText: '到头啦'
        },
        {
            xtype: 'refreshFn',
            refreshFn: function (loaded, arguments) {
              loaded.getList().getStore().loadPage(1);
            }
        }
      ],          

      itemTpl: [
        '<div class="img" style="background-image:url({book.image}); display:inline-block; width: 90px; height: 113px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
        '<div class="content" style="font-family:Helvetica,sans-serif;font-size:10px;">',
          '<div class="title" style="font-size:13px; font-weight:bold;">{book.title}</div>',
          '<div style="color:#666;margin:10px 0 10px 0">{book.author}</div>',
          '<div style="color:#666">{updated:date("Y-m-d")}那天想看这本书</div>',
        '</div>']                                 
    }
});
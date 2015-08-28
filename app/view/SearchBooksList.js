Ext.define('Wodu.view.SearchBooksList', {
    extend: 'Ext.dataview.List',
    xtype: 'searchbookslist',

    requires: [
        'Ext.XTemplate',
        'Ext.plugin.ListPaging'
    ],

    config: {      
      disableSelection: true,
      itemHeight: '135px',
      variableHeights: false,
      emptyText: '奇怪，搜不到这本书',

      plugins: [{
        xclass: 'Ext.plugin.ListPaging',
        autoPaging: true,
        loadMoreText: '加载更多...',
        noMoreRecordsText: '到头啦'
      }],          

      itemTpl: [
            '<div class="book_info_title">',
                '<div class="img" style="background-image:url({image}); display:inline-block; width: 90px; height: 113px; background-repeat: no-repeat;background-size:100%;background-position:50%; float:left; margin-right:10px;"></div>',
                '<div class="content" style="font-size:10px;">',
                  '<div class="title" style="font-weight:bold;font-size:13px;">{title}</div>',
                  '<div style="margin-top:10px"><span style="color:#666;">作者:   </span>{author}</div>',
                  '<div style="margin-top:2px"><span style="color:#666;">出版商: </span>{publisher}</div>',
                  '<div style="margin-top:2px"><span style="color:#666;">出版:   </span>{pubdate}</div>',
                  '<div style="margin-top:2px"><span style="color:#666;">评价:   </span>{rating.average}/10</div>',
                  '<tpl if="current_user_collection">',
                    '<tpl switch="current_user_collection.status">',
                      '<tpl case="reading">',
                        '<div style="margin-top:4px"><span style="color:blue;">本书我已"在读"</span></div>',
                      '<tpl case="wish">',
                        '<div style="margin-top:4px"><span style="color:blue;">本书我已"想读"</span></div>',
                      '<tpl case="read">',
                        '<div style="margin-top:4px"><span style="color:blue;">本书我已"读过"</span></div>',
                    '</tpl>',                    
                  '</tpl>',
                '</div>',
            '</div>'              
      ]                                 
    }
});
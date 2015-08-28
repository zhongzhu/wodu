/**
 * This user extension gives st 2.3.0 Pullrefresh the RefreshFn back
 * based on sencha touch 2.3.0
 * 
 * @class Ext.ux.touch.PullRefreshFn
 * @version 2.0.0
 * @author Martin Hess <https://github.com/p5hema2>
 *
 * ## Example
 *
 *     Ext.create('Ext.dataview.List', {
 *         fullscreen: true,
 *
 *         store: store,
 *
 *         plugins: [
 *             {
 *                 xclass: 'Ext.ux.touch.PullRefreshFn',
 *                 pullRefreshText: 'Pull down for more new Tweets!'
 *                 refreshFn: function() { 
 *                        Ext.getStore('ENTER YOUR STORE HERE').load('',1)
 *                   }
 *             }
 *         ],
 *
 *         itemTpl: [
 *             'YOUR ITEMTPL'
 *         ]
 *     });
 */

// Below class Wodu.util.RefreshFn is modified from https://github.com/p5hema2/Sencha-PullRefresh-RefreshFn/blob/master/ST2.3/PullRefreshFn.js
// original author info is listed above

Ext.define('Wodu.util.RefreshFn', {
    extend: 'Ext.plugin.PullRefresh',
    xtype: 'refreshFn',
    requires: ['Ext.DateExtras'],

    config: {
        /**
         * @cfg {Function} refreshFn The function that will be called to refresh the list.
         * If this is not defined, the store's load function will be called.
         * The refresh function gets called with a reference to this plugin instance.
         * @accessor
         */
        refreshFn: null,
        lastUpdatedText: '上次刷新时间：',
        loadingText: '加载中...',
        pullRefreshText: '下拉可以手动刷新',
        releaseRefreshText: '松开可以刷新',
        lastUpdatedDateFormat: 'Y-m-d H:i'        
    },
    
    fetchLatest: function() {
        if (this.getRefreshFn()) {
            this.getRefreshFn().call(this, this);
            this.setState("loaded");
            this.fireEvent('latestfetched', this, 'refreshFn, you have to handle toInsert youself');
            if (this.getAutoSnapBack()) {
                this.snapBack();
            }
        } else {    
            var store = this.getList().getStore(),
                proxy = store.getProxy(),
                operation;
    
            operation = Ext.create('Ext.data.Operation', {
                page: 1,
                start: 0,
                model: store.getModel(),
                limit: store.getPageSize(),
                action: 'read',
                sorters: store.getSorters(),
                filters: store.getRemoteFilter() ? store.getFilters() : []
            });
    
            proxy.read(operation, this.onLatestFetched, this);
        }
    }
});
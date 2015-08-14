Ext.define('Wodu.controller.BookDetails', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails'
    ],       

    config: {
        refs: {
            bookDetails: 'bookdetails',
            readingNaviView: 'booksreadingnaviview',
            wishNaviView: 'bookswishnaviview',
            readNaviView: 'booksreadnaviview'
        },

        control: {
            'bookdetails #bookdetails_actionbutton': {
                tap: 'onBookDetailsActionButtonTap'
            }
        } 
    },

    // 用户修改对某本图书的收藏
    // PUT  https://api.douban.com/v2/book/:id/collection
    // status   收藏状态    必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
    onBookDetailsActionButtonTap: function(theButton, e, eOpts) {
        console.log('onBookDetailsActionButtonTap');

        var me = this;
        var bookDetailsView = this.getBookDetails();
        var bookId = bookDetailsView.down('#book_id').getValue();

        var buttonText = theButton.getText();        
        if (buttonText === '看完了') {
            // Books Reading
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=read',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksReadingStore');
                store.remove(store.getById(response.id));

                var toStore = Ext.getStore('BooksReadStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                me.getReadingNaviView().pop();
            }).fail(function(response) {
                Ext.Msg.alert('出错了', '无法改变成已读状态');
            })
        } else if (buttonText === '开始看') {
            // Books Wish
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=reading',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksWishStore');
                store.remove(store.getById(response.id));

                var toStore = Ext.getStore('BooksReadingStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                me.getWishNaviView().pop();
            }).fail(function(response) {
                Ext.Msg.alert('出错了', '无法改变成正在读状态');
            })          
        } else if (buttonText === '还想再看一遍') {
            // Books read
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=wish',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksReadStore');
                store.remove(store.getById(response.id));

                var toStore = Ext.getStore('BooksWishStore');
                if (toStore.getCount() > 0) {
                    toStore.insert(0, Ext.create('Wodu.model.ReadingInfo', response));
                }

                me.getReadNaviView().pop();
            }).fail(function(response) {
                Ext.Msg.alert('出错了', '无法改变成想读状态');
            })               
        }

    }    

});
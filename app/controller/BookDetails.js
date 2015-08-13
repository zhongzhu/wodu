Ext.define('Wodu.controller.BookDetails', {
    extend: 'Ext.app.Controller',

    requires: [
      'Wodu.view.BookDetails'
    ],       

    config: {
        refs: {
            bookDetails: 'bookdetails'            
        },

        control: {
            'bookdetails #bookdetails_actionbutton': {
                tap: 'onBookDetailsActionButtonTap'
            }
        } 
    },

    onBookDetailsActionButtonTap: function(theButton, e, eOpts) {
        console.log('onBookDetailsActionButtonTap');

        var bookId = this.getBookDetails().down('#book_id').getValue();

        var buttonText = theButton.getText();        
        if (buttonText === '看完了') {
            console.log('going to do ajax');
            // 用户修改对某本图书的收藏
            // PUT  https://api.douban.com/v2/book/:id/collection
            // status   收藏状态    必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=read',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksReadingStore');
                store.remove(store.getById(response.id));
            }).fail(function(response) {
                console.log('fail');
                console.log(response);
                Ext.Msg.alert('出错了', '无法改变成已读状态');
            })
        } else if (buttonText === '开始看') {
            $.ajax({
                url: 'https://api.douban.com/v2/book/' + bookId + '/collection',
                method: 'PUT',
                data: 'status=reading',
                headers: {Authorization: 'Bearer ' + localStorage.myToken}
            }).done(function(response) {
                var store = Ext.getStore('BooksWishStore');
                store.add(store.getById(response.id));
            }).fail(function(response) {
                console.log('fail');
                console.log(response);
                Ext.Msg.alert('出错了', '无法改变成正在读状态');
            })          
        }

    }    

});
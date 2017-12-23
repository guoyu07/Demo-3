 var log = console.log.bind(console);

// function _click (list) {
//     var show = document.getElementById("show");
//     var title = document.querySelector('h4');
//     var img = document.querySelector('img');
//     var descText = document.querySelector('p');
//     img.addEventListener("click", function(){
//         list[img.id].likeCount +=1;
//         descText.innerHTML = "这只猫被赞了"+list[img.id].likeCount+"次";
//     })
//     return function (list, i) {
//         img.setAttribute("id",i);
//         title.innerHTML = list[i].innerHTML;
//         img.src = list[i].getAttribute("data-src");
//         descText.innerHTML = "这只猫被赞了"+list[i].likeCount+"次";
//     }
// }

// function __main(){
// var list =document.querySelectorAll("h2")//载入所有图片资源
// var click = _click(list);//注册click功能函数
// for (var i=0; i<list.length; i++){
//     (function (i){
//         list[i].likeCount = 0;
//         list[i].addEventListener("click", function(){click(list, i)} );
//     })(i);
// }//添加监听事件
// }

// __main();

(function(){

var model = {
    cat1: {
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1815872734,1365654438&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat2: {
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=288854877,662654077&fm=200&gp=0.jpg",
        likeCount:0,
    },
    cat3: {
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3640611312,3270221672&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat4: {
        src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3676232921,924856186&fm=200&gp=0.jpg",
        likeCount:0,
    },
    cat5: {
        src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4004882612,3608849549&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat6: {
        src:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1422921158,1241989086&fm=27&gp=0.jpg",
        likeCount:0,
    },
}

var storage = {
    init: function(){
        if(!localStorage.cat){
            localStorage.cat = JSON.stringify(model);
        } else if (localStorage.cat) {
            controller.LSinMod();
        }
    },
    saveToLS: function(){
        localStorage.cat = JSON.stringify(model);
    },
    getFromLS: function(){
        return JSON.parse(localStorage.cat);
    },
}

var controller = {
    getCount: function(catId){
        return storage.getFromLS()["cat"+catId].likeCount;
    },
    getSrc: function(catId){
        return storage.getFromLS()["cat"+catId].src;
    },
    like: function(catId){
        model["cat"+catId].likeCount += 1;
        storage.saveToLS();
        view.updateLike(catId);
    },
    LSinMod: function(){
        model = storage.getFromLS();
    },
}


var view = {
    init: function(){
        this.stage = document.getElementById("show");
        this.stage.s_title = document.querySelector('h4');
        this.stage.s_img = document.querySelector('img');
        this.stage.s_descText = document.querySelector('p');
        this.list = document.querySelectorAll("h2");
        for (var i=0; i<view.list.length; i++){
            (function(i){
            view.list[i].addEventListener("click", function(e){view.renderPic(e,i+1);view.updateLike(i+1)});//初始遍历列表添加监听事件
            })(i)
        }
        view.stage.s_img.addEventListener("click", function(e){controller.like(e.target.id)})//为展示出来的图片添加点赞事件
    },
    renderPic: function(e,catId){
        view.stage.s_img.setAttribute("id",e.target.id);
        view.stage.s_title.innerHTML = view.list[catId-1].innerHTML;
        view.stage.s_img.src = controller.getSrc(catId);
    },
    updateLike: function(catId){
        view.stage.s_descText.innerHTML = "这只猫被赞了"+controller.getCount(catId)+"次";
    },
}

view.init();
storage.init();

})()
 var log = console.log.bind(console);
//面条式代码
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
// 
// (function(){

var model = {
    cat1: {
        name:"一只猫",
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1815872734,1365654438&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat2: {
        name:"二只猫",
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=288854877,662654077&fm=200&gp=0.jpg",
        likeCount:0,
    },
    cat3: {
        name:"三只猫",
        src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3640611312,3270221672&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat4: {
        name:"四只猫",
        src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3676232921,924856186&fm=200&gp=0.jpg",
        likeCount:0,
    },
    cat5: {
        name:"五只猫",
        src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4004882612,3608849549&fm=27&gp=0.jpg",
        likeCount:0,
    },
    cat6: {
        name:"六只猫",
        src:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1422921158,1241989086&fm=27&gp=0.jpg",
        likeCount:0,
    },
}

var storage = {
    init: function(){
        if(!localStorage.cat){
            localStorage.cat = JSON.stringify(model);//若第一次运行本程序则将 model 数据初始化载入 LocalStorage
        } else if (localStorage.cat) {
            controller.LSinMod();//若非第一次运行则从 LocalStorage 获取点赞数据
        }
    },
    saveToLS: function(){
        localStorage.cat = JSON.stringify(model);//编译最新的 model 为 JSON 格式储存至 LocalStorage
    },
    getFromLS: function(){
        return JSON.parse(localStorage.cat);//获取 LocalStorage 数据
    },
}

var controller = {
    init: function(){
        storage.init();
        view.init();
    },
    getName: function(catId){
        return storage.getFromLS()["cat"+catId].name;
    },
    getSrc: function(catId){
        return storage.getFromLS()["cat"+catId].src;//获取猫咪图片数据
    },
    getCount: function(catId){
        return storage.getFromLS()["cat"+catId].likeCount;//获取点赞数据
    },
    like: function(catId){
        model["cat"+catId].likeCount += 1;//点赞+1s
        storage.saveToLS();//储存至 LocalStorage
        view.updateLike(catId);// 在页面上更新点赞数
    },
    LSinMod: function(){
        model = storage.getFromLS();// model 从 LocalStorage 获取数据
    },
    adminChangeLS: function(){
        var changingID = view.getStagePicID();//获得当前所修改的 ID
        var adminData = view.getAdminData();//载入表单数据
        for(var i in adminData){
            if (adminData[i]!=""){
                model["cat"+changingID][i] = adminData[i];
            }
        }//遍历填写的内容,除去未填写的部分
        storage.saveToLS();
        view.renderList();
        view.renderPic(changingID);
        view.updateLike(changingID);
    },
}


var view = {
    init: function(){
        this.stage = document.getElementById("show");
        this.stage.s_title = document.querySelector('h4');
        this.stage.s_img = document.querySelector('img');
        this.stage.s_descText = document.querySelector('p');
        this.list = document.querySelectorAll("h2");
        this.adminBtn = document.querySelector("#admin-button");
        this.form = document.querySelector("#admin-form");
        this.formName = document.querySelector("#form-name");
        this.formLink = document.querySelector("#form-link");
        this.formCount = document.querySelector("#form-count");
        this.formSave = document.querySelector("#form-save");
        this.formCount = document.querySelector("#form-count");

        view.renderList();
        for (var i=0; i<view.list.length; i++){
            (function(i){
            view.list[i].addEventListener("click", function(e){view.setFlag(e);view.renderPic(i+1);view.updateLike(i+1)});//初始化遍历列表添加监听事件
            })(i)
        }
        view.stage.s_img.addEventListener("click", function(e){controller.like(e.target.id)})//为展示区的图片添加点赞事件
        view.adminBtn.addEventListener("click", view.toggleSwitch );
        view.formSave.addEventListener("click",controller.adminChangeLS);
    },
    setFlag: function(e){
        view.stage.s_img.setAttribute("id",e.target.id);
    },
    renderList: function(){
        for (var i = 0;i<view.list.length;i++){
            view.list[i].innerHTML = controller.getName(i+1);
        }
    },
    renderPic: function(catId){
        view.stage.s_title.innerHTML = controller.getName(catId);
        view.stage.s_img.src = controller.getSrc(catId);
    },
    updateLike: function(catId){
        view.stage.s_descText.innerHTML = "这只猫被赞了"+controller.getCount(catId)+"次";
    },
    toggleSwitch: function(){
        if (view.form.style.display === "none"){
            view.form.style.display = "block";
        }else if (view.form.style.display === "block") {
            view.form.style.display = "none";
        }
    },
    getStagePicID: function(){
        return view.stage.s_img.id;
    },
    getAdminData: function(){
        var a = {
            name: view.formName.value,
            src: view.formLink.value,
            likeCount: Number(view.formCount.value),
        }
        return a;
    }
}

//一触即发
controller.init();

// })()
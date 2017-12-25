 var log = console.log.bind(console);
/**
 * 数据交互模式为:
 * 1.存储:先存储至 model, 后将 model 整体 stringfy 成 JSON 存储至 localstorage.
 * 2.获取:直接从 localstorage 获取 JSON 数据并 parse 成对象使用.
 */

// (function(){

/**
 * 初始数据
 */

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
    cat7: {
        name:"七只鬼",
        src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514805455&di=c6fd072fed77976c2907ddd6180788af&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201402%2F25%2F20140225171138_54uGn.thumb.600_0.jpeg",
        likeCount:0,
    },
}

/**
 * localstorage 方法
 */

var storage = {
    init: function(){
        if(!localStorage.cat){
            localStorage.cat = JSON.stringify(model);//若第一次运行本程序则将 model 数据初始化载入 LocalStorage
        } else if (localStorage.cat) {
            controller.LSLoadToMod();//若非第一次运行则从 LocalStorage 获取点赞数据
        }
    },
    saveToLS: function(){
        localStorage.cat = JSON.stringify(model);//编译最新的 model 为 JSON 格式储存至 LocalStorage
    },
    getFromLS: function(){
        return JSON.parse(localStorage.cat);//获取 LocalStorage 数据
    },
}

/**
 * 集成控制器
 */

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
    saveLike: function(catId){
        model["cat"+catId].likeCount += 1;//点赞+1s
        storage.saveToLS();//储存至 LocalStorage
    },
    LSLoadToMod: function(){
        model = storage.getFromLS();// model 从 LocalStorage 获取数据
    },
    adminSaveChange: function(){
        var changingID = view.getStagePicID();//获得当前所修改的 ID
        var adminData = view.getAdminData();//载入表单数据
        for(var i in adminData){
            if (adminData[i]!=""){
                model["cat"+changingID][i] = adminData[i];
            }
        }//遍历填写的内容,除去未填写的部分
        storage.saveToLS();
    },
    renderList: function(){
        var i,singleLi;
        // var b =[];
        var id = 0;
        for(i in model){
            singleLi = document.createElement("li");
            id += 1;
            singleLi.id = id;
            singleLi.innerHTML = model[i].name;
            view.list.appendChild(singleLi);
            // b.push(singleLi);
            // log(b.toString());
        };
    },
}

/**
 * 视图 DOM 相关的方法
 */

var view = {
    init: function(){
        this.stage = document.getElementById("show");
        this.stage.s_title = document.querySelector('h4');
        this.stage.s_img = document.querySelector('img');
        this.stage.s_descText = document.querySelector('p');
        this.list = document.querySelector("#list");
        this.adminBtn = document.querySelector("#admin-button");
        this.form = document.querySelector("#admin-form");
        this.formName = document.querySelector("#form-name");
        this.formLink = document.querySelector("#form-link");
        this.formCount = document.querySelector("#form-count");
        this.formSave = document.querySelector("#form-save");
        this.formCount = document.querySelector("#form-count");
        this.formCancel = document.querySelector("#form-cancel");
        view.renderList();
        view.listAddEvent();
        view.imgAddEvent();
        view.adminBtnAddEvent();
        view.saveBtnAddEvent();
        view.cancelBtnAddEvent();
    },
    setFlag: function(e){
        view.stage.s_img.setAttribute("id",e.target.id);
    },
    renderList: function(){
        controller.renderList();
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
    },
    clearForm: function(){
        view.formName.value = "";
        view.formLink.value = "";
        view.formCount.value = "";
    },
    clearList: function(){
        view.list.innerHTML = "";
    },
    listAddEvent: function(){
        for (var i=0; i<view.list.childNodes.length; i++){
            (function(i){
            view.list.childNodes[i].addEventListener("click", function(e){view.setFlag(e);view.renderPic(view.getStagePicID());view.updateLike(view.getStagePicID());})//初始化遍历列表添加监听事件
            })(i)
        }
    },
    imgAddEvent: function(){
        view.stage.s_img.addEventListener("click", function(){
            controller.saveLike(view.getStagePicID());
            view.updateLike(view.getStagePicID());
        })//为展示区的图片添加点赞事件
    },
    adminBtnAddEvent: function(){
        view.adminBtn.addEventListener("click", function(){
            view.toggleSwitch();view.clearForm();
        });
    },
    saveBtnAddEvent: function(){
        view.formSave.addEventListener("click",function(){
            controller.adminSaveChange();
            view.clearForm();
            view.clearList();
            view.renderList();
            view.listAddEvent();
            view.renderPic(view.getStagePicID());
            view.updateLike(view.getStagePicID());
            view.clearForm();
        });
    },
    cancelBtnAddEvent: function(){
        view.formCancel.addEventListener("click",function(){
            view.toggleSwitch();view.clearForm();
        });
    }
}

//一触即发
controller.init();

// })()
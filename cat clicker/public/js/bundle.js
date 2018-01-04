/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return controller; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_js__ = __webpack_require__(4);




var controller = {
/**
 * 集成控制器模块
 */
    init: function(){
        __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].init();
        __WEBPACK_IMPORTED_MODULE_2__view_js__["a" /* view */].init();
    },// storage 与 view 两大模块初始化(全局初始化)
    getName: function(catId){
        return __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].getFromLS(catId)["name"];
    },// 从 LocalStorage 获取猫咪名字数据
    getSrc: function(catId){
        return __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].getFromLS(catId)["src"];
    },// 从 LocalStorage 获取猫咪图片数据
    getCount: function(catId){
        return __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].getFromLS(catId)["likeCount"];
    },// 从 LocalStorage 获取猫咪点赞数据
    // 待优化:未获取单项数据,而获取全部数据
    saveLike: function(catId){
        __WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */]["cat"+catId]["likeCount"] += 1;// model 数据点赞+1s
        __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].saveToLS();// 将 model 数据储存至 LocalStorage
    },// 储存点赞数据
    LSLoadToMod: function(){
        var i;
        for (i in __WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */]) {
        __WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */][i] = __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].getFromLS(i.slice(3));
        }
    },// 将 LocalStorage 最新的数据载入 model
    ModLoadToLS: function(){
        localStorage.setItem("cat",JSON.stringify(__WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */]));
    },
    adminSaveChange: function(){
        var changingID = __WEBPACK_IMPORTED_MODULE_2__view_js__["a" /* view */].getStagePicID();// 获得当前所修改的 ID
        var adminData = __WEBPACK_IMPORTED_MODULE_2__view_js__["a" /* view */].getAdminData();// 载入 admin 表单数据
        for(var i in adminData){
            if (adminData[i]!=""){
                __WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */]["cat"+changingID][i] = adminData[i];
            }
        }//遍历填写的内容,除去未填写的部分,拣取填写的数据
        __WEBPACK_IMPORTED_MODULE_1__storage_js__["a" /* storage */].saveToLS();
    },// admin 将更改保存至数据库
    renderList: function(){
        var i,singleLi;
        // var b =[];
        var id = 0;
        for(i in __WEBPACK_IMPORTED_MODULE_0__model_js__["a" /* model */]){
            singleLi = document.createElement("li");
            id += 1;
            singleLi.id = id;
            singleLi.innerHTML = controller.getName(id);
            __WEBPACK_IMPORTED_MODULE_2__view_js__["a" /* view */].list.appendChild(singleLi);
        };
    },//重新渲染 list
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_js__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].init();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return model; });

var model = {
/**
 * 可设置的初始数据
 */
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_js__ = __webpack_require__(0);


var storage = {
/**
 * localstorage 模块
 */

 /**
 * 数据交互模式:
 * 1.存储:先存储至 model, 后将 model 整体 stringfy 成 JSON 存储至 localstorage.
 * 2.获取:直接从 localstorage 获取 JSON 数据并 parse 成对象使用.
 */
    init: function(){
        if(!localStorage["cat"]){
            __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].ModLoadToLS();// 若第一次运行本程序则将 model 数据初始化载入 LocalStorage
        } 
        else if (localStorage["cat"]) {
            __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].LSLoadToMod();// 若非第一次运行则直接从 LocalStorage 获取数据
        }
    },// 初始化同步 model 与 LocalStorage 数据
    saveToLS: function(){
        __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].ModLoadToLS();
    },// 编译最新的 model 为 JSON 格式储存至 LocalStorage
    getFromLS: function(catId){
        return JSON.parse(localStorage["cat"])["cat"+catId];
    },// 获取 LocalStorage 数据并解析为 JS 对象格式数据
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return view; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_js__ = __webpack_require__(0);


var view = {
/**
 * 视图 DOM 相关的方法
 */
    init: function(){
        view.getDOM()// 获取并储存 DOM 元素节点
        view.renderList(); // 渲染 List
        view.listAddEvent();// 为 List 添加事件监听
        view.imgAddEvent();// 为 img 图片展示框添加事件监听
        view.adminBtnAddEvent();// 为 admin 按钮添加事件监听
        view.saveBtnAddEvent();// 为 save 按钮添加事件监听
        view.cancelBtnAddEvent();// 为 cancel 按钮添加事件监听
    },// view 模块初始化
    getDOM: function(){
        this.stage = document.getElementById("show"); // 展示区
        this.stage.s_title = document.querySelector('h4'); // 展示区 标题
        this.stage.s_img = document.querySelector('img');// 展示区 图片
        this.stage.s_descText = document.querySelector('p');// 展示区 描述
        this.list = document.querySelector("#list");// 列表
        this.adminBtn = document.querySelector("#admin-button");// admin 开关按钮
        this.form = document.querySelector("#admin-form");// admin 表单
        this.formName = document.querySelector("#form-name");// admin 表单 名字
        this.formLink = document.querySelector("#form-link");// admin 表单 链接
        this.formCount = document.querySelector("#form-count");// admin 表单 点赞
        this.formSave = document.querySelector("#form-save");// admin 保存
        this.formCancel = document.querySelector("#form-cancel");// admin 取消
    },
    setFlag: function(e){
        view.stage.s_img.setAttribute("id",e.target.id);
    },// 为展示区设置指示 id
    renderList: function(){
        __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].renderList();
    },// 渲染 List
    renderPic: function(catId){
        view.stage.s_title.innerHTML = __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].getName(catId);
        view.stage.s_img.src = __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].getSrc(catId);
    },// 渲染展示区 标题 以及 图片
    updateLike: function(catId){
        view.stage.s_descText.innerHTML = "这只猫被赞了"+__WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].getCount(catId)+"次";
    },// 渲染展示区 点赞
    toggleSwitch: function(){
        if (view.form.style.display === "none"){
            view.form.style.display = "block";
        }else if (view.form.style.display === "block") {
            view.form.style.display = "none";
        }
    },// 开关 admin 表单
    getStagePicID: function(){
        return view.stage.s_img.id;
    },// 获取展示区正在展示的图片 ID
    getAdminData: function(){
        var a = {
            name: String(view.formName.value),
            src: String(view.formLink.value),
            likeCount: Number(view.formCount.value),
        }
        return a;
    },//获取 admin 表单数据
    clearForm: function(){
        view.formName.value = "";
        view.formLink.value = "";
        view.formCount.value = "";
    },//清空 admin 表单
    clearList: function(){
        view.list.innerHTML = "";
    },//清空 list 以便重新渲染
    listAddEvent: function(){
        for (var i=0; i<view.list.childNodes.length; i++){
            (function(i){
            view.list.childNodes[i].addEventListener("click", function(e){view.setFlag(e);view.renderPic(view.getStagePicID());view.updateLike(view.getStagePicID());})//初始化遍历列表添加监听事件
            })(i)
        }
    },// 为 list 添加事件监听
    imgAddEvent: function(){
        view.stage.s_img.addEventListener("click", function(){
            __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].saveLike(view.getStagePicID());
            view.updateLike(view.getStagePicID());
        })
    },// 为 img 图片展示框添加事件监听
    adminBtnAddEvent: function(){
        view.adminBtn.addEventListener("click", function(){
            view.toggleSwitch();view.clearForm();
        });
    },// 为 admin 按钮添加事件监听
    saveBtnAddEvent: function(){
        view.formSave.addEventListener("click",function(){
            __WEBPACK_IMPORTED_MODULE_0__controller_js__["a" /* controller */].adminSaveChange();
            view.clearForm();
            view.clearList();
            view.renderList();
            view.listAddEvent();
            view.renderPic(view.getStagePicID());
            view.updateLike(view.getStagePicID());
            view.clearForm();
        });
    },// 为 save 按钮添加事件监听
    cancelBtnAddEvent: function(){
        view.formCancel.addEventListener("click",function(){
            view.toggleSwitch();view.clearForm();
        });
    },// 为 cancel 按钮添加事件监听
}


/***/ })
/******/ ]);
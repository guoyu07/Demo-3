import {controller} from "./controller.js"
export {view};
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
        controller.renderList();
    },// 渲染 List
    renderPic: function(catId){
        view.stage.s_title.innerHTML = controller.getName(catId);
        view.stage.s_img.src = controller.getSrc(catId);
    },// 渲染展示区 标题 以及 图片
    updateLike: function(catId){
        view.stage.s_descText.innerHTML = "这只猫被赞了"+controller.getCount(catId)+"次";
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
            controller.saveLike(view.getStagePicID());
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
            controller.adminSaveChange();
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

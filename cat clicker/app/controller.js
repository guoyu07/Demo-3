import {model} from "./model.js"
import {storage} from "./storage.js"
import {view} from "./view.js"
export {controller};
var controller = {
/**
 * 集成控制器模块
 */
    init: function(){
        storage.init();
        view.init();
    },// storage 与 view 两大模块初始化(全局初始化)
    getName: function(catId){
        return storage.getFromLS(catId)["name"];
    },// 从 LocalStorage 获取猫咪名字数据
    getSrc: function(catId){
        return storage.getFromLS(catId)["src"];
    },// 从 LocalStorage 获取猫咪图片数据
    getCount: function(catId){
        return storage.getFromLS(catId)["likeCount"];
    },// 从 LocalStorage 获取猫咪点赞数据
    // 待优化:未获取单项数据,而获取全部数据
    saveLike: function(catId){
        model["cat"+catId]["likeCount"] += 1;// model 数据点赞+1s
        storage.saveToLS();// 将 model 数据储存至 LocalStorage
    },// 储存点赞数据
    LSLoadToMod: function(){
        var i;
        for (i in model) {
        model[i] = storage.getFromLS(i.slice(3));
        }
    },// 将 LocalStorage 最新的数据载入 model
    ModLoadToLS: function(){
        localStorage.setItem("cat",JSON.stringify(model));
    },
    adminSaveChange: function(){
        var changingID = view.getStagePicID();// 获得当前所修改的 ID
        var adminData = view.getAdminData();// 载入 admin 表单数据
        for(var i in adminData){
            if (adminData[i]!=""){
                model["cat"+changingID][i] = adminData[i];
            }
        }//遍历填写的内容,除去未填写的部分,拣取填写的数据
        storage.saveToLS();
    },// admin 将更改保存至数据库
    renderList: function(){
        var i,singleLi;
        // var b =[];
        var id = 0;
        for(i in model){
            singleLi = document.createElement("li");
            id += 1;
            singleLi.id = id;
            singleLi.innerHTML = controller.getName(id);
            view.list.appendChild(singleLi);
        };
    },//重新渲染 list
}

import {controller} from "./controller.js"
export {storage};
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
            controller.ModLoadToLS();// 若第一次运行本程序则将 model 数据初始化载入 LocalStorage
        } 
        else if (localStorage["cat"]) {
            controller.LSLoadToMod();// 若非第一次运行则直接从 LocalStorage 获取数据
        }
    },// 初始化同步 model 与 LocalStorage 数据
    saveToLS: function(){
        controller.ModLoadToLS();
    },// 编译最新的 model 为 JSON 格式储存至 LocalStorage
    getFromLS: function(catId){
        return JSON.parse(localStorage["cat"])["cat"+catId];
    },// 获取 LocalStorage 数据并解析为 JS 对象格式数据
}


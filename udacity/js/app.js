var log =console.log.bind(console);//方便调试


/**
 * 
 */

(function(){
var view = {
    init: function(){
        this.header = $(".header"),
        this.header_logo = document.querySelector(".header .logo img");
    },
    isHeaderFixed : false,//优化性能
    fixHeader: function(){
        if(window.scrollY >= 50 && !view.isHeaderFixed){
            view.isHeaderFixed = true;
            view.header.addClass("header-sticky");
            view.header_logo.src = "img/udacity-wordmark-cn.svg"
        } else if (window.scrollY < 50 && view.isHeaderFixed){
            view.isHeaderFixed = false;
            view.header.removeClass("header-sticky");
            view.header_logo.src = "img/udacity-wordmark-light-cn.svg"
        }
    },
}

view.init();
window.addEventListener("scroll", view.fixHeader);
})();
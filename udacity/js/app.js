var log =console.log.bind(console);//方便调试

// (function(){

var view = {
    init: function(){
        this.header = $(".header"),
        this.header_logo = document.querySelector(".header .logo img");
    },
    cacheScroll : 0,
    isScrollDownOrUp: function(){
        var y = window.scrollY;
        if (y > view.cacheScroll){
            view.cacheScroll = y;
            return true;// 向下滚动
        } else if (y < view.cacheScroll) {
            view.cacheScroll = y;
            return false;// 向上滚动
        }
    },
    isHeaderFixed : false,//优化性能
    fixHeader: function(){ 
        if (!view.isHeaderFixed && window.scrollY >= 60){
            view.isHeaderFixed = true;
            view.header.addClass("header-sticky-conceal");
            view.header_logo.src = "img/udacity-wordmark-cn.svg"
        } else if (view.isHeaderFixed && window.scrollY < 60 ){
            view.isHeaderFixed = false;
            view.header.removeClass("header-sticky-show");
            view.header.removeClass("header-sticky-conceal");
            view.header_logo.src = "img/udacity-wordmark-light-cn.svg"
        } else if (view.isHeaderFixed && view.isScrollDownOrUp() ){
            view.header.removeClass("header-sticky-show");
        } 
        else if (view.isHeaderFixed && !view.isScrollDownOrUp() && window.scrollY >= 100){
            view.header.addClass("header-sticky-show");
        } 
    },
}
view.init();
window.addEventListener("scroll", function(){view.fixHeader();});
// })();
var log =console.log.bind(console);//方便调试

// (function(){

var view = {
    isScrollDownOrUp: false,
    isHeaderFixed: false,
    isHeaderShown: false,
    cacheScroll: 0,
    init: function(){
        this.header = $(".header"),
        this.header_logo = document.querySelector(".header .logo img");
    },
    instructDownOrUp: function(){
        var y = window.scrollY;
        if (y > view.cacheScroll && !view.isScrollDownOrUp){      
            view.isScrollDownOrUp = true;// 向下滚动
            log(view.isScrollDownOrUp)
        } else if (y < view.cacheScroll && view.isScrollDownOrUp){        
            view.isScrollDownOrUp = false;// 向上滚动
            log(view.isScrollDownOrUp)
        }
        view.cacheScroll = y;
    },
    fixHeader: function(){ 
        if (!view.isHeaderFixed && window.scrollY >= 60){
            log(" header 已固定");
            view.isHeaderFixed = true;
            view.header.addClass("header-sticky-conceal");
            view.header_logo.src = "img/udacity-wordmark-cn.svg"
        } else if (view.isHeaderFixed && window.scrollY < 20 ){
            log(" header 取消固定");
            view.isHeaderFixed = false;
            view.isHeaderShown = false;
            view.header.removeClass("header-sticky-show");
            view.header.removeClass("header-sticky-conceal");
            view.header_logo.src = "img/udacity-wordmark-light-cn.svg"
        } else if (view.isHeaderFixed && view.isScrollDownOrUp && view.isHeaderShown){
            log(" header 收");
            view.isHeaderShown = false;
            view.header.removeClass("header-sticky-show");
        } else if (view.isHeaderFixed && !view.isScrollDownOrUp && !view.isHeaderShown && window.scrollY >= 100){
            log(" header 出");
            view.isHeaderShown = true;
            view.header.addClass("header-sticky-show");
        } 
    },
}
view.init();
window.addEventListener("scroll", function(){view.instructDownOrUp();view.fixHeader();});
// })();
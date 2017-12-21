var log = console.log.bind(console);


/**
 * @namespace click
 */
function _click (list) {
    var show = document.getElementById("show");
    var title = document.querySelector('h4');
    var img = document.querySelector('img');
    var descText = document.querySelector('p');
    img.addEventListener("click", function(){
        list[img.id].likeCount +=1;
        descText.innerHTML = "这只猫被赞了"+list[img.id].likeCount+"次";
    })
    return function (list, i) {
        img.setAttribute("id",i);
        title.innerHTML = list[i].innerHTML;
        img.src = list[i].getAttribute("data-src");
        descText.innerHTML = "这只猫被赞了"+list[i].likeCount+"次";
    }
}

function __main(){
var list =document.querySelectorAll("h2")//载入所有图片资源
var click = _click(list);//注册click功能函数
for (var i=0; i<list.length; i++){
    (function (i){
        list[i].likeCount = 0;
        list[i].addEventListener("click", function(){click(list, i)} );
    })(i);
}
}

__main();


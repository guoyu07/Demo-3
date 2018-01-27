// $(".gongxu-slider").hover(
//     function(){  
//         $(".gongqiu-p").fadeToggle(1000)
//     },
//     function(){
//         $(".gongqiu-p").fadeToggle(1000);
//     }
// );

// $(".gongxu-slider").mouseleave(function () {
//     setTimeout(function(){
//     $(".gongqiu-p").attr("style","display:block;");},100)
// });

// $(".gongxu-slider").hover(
//     function(){  
//         $(".gongqiu-p").fadeToggle(1000)
//     },
//     function(){
//         $(".gongqiu-p").fadeToggle(1000);
//     }
// );

var timer1, timer2, timer3;


$(".gongxu-slider").hover(function () {
    clearTimeout(timer3);
        timer1=setTimeout(function(){
            $(".gongqiu-p").attr("style","display:none;");
        },300);
        timer2=setTimeout(function(){
            $(".left-arrow").attr("style","display:block;");
            $(".right-arrow").attr("style","display:block;");
        },300)
    },
    function () {
        clearTimeout(timer1);
        clearTimeout(timer2);
        timer3=setTimeout(function() {       
            $(".gongqiu-p").attr("style","display:block;opacity:0;");
            $(".left-arrow").attr("style","display:none;");
            $(".right-arrow").attr("style","display:none;");
        },300)
    }  
);


$(".right-arrow").click(function(){
    $(".gongxu-slider-slider").attr("style","transform:translateX(-845px);")
})

$(".left-arrow").click(function(){
    $(".gongxu-slider-slider").attr("style","transform:translateX(0px);")
})

var XPCardNum = $(".xinpin-slider").children().length;
var XPCardWidth = $(".xinpin").width()/4;
var sInt = parseInt(XPCardNum/4);
var sRemain = XPCardNum%4 / 4;
var sFlag = sInt + sRemain;
var sLength = 0;

$(".xinpin-right-arrow").click(function(){
    switch(true){
        case sFlag <= 1:
            $(".xinpin-slider").css("transform",function(){return "translateX(0px)"});
            sFlag = sInt + sRemain;
            sLength = 0;
            break;
        case sFlag > 1 && sFlag < 2:
            sLength += sRemain*4*XPCardWidth;
            $(".xinpin-slider").css("transform",function(){return "translateX("+ (-sLength) + "px)"});
            sFlag -= sRemain;
            break;
        case sFlag >= 2:
            sLength = sLength + $(".xinpin").width();
            $(".xinpin-slider").css("transform",function(){return "translateX("+ (-sLength) + "px)"});
            sFlag -= 1;
            break;
    }
})

$(".xinpin-left-arrow").click(function(){
    var sFlag_rev = sInt + sRemain - sFlag;
    switch(true){
        case sFlag < 1:
            $(".xinpin-slider").css("transform",function(){return "translateX(0px)"});
            break;
        case sFlag_rev == 0:
            sLength = (sFlag-1) * $(".xinpin").width();
            $(".xinpin-slider").css("transform",function(){return "translateX("+ (-sLength) + "px)"});
            sFlag = 1;
            break;
        case sFlag_rev % 1 == 0:
            sLength -= $(".xinpin").width();
            $(".xinpin-slider").css("transform",function(){return "translateX("+ (-sLength) + "px)"});
            sFlag += 1 ;
            break;
        case sFlag_rev % 1 != 0:
            sLength -= sRemain*4*XPCardWidth;
            $(".xinpin-slider").css("transform",function(){return "translateX("+ (-sLength) + "px)"});
            sFlag += sRemain;
            break;
    }
    
})
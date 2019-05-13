//Author By ForestBear

$(function (){
    
//    loading
    var onoff = false;
    var pics = ['images/bg.jpg','images/bg2.png','images/boot.png','images/CSS3-pic.png','images/CSS3-title.png','images/dajia.png','images/dajia2.png','images/H5-pic.png','images/H5-title.png','images/hua_bg.png','images/JS-pic.png','images/JS-title.png','images/left.png','images/liao.png','images/loading.gif','images/long.png','images/mayplay.jpg','images/mayplay.png','images/me.png','images/mei.png','images/minxi.png','images/minyan.png','images/modian1.png','images/modian2.png','images/modian3.png','images/modian4.png','images/modian5.png','images/music.jpg','images/music.png','images/people.png','images/qiang.png','images/right.png','images/shang.png','images/WX.png','images/WX-pic.png','images/WX-title.png','images/yuduo1.png','images/yuduo2.png','images/yuduo3.png','images/yuduo4.png','images/zhiji-text1.png','images/zhiji-text2.png','images/zhuzi.png'];
    var index = 0;
    
    for(var i=0; i<pics.length;i++){
        var img = new Image();
        img.onload = function (){
            index++;
            if(index < pics.length){
                var nnu = parseFloat(index / pics.length).toFixed(2);
                console.log(nnu);
                $('.numPer').html(Math.round(nnu*100));
            }else{
                $('.numPer').html(100);
                $('.heard').show();
                $('#cont').show();
                setTimeout(function (){
                    $('#loading').velocity("transition.bounceLeftOut", {stagger: 300, drag: true});
                    $('#page1 .yunduo1').animate({left:'11%'},3000,'swing',function (){
                        $('#page1 .yunduo1').css('transition','all 0.3s linear');
                        $('#page1 .yunduo2').css('transition','all 0.5s linear');
                        $('#page1 .yunduo3').css('transition','all 1.3s linear');
                        $('#page1 .yunduo4').css('transition','all 0.7s linear');
                        pMove()
                        
                    })
                    $('#page1 .yunduo2').animate({left:'15%'},3000,'swing')
                    $('#page1 .yunduo3').animate({left:'70%'},3000,'swing')
                    $('#page1 .yunduo4').animate({left:'69%'},3000,'swing')
                    _flash()
                    setTimeout(function (){
                        $('#V2').get(0).play();
                        onoff = true;
                        $('.me').addClass('animated bounceInUp').show();
                    },2000);
                },800);
            };
        };
        img.src = pics[i];
    }
    
//    people
    
    function _flash() {
        $('#page1 .people').css({'background-position': 'left top'});
        setTimeout(function () {
            $('#page1 .people').css({
                'background-position': 'right top'
            });
        }, 600);
        setTimeout(function () {
            _flash();
        }, 1200);
    }
    
//    music
    
    $('.music').click(function(){
        if($('#V2').get(0).paused){
            $('#V2').get(0).play();
            $('.music').css('animation-play-state','running');
        }else{
            $('#V2').get(0).pause();
            $('.music').css('animation-play-state','paused');
        }
    })
    
//    nav and scrollTop
    
    __scrollTop()
    
    function __scrollTop(){
        var index = 0;
        
        $('.hNav ul li').click(function (){
            index = $(this).index();
            currLi(index)
            __top(index)
            navTop(index)
            scrollPage2(index)
            scrollPage3(index)
            scrollPage4(index)
        })

        $(document).mousewheel(function (e,d){
            
            if(onoff){
                onoff = false;
                if(d<0){
                    index ++;
                    if(index > $('.hNav ul li').length-1){
                        index = $('.hNav ul li').length-1;
                    }
                    __top(index)
                    scrollPage2(index)
                    scrollPage3(index)
                    scrollPage4(index)
                }else{
                    index --;
                    if(index < 0){
                        index = 0;
                    }
                    __top(index)
                    scrollPage2(index)
                    scrollPage3(index)
                    scrollPage4(index)
                }
                currLi(index);
                navTop(index)
            }
            
        })
        
        function __top(index){
            var winHeight = $(window).height();
            $('#cont').stop(true).animate({
                top:- winHeight * index
            },600,function (){
                setTimeout(function (){
                    onoff = true;
                },800)
                
            });
        }
        
        function currLi(index){
            $('.hNav ul li').eq(index).addClass('red').siblings().removeClass('red');
        }
        
        $(window).resize(function (){
            var winHeight = $(window).height();
            $('#cont').css('top',- winHeight * index)
            
        })
        
        function navTop(index){
            if(index>0){
                $('.Logo').animate({left:'7%',top:'2%'},800);
                $('.hNav').animate({left:'77%',top:'2%'},800);
                $('.me').removeClass('bounceInUp').addClass('animated bounceOut')
            }else{
                $('.Logo').animate({left:'50%',top:'1%'},800);
                $('.hNav').animate({left:'50%',top:'10%'},800);
                setTimeout(function (){
                    $('.me').removeClass('bounceOut').addClass('animated bounceInUp')
                },700)
            }
        }
    }
    
//    page1
    function pMove(){
        $('#page1').mousemove(function(ev){
            var La = -ev.pageX*0.03;
            var Lb = ev.pageX*0.03;
            var Lc = -ev.pageX*0.1;
            var Ld = ev.pageX*0.1;
            $('#page1 .yunduo1').css({'transform':'translate3d('+La+'px, 0px, 0px)'});
            $('#page1 .yunduo2').css({'transform':'translate3d('+Lb+'px, 0px, 0px)'});
            $('#page1 .yunduo3').css({'transform':'translate3d('+Lc+'px, 0px, 0px)'});
            $('#page1 .yunduo4').css({'transform':'translate3d('+Ld+'px, 0px, 0px)'});
        });
    }
    
//    page2
    pageTab();
    function pageTab(){
        var onoffc= true;
        tab();
        function tab(){
            var index = 0;
            var num = true;
            var $aLi = $('#skill ul li');
            var times = null;

            clearInterval(times);
            times = setInterval(function (){
                index++
                if(index > $aLi.length-1){
                    index = 0;
                }
                nextTab(index);
                onoffc= true;
                num = true ;
            },8000)



                $('#skill .sk-pic,#page2 .last,#page2 .next').mouseover(function (){
                    if(onoffc && num){
                        num =false ;
                        clearInterval(times);
                    }else{
                        return;
                    }
                });

                $('#skill .sk-pic,#page2 .last,#page2 .next').mouseout(function (){
                    if(onoffc){
                        onoffc=false;
                        tab()
                    }else{
                        return;
                    }
                });


            $('.sk-btn .last').click(function (){

                if(index < 0){
                    index = $aLi.length-1;
                }

                $aLi.eq(index).find('.sk-title').removeClass('pulse').addClass('animated bounceOut')
                $aLi.eq(index).find('.sk-pic').removeClass('pulse').addClass('animated bounceOut')
                index --
                setTimeout(function (){
                    $aLi.eq(index).show().siblings().hide();
                    $aLi.eq(index).find('.sk-title').removeClass('bounceOut').addClass('animated pulse')
                    $aLi.eq(index).find('.sk-pic').removeClass('bounceOut').addClass('animated pulse')
                    $aLi.eq(index).find('.sk-cont1').addClass('animated fadeIn')
                },1000)
            })

            $('.sk-btn .next').click(function (){
                index++
                if(index > $aLi.length-1){
                    index = 0;
                }
                nextTab(index);
            });

            function nextTab(index){

                $aLi.eq(index-1).find('.sk-title').removeClass('pulse').addClass('animated bounceOut')
                $aLi.eq(index-1).find('.sk-pic').removeClass('pulse').addClass('animated bounceOut')

                setTimeout(function (){
                    $aLi.eq(index).show().siblings().hide();
                    $aLi.eq(index).find('.sk-title').removeClass('bounceOut').addClass('animated pulse')
                    $aLi.eq(index).find('.sk-pic').removeClass('bounceOut').addClass('animated pulse')
                    $aLi.eq(index).find('.sk-cont1').addClass('animated fadeIn')
                },1000)
            }
        }
    }
    
    function scrollPage2(index){
        if(index == 1){
            $('#page2 .minxi').addClass('minxi2');
            $('#page2 .long').addClass('long2');
            setTimeout(function (){
                $('#page2 .mingyan').show().removeClass('flipOutX').addClass('animated flipInX');
            },1000)
        }else{
            $('#page2 .mingyan').removeClass('flipInX').addClass('flipOutX');
        }
    };
    
    //    page3
    
    function scrollPage3(index){
        $('.works ul li').each(function (i,em){
//            $(em).css('left',i*22+11+'%');
//            $(em).css({'left':i*22+11+'%','display':'none'});
            $(em).css('left',i*22+11+'%');
            if(index == 2){
                $(em).css('display','none');
                setTimeout(function (){
                    $(em).show().removeClass('fadeOutUp').addClass('animated fadeInUp');
                },i*600+100)
                $('#page3 .liao').addClass('liao2')
            }else{
                $(em).removeClass('fadeInUp').addClass('fadeOutUp');
            }
        })
    }
    
    layuiClick();
    
    function layuiClick(){
//        $('.dajia').click(function (){
//            layer.open({
//                type: 1,
//                title: false,
//                closeBtn: 0,
//                area: ['3.333333rem','5.558333rem'],
//                skin: 'layui-layer-nobg', //没有背景色
//                shadeClose: true,
//                anim:1,
//                content: '\<\img style="width:3.333333rem; height:5.558333rem;" src="images/dajia2.png" alt="">'
//            });
//
//        })

        $('.mayplay').click(function (){
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: ['7.625rem','5.675rem'],
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                anim:1,
                content: '\<\img style="width:7.466667rem; height:5.558333rem;" src="images/mayplay.png" alt="">'
            });
        })
        
//        $('.WX').click(function (){
//            layer.open({
//                type: 1,
//                title: false,
//                closeBtn: 0,
//                area: ['3.141667rem','4.6rem'],
//                skin: 'layui-layer-nobg', //没有背景色
//                shadeClose: true,
//                anim:1,
//                content: '\<\img style="3.141667rem; height:4.6rem;" src="images/WX.png" alt="">'
//            });
//        })
    }

     //    page4
    function scrollPage4(index){
        if(index == 3){
            setTimeout(function() {
                $(".zhiji")
                    .velocity("transition.shrinkIn", { 
                        stagger: 300,
                        backwards: true
                    })
                    
            }, 1000);
        }else{
            $(".zhiji")
            .velocity("transition.shrinkOut", { 
                stagger: 300,
                backwards: true
            })
            .velocity({ opacity: 0 }, {
                duration: 750,
                display: "none"
            })
        }
    }
})



//modian()
    
    function modian(){
        var times= null;
        var modC = num();
        var onoff = true;
        $(modC).addClass('modi');
        addEnd(modC,removeC)
//        console.log(modC);
        function removeC(){
            $('.modian div').removeClass('modi');
            if(onoff){
                clearTimeout(times);
                times = setTimeout(function (){
                    onoff = false;
                    modian()
                },3000)
            }
            
        }
        
        function num(){
            var arrtClass=['.modian1','.modian2','.modian3','.modian4','.modian5'];
            var N = Math.round(Math.random()*(arrtClass.length-1));
            var _modian1 = document.querySelector(arrtClass[N]);
            
            return _modian1;
        }

        function addEnd(obj,fn){   
            obj.addEventListener("webkitAnimationEnd",fn,false);
            obj.addEventListener("animationend",fn,false);
        }
    }
    
    


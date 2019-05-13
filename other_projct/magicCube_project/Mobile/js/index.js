$(function () {
    var $wrap = $('#wrap');
    var $phone = $('#phone');
    var $phoneBtn = $('.phoneBtn');
    var $phoneCall = $phoneBtn.find('.phoneCall');
    var $phoneKey = $('.phoneKey');
    var $HangeUp = $phoneKey.find('.HangeUp');
    var $phoneHead = $('.phoneHead');
    var $callTime = $phoneHead.find('.callTime');
    var $message = $('#message');
    var $messageList = $('#messageList');
    var $messageText = $('.messageText');
    var $cube = $('#cube');
    var $cubeBox = $cube.find('.cubeBox');
    var $cubeShare = $cube.find('.cubeShare');
    var $details = $('#details');
    var $detailsList = $('#detailsList');
    var $returnBtn = $('.returnBtn');
    var desH = 1008;
    var desW = 640;
    var viewWidth = $(window).width();
    var viewhHeight = $(window).height();
    var oVH = $(window).height();
    var oVW = $(window).width();
    var $say = $('#say').get(0);
    var $bell = $('#bell').get(0);
    var $music = $('#music').get(0);
    //初始化
    function init() {
        var $wrap = $('#wrap');
        var $message = $('#message');
        var $messageList = $('#messageList');
        var changeWidth = (viewWidth / viewhHeight) * desH;
        $wrap.css('transform', 'scale(' + oVH / desH + ')');
        if (changeWidth > desW) {
            changeWidth = desW;
        }
        $messageList.css('padding', '0 ' + (desW - changeWidth) / 2 + 'px');
        $messageText.css('transform', 'scale(' + changeWidth / desW + ')');
        $cubeShare.css('marginRight', '' + (desW - changeWidth) / 2 + 'px');
        $returnBtn.css('marginRight', '' + (desW - changeWidth) / 2 + 'px');
    }
    //手机部分
    var phone = (function () {
            function init() {
                $bell.play();
                bind();
            }

            function bind() {
                $phoneCall.on('touchstart', function () {
                    $bell.pause();
                    $phoneBtn.css('opacity', 0).css('display', 'none');
                    $phoneKey.css('transform', 'translateY(' + 0 + ')');
                    $callTime.css('display', 'block');
                    say();
                })
            }

            function say() {
                $callTime.html('00:00');
                $say.play();
                var timer = setInterval(function () {
                    $callTime.html(getTime($say.currentTime));
                    console.log($say.currentTime);
                    if ($say.currentTime == $say.duration) {
                        clearInterval(timer);
                        closePhone();
                    }
                }, 1000);
                $HangeUp.on('touchstart', function () {
                    clearInterval(timer);
                    closePhone();
                })
            }

            function getTime(timeNum) {
                timeNum = parseInt(timeNum);
                var iM = toTwo(Math.floor(timeNum % 3600 / 60));
                var iS = toTwo(Math.floor(timeNum % 60));
                return iM + ':' + iS;
            }

            function toTwo(num) {
                if (num < 10) {
                    return '0' + num;
                }
                else {
                    return '' + num;
                }
            }

            function closePhone() {
                $say.pause();
                $phone.css({
                    'transform': 'translateY(' + (desH) + 'px)'
                })
                $phone.on('transitonend webkitTransitionEnd', function () {
                    $(this).remove();
                })
                message.init();
            };
            return {
                init: init
            }
        })()
        //消息
    var message = (function () {
        var $Li = $messageList.find('li');
        var iNow = 0;
        var iT = 0;

        function init() {
            $music.play();
            listMove()
        }

        function listMove() {
            var timer = setInterval(function () {
                $Li.eq(iNow).css('opacity', 1).css('transform', 'translateY(0)');
                if (iNow >= 3) {
                    iT -= $Li.eq(iNow).outerHeight() + 10;
                    $messageList.css('transform', 'translateY(' + (iT) + 'px)')
                };
                if (iNow >= $Li.length - 1) {
                    clearInterval(timer);
                    setTimeout(function () {
                        closeMessgae();
                    }, 2000);
                }
                else {
                    iNow++;
                };
                //console.log(iNow);
            }, 1000);

            function closeMessgae() {
                $message.css('transform', 'translateY(' + (desH) + 'px)');
                $message.on('transitonend webkitTransitionEnd', function () {
                    $(this).remove();
                    cube.init();
                })
            };
        }
        return {
            init: init
        }
    })();
    //魔方
    var cube = (function () {
        var $Li = $cubeBox.find('li');
        var downX = 0;
        var downY = 0;
        var startRX = -45;
        var startRY = -45;
        var disX = 0;
        var disY = 0;
        var offBtn = true;

        function init() {
            $cubeBox.css('transform', 'scale(0.7) rotateX(-45deg) rotateY(-45deg)');
                        $cubeBox.css('transition', '1s');
                        $cubeBox.on('transitionend webkitTransitonEnd', function () {
                            $cubeBox.css('transition', '');
                        });
            bind();
        }

        function bind() {
            $(document).on('touchstart', function (ev) {
                
                ev.preventDefault();
                ev.stopPropagation();
                
                offBtn = true;
                var touch = ev.originalEvent.changedTouches[0];
                downX = touch.pageX;
                downY = touch.pageY;
                var speed = 1 / 3;
                $(document).on('touchmove.move', function (ev) {
                    offBtn = false;
                    var touch = ev.originalEvent.changedTouches[0];
                    disX = (downY - touch.pageY) * speed;
                    disY = (touch.pageX - downX) * speed;
                    if (startRX + disX > 70) {
                        disX = -startRX + 70;
                    }
                    else if (startRX + disX < -70) {
                        disX = -startRX - 70;
                    }
                    $cubeBox.css('transform', 'scale(0.7) rotateX(' + (startRX + disX) + 'deg) rotateY(' + (startRY + disY) + 'deg)');
                })
                $(document).on('touchend.move', function () {
                    $(document).off('.move');
                })
            })
            $Li.on('touchend', function () {
                if (offBtn) {
                    //点击
                    //alert($(this).index());
                    detials.show($(this).index());
                }
                else {
                    startRX += disX;
                    startRY += disY;
                }
            })
            $cubeShare.on('touchend', function () {
                $('.Mask').show();
            })
            $('.Mask').on('touchend', function () {
                $(this).hide();
            })
        }
        return {
            init: init
        }
    })();
    
    
    
    var detials = (function () {
        var $Li = $detailsList.find('li');
        var $LiBtn = $('#detailsDots').find('li');
        var iNow = 0;
        var downX = 0;
        var Nowindex = 0;
        var nextIndex = 0
        
        
        function init() {
            bind();
        }

        function show(index) {
            $cube.hide();
            $details.show();
            $Li.eq(index).attr('class', 'fadeIn');
            $LiBtn.eq(index).attr('class','active');
        }

        function bind() {
            
        $Li.on('touchstart',function(ev){
            var touch = ev.originalEvent.changedTouches[0];
            
            downX = touch.pageX;
            
            Nowindex = $(this).index();
            
           $Li.on('touchend',function(ev){
               
               var touch = ev.originalEvent.changedTouches[0];
               
               if( touch.pageX > downX )//-->
               {
                   if( Nowindex == 0 )
                   {
                       nextIndex = $Li.length-1;
                   }else
                   {
                       nextIndex = Nowindex - 1;
                   }
                   
                   
                   $Li.attr('class','');
                   $LiBtn.attr('class','');
                   $(this).hide();
                   $Li.eq(nextIndex).attr('class','fadeIn').css('display','block');
                   $Li.css('display','');
                   $LiBtn.eq(nextIndex).attr('class','active');
                   
                   
                   
               }
               else if( touch.pageX < downX )//<--
               {
                   if( Nowindex == $Li.length-1 )
                   {
                       nextIndex = 0;
                   }else
                   {
                       nextIndex = Nowindex + 1;
                   }
                   
                   
                   $Li.attr('class','');
                   $LiBtn.attr('class','');
                   $(this).hide();
                   $Li.eq(nextIndex).attr('class','fadeIn').css('display','block');
                   $Li.css('display',''); 
                   $LiBtn.eq(nextIndex).attr('class','active');
                   
                   
               }
               
               $(this).off('touchend');
               
           })
            
            
        })
            
            
            
            
            $returnBtn.on('touchend', function () {
                $cube.show();
                $details.hide();
                $Li.attr('class', '');
                $LiBtn.attr('class','');   
            })
        };
        
        return {
            init: init,
            show: show
        }
    })()
    
    detials.init();
    phone.init();
    init();
});
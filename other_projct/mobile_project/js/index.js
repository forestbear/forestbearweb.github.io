window.onload = function () {
    
    if (!window.BfnLoad) {
                fnLoad();//调用加载页面函数；
        window.BfnLoad = true;
    }
  
    //获取Class，添加Class 封包函数    
    function addClass(obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!obj.className) {
            obj.className = sClass;
            return;
        }
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] === sClass) return;
        }
        obj.className += ' ' + sClass;
    }

    function removeClass(obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!obj.className) return;
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] === sClass) {
                aClass.splice(i, 1);
                obj.className = aClass.join(' ');
                break;
            }
        }
    }

    function bind(obj, ev, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(ev, fn, false);
        }
        else {
            obj.attachEvent('on' + ev, function () {
                fn.call(obj);
            })
        }
    }
    //获取Class，添加Class 封包函数代码结束------>
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    
    document.body.style.height = h + 'px'; //设置body的高度;
    
    
        function fnLoad(){
                
                
              var oWelcom = document.getElementById('welcom');
        		var iTime = new Date().getTime();
        		var oImgload = true
        		var bTime = false;
        		var oTimer = null;
        		
        		bind(oWelcom,'transitionend',end)
        		
        		oTimer = setInterval(function(){
        			if( new Date().getTime() - iTime >=4000)
        			{
        				bTime = true;
        			}
        			
        			if( oImgload&&bTime )
        			{
        				
        				clearInterval(oTimer)
        				oWelcom.style.opacity=0;
                        fnTap();
        		    };
        			
        		},1000)
        		
        		function end(){
        			
        			removeClass(oWelcom,'pageShow')
        			
        		}
                
            
                if(!window.Bfnindex)
                    {
                        fnindex();
                        
                        window.Bfnindex = true;
                    }
            
            };
    
               
    

  //预加载代码结束;
    
   
//    轮播图
    
    
    function fnTap()
    {
        
        var oTap = document.getElementById('tabPic');
        var oPicList = document.getElementById('piclist');
        var aNav = oTap.getElementsByTagName('nav')[0].children;
        
        var iNow = 0;
        var iTouchX= 0;
        var iX=0;
        var iW = w;
        var iTouchX = 0;
        var iStartTouchX = 0;
        var oTimer = null;
        
        bind(oTap,'touchstart',fnStart);
        bind(oTap,'touchmove',fnMove);
        bind(oTap,'touchend',fnEnd);
        autoPlay();
        
        function autoPlay()
        {
                oTimer = setInterval(function(){

                iNow++;
                iNow = iNow%aNav.length;
                tap();

            },2000);
            
        };
       
        function fnStart(ev)
        {
            oPicList.style.transition = "none";
            ev = ev.changedTouches[0];
            clearInterval(oTimer);
            iStartTouchX = ev.pageX;  //储存手指按下的位置;
            iTouchX = iX;             //储存元素所处位置;
            
              
        };
        
       function fnMove(ev)
        {
            
            ev = ev.changedTouches[0];
            var iDis = ev.pageX - iStartTouchX;
            iX = iDis + iTouchX;
            oPicList.style.transform = oPicList.style.WeblKitTransform = "translate("+iX+"px)";
            
            
        };
        
        function fnEnd()
        {
            
            iNow = iX/iW;
            iNow = -Math.round(iNow);
            if(iNow < 0)
            {
                iNow = 0;
            }
            if(iNow > aNav.length-1)
            {
                iNow = aNav.length-1;
            };
            tap();
            autoPlay();
        };
        
        function tap()
        {
            iX = -iNow*iW;
            oPicList.style.transition = ".5s";
            oPicList.style.transform = oPicList.style.WeblKitTransform = "translateX("+iX+"px)";
            
            for(var i=0;i<aNav.length;i++)
            {
                removeClass(aNav[i],'acitve');
            };
            addClass(aNav[iNow],'acitve');
        };
        
    };
    
    
    

    
    
    
    //评分代码
    function score() {
        var oScore = document.getElementById('score');
        var oLi = oScore.getElementsByTagName('li');
        for (var i = 0; i < oLi.length; i++) {
            fn(oLi[i]);
        };

        function fn(oLi) {
            var aA = oLi.getElementsByTagName('a');
            var oIput = oLi.getElementsByTagName('input')[0];
            var arr = ['很失望', '不是那么差', '还行不是很失望', '很好，美', '非常不错'];
            for (var i = 0; i < aA.length; i++) {
                aA[i].index = i;
                bind(aA[i], 'touchstart', function () {
                    for (var i = 0; i < aA.length; i++) {
                        if (i <= this.index) {
                            addClass(aA[i], 'active');
                        }
                        else {
                            removeClass(aA[i], 'active')
                        }
                    }
                    oIput.value = arr[this.index];
                })
            };
        };
    };

    function fnInfo(oInfo, sInfo) {
        oInfo.innerHTML = sInfo;
        oInfo.style.transform = "scale(1)";
        oInfo.style.opacity = 1;
        setTimeout(function () {
            oInfo.style.transform = "scale(0)";
            oInfo.style.opacity = 0;
        }, 1000);
    };

    function fnindex() {
        var oIndex = document.getElementById('index');
        var oBtn = oIndex.getElementsByClassName('btn')[0];
        var oInfo = oIndex.getElementsByClassName('info')[0];
        var oNewsBtn = oIndex.getElementsByClassName('newsBtn')[0];
        var bScore = false;
        if (!window.Bscore) {
            score();
            window.Bscore = true;
        }
        bind(oNewsBtn, 'touchend', function () {
            fnNewsBtnJump();
            if (!window.BfnNews) {
            fnNews();
        }
        });
        bind(oBtn, 'touchend', function () {
            bScore = fnScoreChecked();
            if (bScore) {
                if (fnIdexTag()) {
                    fnIndexOut();
                }
                else {
                    fnInfo(oInfo, "请给景区添加标签");
                }
            }
            else {
                fnInfo(oInfo, "请给景区评分");
            }
        });

        function fnScoreChecked() {
            var oScore = document.getElementById('score');
            var aInput = oScore.getElementsByTagName('input');
            for (var i = 0; i < aInput.length; i++) {
                if (aInput[i].value == 0) {
                    return false;
                }
            };
            return true;
        };

        function fnIdexTag() {
            var oTag = document.getElementsByClassName('indextag')[0];
            var oInpt = oTag.getElementsByTagName('input');
            for (var i = 0; i < oInpt.length; i++) {
                if (oInpt[i].checked) {
                    return true;
                }
            };
            return false;
        };
    };

    function fnNewsBtnJump() {
        var oNews = document.getElementById('news');
        oNews.style.transition = '1s';
        oNews.style.opacity = 1;
        addClass(oNews, 'pageShow');
    }

    function fnIndexOut() {
        var oMask = document.getElementById('mask');
        var oIndex = document.getElementById('index');
        var oNews = document.getElementById('news');
        addClass(oMask, 'pageShow');
        setTimeout(function () {
            oMask.style.opacity = 1;
            oIndex.style.filter = 'blur(5px)';
        }, 14);
        setTimeout(function () {
            removeClass(oMask, 'pageShow');
            oMask.style.opacity = 0;
            oIndex.style.filter = 'blur(0px)';
            oNews.style.transition = '1s';
            oNews.style.opacity = 1;
        }, 3000);
        addClass(oNews, 'pageShow');
        if (!window.BfnNews) {
            fnNews();
        }
    }

    function fnNews() {
        var oNews = document.getElementById('news');
        var aInpt = oNews.getElementsByTagName('input');
        var oInfo = oNews.getElementsByClassName('info')[0];
        aInpt[0].onchange = function () {
            if (this.files[0].type.split('/')[0] == 'video') {
                fnNewsOut();
                this.value = '';
            }
            else {
                fnInfo(oInfo, '请上传视频');
            }
        };
        aInpt[1].onchange = function () {
            if (this.files[0].type.split('/')[0] == 'image') {
                fnNewsOut();
                this.value = '';
            }
            else {
                fnInfo(oInfo, '请上传图片');
            }
        };
    };

    function fnNewsOut() {
        var oNews = document.getElementById('news');
        var oForm = document.getElementById('form');
        addClass(oForm, 'pageShow');
        oNews.style.cssText = "";
        removeClass(oNews, 'pageShow');
        if (!window.BfnFormIn) {
            fnFormIn();
            window.BfnFormIn = true;
        }
    };

    function fnFormIn() {
        var oForm = document.getElementById('form');
        var oFormBtn = oForm.getElementsByClassName('btn')[0];
        var oLable = oForm.getElementsByTagName('label');
        var oPageEnd = document.getElementById('pageover');
        var btnoff = false;
        for (var i = 0; i < oLable.length; i++) {
            bind(oLable[i], 'touchend', function () {
                btnoff = true;
                addClass(oFormBtn, 'submit');
            });
            bind(oFormBtn, 'touchend', function () {
                if (btnoff) {
                    for (var i = 0; i < oLable.length; i++) {
                        oLable[i].getElementsByTagName('input')[0].checked = false;
                    }
                    btnoff = false;
                    removeClass(oForm, 'pageShow');
                    addClass(oPageEnd, 'pageShow');
                    removeClass(oFormBtn, "submit");
                    if (!window.fnPageEnd) {
                        fnPageEnd();
                        window.fnPageEnd = true;
                    }
                };
            });
        };
    };

    function fnPageEnd() {
        var oPageEnd = document.getElementById('pageover');
        var oEndBtn = oPageEnd.getElementsByClassName('btn')[0];
        bind(oEndBtn, 'touchend', function () {
            removeClass(oPageEnd, 'pageShow');
        });
    }
};
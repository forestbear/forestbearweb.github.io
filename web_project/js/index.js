window.onload = function () {
    var oWrap = document.getElementById('wrap');
    var oMask = document.getElementById('mask');
    var oLink = document.getElementById('link');
    var oLoading = document.getElementById('loading');
    var percent = document.getElementById('percent');
    var progress = document.getElementById('progress');
    var link_list = document.getElementById('link-list');
    var AlinkLi = link_list.getElementsByTagName('li');
    var olink_qc = document.getElementById('link-qc');
    var aLi_qc = olink_qc.getElementsByTagName('li');
    var proList = document.getElementById('proList');
    var proLi = proList.getElementsByTagName('li');
    var nav_content = document.getElementById('nav-content');
    var oTime = oMask.getElementsByTagName('p')[0];
    var oNav = document.getElementById('nav');
    var oProList = document.getElementById('proList');
    var aLi = oProList.getElementsByTagName('li');
    var oText = document.getElementsByClassName('text')[0];
    var oMenuBtn = oMask.getElementsByClassName('menuBtn')[0];
    var oBtn_m = oMask.getElementsByClassName('btn-menu')[0];
    var oBtn_c = oMask.getElementsByClassName('btn-close')[0];
    var oLayer = wrap.getElementsByClassName('layer')[0];
    var oBird = oMask.getElementsByClassName('bird')[0];
    
    var btnOff = true;
    var picArrUrl = [
        'web_project/images/100du.png', 'web_project/images/bird.png','web_project/images/magicCube.png','web_project/images/51.png', 'web_project/images/bootstrap.png', 'web_project/images/Chrome.png', 'web_project/images/close.png', 'web_project/images/edge.png', 'web_project/images/Firefox.png', 'web_project/images/github.png', 'web_project/images/github-bg.png', 'web_project/images/IE.png', 'web_project/images/logo.jpg', 'web_project/images/lvyou.png', 'web_project/images/magic_cube.png' , 'web_project/images/menu.png' , 'web_project/images/minsheng.png' , 'web_project/images/Opera.png' , 'web_project/images/QQ.jpg', 'web_project/images/qq.png', 'web_project/images/qq-bg.png', 'web_project/images/Safari.png', 'web_project/images/sos.png', 'web_project/images/UC.png', 'web_project/images/wallhaven-153272.jpg', 'web_project/images/WeChat.jpg' , 'web_project/images/wechat.png','web_project/images/wechat_bg.png',
        'other_projct/resume_project/images/bg.jpg',
        'other_projct/resume_project/images/bg2.png',
        'other_projct/resume_project/images/boot.png',
        'other_projct/resume_project/images/CSS3-pic.png',
        'other_projct/resume_project/images/CSS3-title.png',
        'other_projct/resume_project/images/dajia.png',
        'other_projct/resume_project/images/dajia2.png',
        'other_projct/resume_project/images/H5-pic.png',
        'other_projct/resume_project/images/H5-title.png',
        'other_projct/resume_project/images/hua_bg.png',
        'other_projct/resume_project/images/JS-pic.png',
        'other_projct/resume_project/images/me.png',
        'other_projct/resume_project/images/loading.gif',
        'other_projct/resume_project/images/people.png',
        'other_projct/resume_project/images/minyan.png',
        'other_projct/resume_project/images/modian1.png',
        'other_projct/resume_project/images/modian2.png',
        'other_projct/resume_project/images/qiang.png',
        'other_projct/resume_project/images/right.png',
        'other_projct/resume_project/images/left.png',
        'other_projct/resume_project/images/minxi.png',
        'other_projct/resume_project/images/zhuzi.png',
        'other_projct/resume_project/images/yuduo1.png',
        'other_projct/resume_project/images/yuduo2.png',
        'other_projct/resume_project/images/yuduo3.png',
        'other_projct/resume_project/images/yuduo4.png',
        'other_projct/resume_project/images/mayplay.jpg',
        'other_projct/resume_project/images/mayplay.png',
        'other_projct/resume_project/images/mei.png',
        'other_projct/resume_project/images/music.png',
        'other_projct/resume_project/images/music.jpg',
        'other_projct/resume_project/images/WX-title.png',
        'other_projct/resume_project/images/zhiji-text2.png',
        'other_projct/resume_project/images/zhiji-text1.png',
        'other_projct/resume_project/images/JS-title.png',
        'other_projct/resume_project/images/shang.png'
        
        
        
    ];
    
    var colorArr = [
        '#f79bab',
        '#00c4ff',
        '#b100ff',
        '#ffa700',
        '#4eff00'
    ]
  
    var colorNum = parseInt( (Math.random()*10)/2.1 );
    
    var pIndex = 0;
    
//    loading();

//    function loading() {
        for (var i = 0; i < picArrUrl.length; i++) {
            var img = new Image();
            img.onload = function () {
                
                pIndex++;
                
             
                if (pIndex < picArrUrl.length) {
                    
                    var num = parseFloat(pIndex / picArrUrl.length).toFixed(2);
                    
                    progress.style.width = Math.floor(num * 100) + '%';
                    progress.style.background = colorArr[colorNum];
                }
                else {
                    
                    progress.style.width = 100 +'%';
                    oLoading.style.opacity = 0;
                    oLoading.style.display = 'none';
                    toMove();
                    menuBtn();
                    getTime();
                }
            }
            
            img.src = picArrUrl[i];
        }
//    };

    function toMove() {
        document.onmousemove = function (ev) {
            var ev = ev || window.event;
            var disX = -ev.clientX / 50;
            var disY = -ev.clientY / 50;
            var bdisX = ev.clientX / 50;
            var bdisY = ev.clientY / 50;
            oBird.style.transform = 'translate3d( ' + bdisX + 'px, ' + bdisY + 'px, 0)';
            oLayer.style.transform = 'translate3d( ' + disX + 'px, ' + disY + 'px, 0)';
        }
    }
    

    function menuBtn() {
        oMenuBtn.onclick = function () {
            if (!btnOff) {
                oBtn_m.style.display = 'block';
                oBtn_c.style.display = 'none';
                oNav.style.height = 0;
                oText.style.color = 'white';
                nav_content.style.transform = 'scale(0)';
                oLink.style.display = 'none';
            }
            else {
                oBtn_m.style.display = 'none';
                oBtn_c.style.display = 'block';
                oNav.style.height = 100 + '%';
                oText.style.color = 'black';
                nav_content.style.transform = 'scale(1)';
                oLink.style.display = 'block';
                showQc();
                sort();
            }
            btnOff = !btnOff;
        }
    }
    
    

    function showQc() {
        for (var i = 0; i < AlinkLi.length - 1; i++) {
            AlinkLi[i].index = i;
            AlinkLi[i].onmouseover = function () {
                for (var i = 0; i < aLi_qc.length; i++) {
                    aLi_qc[i].style.display = 'none';
                }
                aLi_qc[this.index].style.display = 'block';
                oLink.style.zIndex = 15;
            };
            AlinkLi[i].onmouseout = function () {
                for (var i = 0; i < aLi_qc.length; i++) {
                    aLi_qc[i].style.display = 'none';
                    
                }
                
            };
        }
    }
    //排列部分js；
    
    function sort(){
        
        var num = Math.ceil(900 / aLi.length);
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.left = num * i + 'px';
    }
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function () {
            for (var i = 0; i < aLi.length; i++) {
                if (i <= this.index) {
                    startMove(aLi[i], {
                        left: i * 140
                    })
                }
                else {
                    startMove(aLi[i], {
                        left: (900 - 600) + (i - 1) * 140
                    })
                }
            }
        }
        aLi[i].onmouseout = function () {
            for (var i = 0; i < aLi.length; i++) {
                startMove(aLi[i], {
                    left: num * i
                });
            }
        };
    }
        
    }
    
    
    
    //排列部分js结束；
    //获取时间代码
    function getTime() {
        var date = new Date();
        var iYear = date.getFullYear();
        var iMonth = date.getMonth();
        var iDate = date.getDate();
        var iDay = date.getDay();
        var iHours = date.getHours();
        var iMin = date.getMinutes();
        var iSec = date.getSeconds();
        var str = (iMonth + 1) + '月' + ' ' + iDate + ', ' + iYear + ' / ' + toTwo(iHours) + ':' + toTwo(iMin) + ':' + toTwo(iSec);
        oTime.innerHTML = str;
    }
    
    setInterval(getTime, 1000);
    

    function toTwo(num) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return '' + num;
        }
    }
    //获取时间代码结束；
    window.onresize = function () {
        var vH = document.documentElement.clientWidth || document.body.clientWidth;
        if (vH <= 470) {
            alert('亲，不要再缩小了再小您还能看吗？');
        }
    }
}
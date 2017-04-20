/**
 * JQuery轮播图插件
 * 根据已有图片,展示对应的页码页签
 * @author naodai
 * @link http://ifelsend.com/blog/2017/03/10/%E7%BD%91%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BEjquery%E6%8F%92%E4%BB%B6.html
 * @github https://github.com/ifelsend/IfelsendCarousel
 * @version 2.1.1
 *
 * @Changelog
 * --- 2.1.1 ---
 * 调整参数名称,更加明确
 *
 * --- 2.1.0 ---
 * 支持 animate.css 播放效果
 * animate.css -http://daneden.me/animate
 *
 * --- 2.0.1 ---
 * 增加新闻标题显示
 *
 * --- 2.0.0 ---
 * 增加往左滚动播放效果
 *
 * --- 1.0.0 ---
 * 增加上一页,下一页
 *
 * --- 0.0.1 ---
 * 自动轮播图片
 * 自动创建页码
 * 页码支持数字和图片
 */
(function($){ 
    $.fn.IfelsendCarousel = function(options){ 
        //默认参数
        var defaults = {
            //页码类型,num数字页码,pic图标页码,默认num
            pageType: "num", 
            //当前页码class
            currentPageClass: "on",
            //播放类型, hideShow 淡入淡出,leftScroll 往左滚动,支持animate.css[例如 animated wobble ]默认 hideShow
            playType: "hideShow",
            //播放速度,单位毫秒,默认3000,3秒
            speed: 3000,
            //是否显示标题,1显示,0不显示.默认1
            showTitle: 1
        }
        //参数赋值
        var options = $.extend(defaults, options);        
        
        //初始化
        var currentNum=liLength=imgWidth=leftNum=stopNum=0;
        var that=ul=li=leftInterval=autoPlayInterval = null;

        that = this;
        ul = $(that).find('ul');
        li = ul.children('li');
        liLength = li.length;
        imgWidth = li.find('img').width();
        
        //淡入淡出播放效果
        if(options.playType == "hideShow"){
            ul.css('width',imgWidth);
            li.css('position','absolute');
            li.css('top',0).css('left',0);
        }
        //往左滚动播放效果
        else if(options.playType == "leftScroll"){
            ul.css('width',imgWidth * liLength);
            li.css('position','relative');
            li.css('top',0).css('left',0);
        }
        
        //页码处理逻辑
        var pageString = '<p>';
        for(var i=0,num=1;i<liLength;i++){
            var liAHref = $(li[i]).find('a').attr('href');
            pageString += '<a href="' + liAHref + '"';
            if(0 == i){
                pageString += ' class="' + options.currentPageClass + '"';
            }
            if($(li[i]).find('a').attr('target') != undefined){
                pageString += ' target="'+$(li[i]).find('a').attr('target')+'"';
            }
            pageString += '>';
            if("num" == options.pageType){
                pageString += num;
                num++;
            }
            pageString += '</a>';            
        }
        pageString += '</p>';
        ul.after(pageString);
        
        //上一页,下一页嵌入
        var prevNextString = '<a class="f_prev">&lt;</a><a class="f_next">&gt;</a>';
        $(that).find('p').after(prevNextString);
        
        //新闻标题嵌入
        if(options.showTitle == 1){
            var titleString = '<span><a href="#" target="" title=""></a></span>';
            $(that).find('p').after(titleString);
        }
        
        //鼠标附上图片事件
        $(that).mouseover(function(){
            //显示上一页下一页
            $(that).find('a.f_prev').css('left','0');
            $(that).find('a.f_next').css('right','0');
            //停止自动播放
            window.clearInterval(autoPlayInterval);
        }).mouseout(function(){
            //隐藏上一页下一页
            $(that).find('a.f_prev').css('left','-40');
            $(that).find('a.f_next').css('right','-40');
            //启动自动播放
            autoplay();
        });
        
        //上一页
        $(that).find('a.f_prev').click(function(){
            if(currentNum == 0){
                currentNum = liLength - 1;;
            }
            else{
                currentNum = currentNum - 1;
            }
            play()
        });
        /*.mouseout(function(){
            currentNum = currentNum + 1;
            if(currentNum >= liLength){
                currentNum = 0;
            } 
        });*/
        
        //下一页
        $(that).find('a.f_next').click(function(){            
            currentNum = currentNum + 1;
            if(currentNum >= liLength){
                currentNum = 0;
            }
            play();
        });/*.mouseout(function(){
            currentNum = currentNum + 1;
            if(currentNum >= liLength){
                currentNum = 0;
            } 
        });*/

        //页码事件
        var numA = $(that).find('p').children('a');        
        numA.each(function(k,v){
            $(this).mouseover(function(){
                //定制自定播放
                window.clearInterval(autoPlayInterval);
                window.clearInterval(leftInterval);
                currentNum = k;
                play();
            });
            $(this).mouseout(function(){
                window.clearInterval(leftInterval);
                autoplay();
            });
        });
        
        //播放
        var play = function(){
            //播放类型
            if(options.playType == "hideShow"){
                li.hide();
                $(li[currentNum]).show();
            }
            else if(options.playType == "leftScroll"){
                //防止上一个没有播放完,多个叠加
                window.clearInterval(leftInterval);
                var prevNum = currentNum - 1;
                if(prevNum < 0){
                    prevNum = liLength - 1;
                }
                leftNum = prevNum * (-imgWidth);
                stopNum = currentNum * (-imgWidth);
                var preNum = 10 ;
                leftInterval = window.setInterval(function(){
                    leftNum = leftNum - preNum;                    
                    if(leftNum <= stopNum ){
                        leftNum = stopNum;
                        ul.css('left',leftNum);
                        window.clearInterval(leftInterval);
                    }
                    ul.css('left',leftNum);
                });
            }
            else{
                li.hide();
                var prevNum = currentNum - 1;
                if(prevNum < 0){
                    prevNum = liLength - 1;
                }
                $(li[currentNum]).show().addClass(options.playType).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass(options.playType);
                });
                
            }
            
            //新闻标题处理逻辑
            if(options.showTitle == 1){
                var titleA = $(that).find('span').find('a');
                var currentLiA = $(li[currentNum]).find('a');
                titleA.attr('href',currentLiA.attr('href'));
                //titleA.attr('target',currentLiA.attr('target'));
                titleA.attr('title',currentLiA.attr('title'));
                titleA.html(currentLiA.attr('title'));
                if(currentLiA.attr('target') != undefined){
                    titleA.attr('target',currentLiA.attr('target'));
                }
                else{
                    titleA.removeAttr('target'); 
                }
            }
            
            //页码
            numA.removeClass(options.currentPageClass);
            $(numA[currentNum]).addClass(options.currentPageClass);
        };
        
        //自动播放
        var autoplay = function(){
            //防止快速播放后,播放速度很快的问题
            window.clearInterval(autoPlayInterval);
            autoPlayInterval = window.setInterval(function(){ 
                if(currentNum >= liLength){
                    currentNum = 0;
                }
                play();
                currentNum++
            },options.speed)
        }
        
        autoplay();
    }; 
})(jQuery);

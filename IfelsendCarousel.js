/**
 * JQuery轮播图插件
 * 根据已有图片,展示对应的页码页签
 * @author naodai
 * @link http://ifelsend.com/blog/2017/03/10/%E7%BD%91%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BEjquery%E6%8F%92%E4%BB%B6.html
 * @github https://github.com/ifelsend/IfelsendCarousel
 */
(function($){ 
    $.fn.IfelsendCarousel = function(options){ 
        //默认参数
        var defaults = {
            //页码类型
            numberType: "num", 
            //当前页面class
            currentClass: "on",
            //播放速度
            speed: 3000,
            //播放类型
            playType: 1            
        }
        //参数赋值
        var options = $.extend(defaults, options);        
        
        //初始化
        var currentNum=liLength =imgWidth=leftNum=stopNum= 0,that=ul=li=leftInterval=autoPlayInterval = null;

        that = this;
        ul = $(that).find('ul');
        li = ul.children('li');
        liLength = li.length;
        imgWidth = li.find('img').width();
        
        if(options.playType == 1){
            ul.css('width',imgWidth);
            li.css('position','absolute');
            li.css('top',0).css('left',0);
        }
        else if(options.playType == 2){
            ul.css('width',imgWidth * liLength);
            li.css('position','relative');
            li.css('top',0).css('left',0);
        }
        
        var numString = '<p>';
        for(var i=0,num=1;i<liLength;i++){
            var liAHref = $(li[i]).find('a').attr('href');
            numString += '<a href="' + liAHref + '"';
            if(0 == i){
                numString += ' class="' + options.currentClass + '"';
            }
            if($(li[i]).find('a').attr('target') != undefined){
                numString += ' target="'+$(li[i]).find('a').attr('target')+'"';
            }
            numString += '>';
            if("num" == options.numberType){
                numString += num;
                num++;
            }
            numString += '</a>';            
        }
        numString += '</p>';
        ul.after(numString);

        var prevNextString = '<a class="f_prev">&lt;</a><a class="f_next">&gt;</a>';
        $(that).find('p').after(prevNextString);
        
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
            if(options.playType == 1){
                li.hide();
                $(li[currentNum]).show();
            }
            else if(options.playType == 2){
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
            
            //页码
            numA.removeClass(options.currentClass);
            $(numA[currentNum]).addClass(options.currentClass);
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

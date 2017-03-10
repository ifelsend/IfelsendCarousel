/**
 * JQuery轮播图插件
 * 根据已有图片,展示对应的页码页签
 * @author naodai
 * @link http://ifelsend.com/blog/2017/03/10/%E7%BD%91%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BEjquery%E6%8F%92%E4%BB%B6.html
 * @github https://github.com/ifelsend/IfelsendCarousel
 */
(function($){ 
    $.fn.IfelsendCarousel = function(options){ 
        var defaults = {
            numberType: "num", 
            currentClass: "on",
            speed: 3000,
            playType: 1
            
        } 
        var options = $.extend(defaults, options);
        
        var currentNum = 0;
        var interval = null;
        
        var ul = $(this).find('ul');
        var li = ul.children('li');
        var liLength = li.length;
        var numString = '<p>';
        for(var i=0,num=1;i<liLength;i++){
            var liAHref = $(li[i]).find('a').attr('href');
            numString += '<a href="' + liAHref + '"';
            if(0 == i){
                numString += ' class="' + options.currentClass + '"';
            }
            numString += ' target="_blank">';
            if("num" == options.numberType){
                numString += num;
                num++;
            }
            numString += '</a>';            
        }
        numString += '</p>';
        ul.after(numString);
        
        var numA = $(this).find('p').children('a');
        
        numA.each(function(k,v){
            $(this).mouseover(function(){
                currentNum = k;
                play(k);
                window.clearInterval(interval);
            });
            $(this).mouseout(function(){
                autoplay();
            });
        });
        
        li.each(function(k,v){
            $(this).mouseover(function(){
                currentNum = k;
                play(k);
                window.clearInterval(interval);
            });
            $(this).mouseout(function(){
                autoplay();
            });
        });
        
        var play = function(k){
            li.hide();
            $(li[k]).show();
            numA.removeClass(options.currentClass);
            $(numA[k]).addClass(options.currentClass);
        };
        var autoplay = function(){
            interval = window.setInterval(function(){ 
                if(currentNum >= liLength){
                    currentNum = 0;
                }
                play(currentNum);
                currentNum++
            },options.speed)
        }
        autoplay();
    }; 
})(jQuery);
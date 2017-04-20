# 网页轮播图JQuery插件

# 使用场景
针对已有轮播图,进行播放控制,可以设置显示数字类型页码,图片类型页码,切换显示轮播图,暂停轮播

# 参数说明
默认参数

```javascript
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
```

# 使用方法
```html
<div class="Carousel">
    <ul>
        <li><a href="..."><img src="..."></a></li>
        <li><a href="..."><img src="..."></a></li>
        <li><a href="..."><img src="..."></a></li>
    </ul>
</div>
```
```javascript
//展示数字类型页码
jQuery('#Carousel').IfelsendCarousel({"pageType":"num"});
//展示图片类型页码
jQuery('#Carousel').IfelsendCarousel({"pageType":"pic"});
//使用默认值
jQuery('#Carousel').IfelsendCarousel({});
```
# 演示地址
[ifelsend.com 介绍](http://ifelsend.com/blog/2017/03/10/jquery%E6%8F%92%E4%BB%B6%E7%BD%91%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BEifelsendcarousel.html)

[ifelsend.com 演示](http://ifelsend.com/demo/IfelsendCarousel/)

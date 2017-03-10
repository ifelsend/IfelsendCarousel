#网页轮播图JQuery插件

#使用场景
针对已有轮播图,进行播放控制,可以设置显示数字类型页码,图片类型页码,切换显示轮播图,暂停轮播

#使用方法
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
jQuery('#Carousel').IfelsendCarousel({"numberType":"num"});
//展示图片类型页码
jQuery('#Carousel').IfelsendCarousel({"numberType":"pic"});
//使用默认值
jQuery('#Carousel').IfelsendCarousel({});
```

// -----------------------------------------------------
// Title: Skip to Options User script
// version: 1.0.1
// Date: 2014-04-18
// Author: PayPal Accessibility Team
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2014 PayPal Accessibility Team
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v1.0.1 - 2014-04-18
* https://github.com/paypal/skipto
* Copyright (c) 2014 PayPal Accessibility Team; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

!function(){"undefined"==typeof document||"classList"in document.createElement("a")||!function(view){"use strict";if("HTMLElement"in view||"Element"in view){var classListProp="classList",protoProp="prototype",elemCtrProto=(view.HTMLElement||view.Element)[protoProp],objCtr=Object,strTrim=String[protoProp].trim||function(){return this.replace(/^\s+|\s+$/g,"")},arrIndexOf=Array[protoProp].indexOf||function(item){for(var i=0,len=this.length;len>i;i++)if(i in this&&this[i]===item)return i;return-1},DOMEx=function(type,message){this.name=type,this.code=DOMException[type],this.message=message},checkTokenAndGetIndex=function(classList,token){if(""===token)throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(token))throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character");return arrIndexOf.call(classList,token)},ClassList=function(elem){for(var trimmedClasses=strTrim.call(elem.className),classes=trimmedClasses?trimmedClasses.split(/\s+/):[],i=0,len=classes.length;len>i;i++)this.push(classes[i]);this._updateClassName=function(){elem.className=this.toString()}},classListProto=ClassList[protoProp]=[],classListGetter=function(){return new ClassList(this)};if(DOMEx[protoProp]=Error[protoProp],classListProto.item=function(i){return this[i]||null},classListProto.contains=function(token){return token+="",-1!==checkTokenAndGetIndex(this,token)},classListProto.add=function(){var token,tokens=arguments,i=0,l=tokens.length,updated=!1;do token=tokens[i]+"",-1===checkTokenAndGetIndex(this,token)&&(this.push(token),updated=!0);while(++i<l);updated&&this._updateClassName()},classListProto.remove=function(){var token,tokens=arguments,i=0,l=tokens.length,updated=!1;do{token=tokens[i]+"";var index=checkTokenAndGetIndex(this,token);-1!==index&&(this.splice(index,1),updated=!0)}while(++i<l);updated&&this._updateClassName()},classListProto.toggle=function(token,forse){token+="";var result=this.contains(token),method=result?forse!==!0&&"remove":forse!==!1&&"add";return method&&this[method](token),!result},classListProto.toString=function(){return this.join(" ")},objCtr.defineProperty){var classListPropDesc={get:classListGetter,enumerable:!0,configurable:!0};try{objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc)}catch(ex){-2146823252===ex.number&&(classListPropDesc.enumerable=!1,objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc))}}else objCtr[protoProp].__defineGetter__&&elemCtrProto.__defineGetter__(classListProp,classListGetter)}}(self),Window.prototype.addEventListener||(HTMLDocument.prototype.addEventListener=Element.prototype.addEventListener=Window.prototype.addEventListener=function(type,fCallback,capture){var modtypeForIE="on"+type;if(capture)throw new Error("This implementation of addEventListener does not support the capture phase");var nodeWithListener=this;this.attachEvent(modtypeForIE,function(e){Object.defineProperty(e,"currentTarget",{get:function(){return nodeWithListener}}),Object.defineProperty(e,"eventPhase",{get:function(){return e.srcElement==nodeWithListener?2:3}});var time=new Date;Object.defineProperty(e,"timeStamp",{get:function(){return time}}),fCallback.call(nodeWithListener,e)})},Object.defineProperty(Event.prototype,"target",{get:function(){return this.srcElement}}),Event.prototype.stopPropagation=function(){this.cancelBubble=!0},Event.prototype.preventDefault=function(){this.returnValue=!1}),document.getElementsByClassName||(document.getElementsByClassName=function(classNames){return classNames=String(classNames).replace(/^|\s+/g,"."),document.querySelectorAll(classNames)},Element.prototype.getElementsByClassName=document.getElementsByClassName),Array.prototype.indexOf||(Array.prototype.indexOf=function(searchElement){if(null==this)throw new TypeError;var t=Object(this),len=t.length>>>0;if(0===len)return-1;var n=0;if(arguments.length>1&&(n=Number(arguments[1]),n!=n?n=0:0!=n&&1/0!=n&&n!=-1/0&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=len)return-1;for(var k=n>=0?n:Math.max(len-Math.abs(n),0);len>k;k++)if(k in t&&t[k]===searchElement)return k;return-1})}(),function(appConfig){"use strict";var SkipTo={};SkipTo.prototype={elementsArr:[],dropdownHTML:null,config:{headings:"h1, h2, h3, h4",landmarks:'[role="banner"], [role="navigation"], [role="main"], [role="search"]',ids:"#SkipToA1, #SkipToA2",accessKey:"0",wrap:"false",visibility:"onFocus",customClass:"",attachElement:document.body},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings="undefined"!=typeof appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)localConfig.hasOwnProperty(name)&&(localConfig[name]=appConfigSettings[name])},init:function(appConfig){this.setUpConfig(appConfig);var div=document.createElement("div"),attachElement=this.config.attachElement.nodeType?this.config.attachElement:document.querySelector(this.config.attachElement),htmlStr="";this.addStyles(".skipTo{padding:.5em;position:absolute;background:transparent;color:#000;-webkit-transition:top .5s ease-out,background .5s linear;-moz-transition:top .5s ease-out,background .5s linear;-o-transition:top .5s ease-out,background .5s linear;transition:top .5s ease-out,background .5s linear}.skipTo:focus{position:absolute;top:0;left:0;background:#ccc;z-index:1000;text-decoration:underline;-webkit-transition:top .1s ease-in,background .3s linear;-moz-transition:top .1s ease-in,background .3s linear;-o-transition:top .1s ease-in,background .3s linear;transition:top .1s ease-in,background .3s linear}.onFocus{top:-5em;left:0}.onLoad{top:0;left:0;background:#ccc}.dropup,.dropMenu{position:relative}.dropMenu-toggle{*margin-bottom:-3px}.dropMenu-toggle:active,.open .dropMenu-toggle{outline:0}.caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:''}.dropMenu .caret{margin-top:8px;margin-left:2px}.dropMenu-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.dropMenu-menu.pull-right{right:0;left:auto}.dropMenu-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.dropMenu-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333;white-space:nowrap;text-decoration:none}.dropMenu-menu>li>a:hover,.dropMenu-menu>li>a:focus,.dropMenu-submenu:hover>a,.dropMenu-submenu:focus>a{text-decoration:none;color:#fff;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropMenu-menu>.active>a,.dropMenu-menu>.active>a:hover,.dropMenu-menu>.active>a:focus{color:#fff;text-decoration:none;outline:0;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropMenu-menu>.disabled>a,.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{color:#999}.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:default}.open{*z-index:1000}.open>.dropMenu-menu{display:block}.pull-right>.dropMenu-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropMenu .caret{border-top:0;border-bottom:4px solid #000;content:''}.dropup .dropMenu-menu,.navbar-fixed-bottom .dropMenu .dropMenu-menu{top:auto;bottom:100%;margin-bottom:1px}.dropMenu-submenu{position:relative}.dropMenu-submenu>.dropMenu-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px}.dropMenu-submenu:hover>.dropMenu-menu{display:block}.dropup .dropMenu-submenu>.dropMenu-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0}.dropMenu-submenu>a:after{display:block;content:' ';float:right;width:0;height:0;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;border-left-color:#ccc;margin-top:5px;margin-right:-10px}.dropMenu-submenu:hover>a:after{border-left-color:#fff}.dropMenu-submenu.pull-left{float:none}.dropMenu-submenu.pull-left>.dropMenu-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.dropMenu .dropMenu-menu .nav-header{padding-left:20px;padding-right:20px}"),this.dropdownHTML='<a accesskey="'+this.config.accessKey+'" tabindex="0" data-wrap="'+this.config.wrap+'"class="dropMenu-toggle skipTo '+this.config.visibility+" "+this.config.customClass+'" id="drop4" role="button" aria-haspopup="true" ',this.dropdownHTML+='aria-expanded="false" data-toggle="dropMenu" href="#" data-target="menu1">Skip to<b class="caret"></b></a>',this.dropdownHTML+='<ul id="menu1" class="dropMenu-menu" role="menu" aria-labelledby="drop4" style="top:3%; text-align:left">',this.getLandMarks(),this.getHeadings(),this.getIdElements(),htmlStr=this.getdropdownHTML(),this.dropdownHTML+=htmlStr+"</ul>",htmlStr.length>0&&(div.className="dropMenu",attachElement.insertBefore(div,attachElement.firstChild),div.innerHTML=this.dropdownHTML,this.addListeners())},getHeadings:function(){var i,j,heading,id,val,headings=document.querySelectorAll(this.config.headings);for(i=0,j=headings.length;j>i;i+=1)heading=headings[i],id=heading.getAttribute("id")||heading.innerHTML.replace(/\s+/g,"_").toLowerCase().replace(/[&\/\\#,+()$~%.'"!:*?<>{}¹]/g,"")+"_"+i,heading.tabIndex="-1",heading.setAttribute("id",id),val=heading.innerHTML.replace(/<\/?[^>]+>/gi,""),this.elementsArr[id]=val},getLandMarks:function(){var k,l,landmark,id1,role,val,landmarks=document.querySelectorAll(this.config.landmarks);for(k=0,l=landmarks.length;l>k;k+=1)landmark=landmarks[k],id1=landmark.getAttribute("id")||"ui-skip-"+Math.floor(100*Math.random()+1),landmark.tabIndex="-1",landmark.setAttribute("id",id1),role=landmark.getAttribute("role"),"contentinfo"===role&&(role="footer"),val=role.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}),val+="main"===role?" Content":" Landmark",this.elementsArr[id1]=val},getIdElements:function(){var i,j,el,id,val,els=document.querySelectorAll(this.config.ids);for(i=0,j=els.length;j>i;i+=1)el=els[i],id=el.getAttribute("id"),val=el.innerHTML.replace(/<\/?[^>]+>/gi,"").replace(/\s+/g," ").trim(),val.length>30&&(val=val.replace(val,val.substr(0,30)+"...")),this.elementsArr[id]=val},getdropdownHTML:function(){var key,val,htmlStr="";for(key in this.elementsArr)val=this.elementsArr[key],htmlStr+='<li role="presentation" style="list-style:none outside none"><a tabindex="-1" role="menuitem" href="#',htmlStr+=key+'">'+val,htmlStr+="</a></li>";return htmlStr},addStyles:function(cssString){var tt1,ss1=document.createElement("style"),hh1=document.getElementsByTagName("head")[0];ss1.setAttribute("type","text/css"),hh1.appendChild(ss1),ss1.styleSheet?ss1.styleSheet.cssText=cssString:(tt1=document.createTextNode(cssString),ss1.appendChild(tt1))},addListeners:function(){window.addEventListener("hashchange",function(){var element=document.getElementById(location.hash.substring(1));element&&(/^(?:a|select|input|button|textarea)$/i.test(element.tagName)||(element.tabIndex=-1),element.focus())},!1)}},SkipTo.prototype.init(appConfig)}(window.Drupal||window.Wordpress||window.SkipToConfig||{}),function(){"use strict";var Dropdown={};Dropdown.prototype={btn:null,prt:null,menu:null,wrap:"false",clearMenus:function(){var self=this;setTimeout(function(){var isActive=self.prt.classList.contains("open");isActive&&!self.prt.contains(document.activeElement)&&(self.prt.classList.remove("open"),self.btn.setAttribute("aria-expanded","false"))},150)},toggleOptList:function(e){this.btn=e.target,this.prt=this.btn.parentNode,this.menu=document.getElementById(this.btn.getAttribute("data-target")),"undefined"!=typeof this.btn.getAttribute("data-wrap")&&(this.wrap=this.btn.getAttribute("data-wrap")),this.prt.classList.toggle("open"),this.prt.classList.contains("open")?this.btn.setAttribute("aria-expanded","true"):this.btn.setAttribute("aria-expanded","false");try{this.menu.getElementsByTagName("a")[0].focus()}catch(err){}},navigateMenus:function(e){var keyCode=e.keyCode||e.which,arrow={spacebar:32,up:38,esc:27,down:40},isActive=this.prt.classList.contains("open"),items=this.menu.getElementsByTagName("a"),index=Array.prototype.indexOf.call(items,e.target);if(/(32|38|40|27)/.test(keyCode)){switch(e.preventDefault(),keyCode){case arrow.down:index+=1;break;case arrow.up:index-=1;break;case arrow.esc:if(isActive)return this.btn.click(),void this.btn.focus()}0>index&&(index="true"===this.wrap?items.length-1:0),index===items.length&&(index="true"===this.wrap?0:items.length-1),items.item(index).focus()}},init:function(){var toggleBtn,k,l,menu,items,i,j,item,toggle=document.getElementsByClassName("dropMenu-toggle"),self=this;for(k=0,l=toggle.length;l>k;k+=1)for(toggleBtn=toggle[k],menu=document.getElementById(toggleBtn.getAttribute("data-target")),items=menu.getElementsByTagName("a"),toggleBtn.addEventListener("click",function(e){self.toggleOptList(e)}),toggleBtn.addEventListener("keydown",function(e){var keyCode=e.keyCode||e.which;32===keyCode&&(this.click(e),e.preventDefault())}),i=0,j=items.length;j>i;i+=1)item=items[i],item.addEventListener("keydown",function(e){self.navigateMenus(e)}),item.addEventListener("blur",function(e){self.clearMenus(e)})}},Dropdown.prototype.init()}();
//# sourceMappingURL=http://paypal.github.io/SkipTo/downloads/js/skipto.min.map/*@end @*/

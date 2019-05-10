var ccCommunity;
if(typeof(CC)=="undefined"){
var CC={};
(function(){
var _z=2000,_cb=[],_script=[],_d=document;
var _key=function(s){var k=s.replace(/\//g,"").replace(/\./g,"").replace(/-/g,"")+"",i=k.indexOf("?");return (i>0)?k.substring(0,i):k;}
var _CC={
  ver:"",
  $:function(id,o){
    if(id==""){console.error("id is empty/" + o)}
    else{return o?o.getElementById(id):_d.getElementById(id)}
  },
  ready:function(o,fn){
    if(o.readyState&&o.readyState=="complete"){fn}
    else if(o.addEventListener){o.addEventListener("DOMContentLoaded",fn,false)}
    else{setTimeout(fn,2000);}
  },
  link:function(url,text){//url,text,attr
    if(!url||!text){return}if(text.indexOf("&lt;/")!=-1){text=text.replace(/&lt;/g,"<").replace(/&gt;/g,">");}
    var a=arguments;return "<A HREF='"+url+"'"+((a.length==3)?" "+a[2]:"")+">"+text+"</A>";
  },
  head:_d.getElementsByTagName("head")[0],
  on:function(o,e,fn){if(!o){return false;}o.addEventListener(e,fn,false)},
  script:function(src,callback){CC.js(src,callback)},
  js:function(src,callback){
    if(CC.ver){
      var idx=src.indexOf('?'),url=src,tag="";
      if(idx!=-1){url=src.substring(0,idx);tag=src.substring(idx + 1).trim();if(tag!=""){tag+="+";}}
      src=url+'?'+tag+CC.ver;
    }
    function _loaded(k2,isCallback){
      _script[k2]=2;if(!isCallback&&!_cb[k2]){return;}
      var f;while(_cb[k2].length>0){f=_cb[k2].shift();setTimeout(f,0);}delete _cb[k2];
    }
    function _loading(o,k,isCallback){
      if(o.readyState){o.onreadystatechange=function(){var r=this.readyState;if(r==4||r=='complete'||r=='loaded'){_loaded(k,isCallback)}}
      }else{o.onload=function(){_loaded(k,isCallback)}}
      o.onerror=function(){console.log("Error when loading "+o.src)}
    }
    function _create(){
      _script[k]=1;if(isCallback){_cb[k]=[];_cb[k].push(callback)}
      var o=_d.createElement('script');o.src=src;o.id=k;o.async=true;o.charset="utf-8";
      CC.head.appendChild(o);_loading(o,k,isCallback);
    }
    var isCallback=typeof(callback)=="function",k=_key(src);
    if(CC.$(k)==null&&!_script[k]){_create()}
    else if(_script[k]==1){if(isCallback){if(!_cb[k]){_cb[k]=[];}_loading(CC.$(k),k,isCallback);_cb[k].push(callback);}}
    else if(isCallback){if(_d.all){setTimeout(callback,0);}else{callback();}}
  },
  scriptLoaded:function(src){_script[_key(src)]=2},
  scripts:function(arr,callback){//arr : ["a.js","b.js","c.js"], load js in list sequence
    if(arr.length==1){CC.js(arr[0],callback)}
    else{CC.js(arr.shift(),function(){CC.scripts(arr,callback)})}
  },
  offsetX:function(o){
    var d=0;
    while(1){
      d+=o.offsetLeft;
      if(!o.offsetParent){break}
      o=o.offsetParent;}
    return d;
  },
  offsetY:function(o){
    var d=0;
    while(o){
      if(CC.style.value(o,"position")!="fixed"){d+=o.offsetTop}
      if(!o.offsetParent){break}
      o=o.offsetParent;
    }
    return d;
  },
  x:function(o){
    function _left(o){return (o.parentNode)?o.scrollLeft+_left(o.parentNode):0}
    var bodyOffset=((navigator.userAgent.toLowerCase().indexOf('firefox')!=-1) && CC.nav)?CC.style.size(_d.body,"margin-left"):0;
    return CC.offsetX(o)-_left(o)+bodyOffset;
  },
  y:function(o){
    var parentTop=0;
    var bodyOffset=((navigator.userAgent.toLowerCase().indexOf('firefox')!=-1) && CC.nav)?CC.style.size(_d.body,"margin-top"):0;
    return CC.offsetY(o)-parentTop+bodyOffset;
  },
  zIndex:function(){return ++_z+1}
}
CC=_CC;
CC.i18n={}
})();
}
CC.style={
  value:function(o,s){try{return window.getComputedStyle(o,null).getPropertyValue(s)}catch(e){}},
  size:function(o,s){var r=(CC.style.value(o,s)+"").toLowerCase(),ret=(r.indexOf("em")>0)?r.replace(/em/,"")*12:parseInt(r);return isNaN(ret)?0:ret;},
  link:function(s,props){
    var idx=s.indexOf('?'),id=(idx==-1)?s:s.substring(0,idx);
    if(CC.ver){
      var url=s, tag="";
      if(idx!=-1){url=id;tag=s.substring(idx+1).trim();}
      s=url+"?"+((tag == "")?CC.ver:tag+"+"+CC.ver);
    }
    id="css"+id.replace(/\//g,"_");
    var o=CC.$(id),d=document;
    if(!o){
      o=d.createElement("link");o.rel="stylesheet";o.type="text/css";o.href=s;o.id=id;
      if(arguments.length==2){for(var i in props){o.setAttribute(i,props[i])}}
      CC.head.appendChild(o);
    }
    return o;
  },
  add:function(s){
    var d=document,o=d.createElement("STYLE");o.setAttribute("type","text/css");
    if(o.styleSheet){o.styleSheet.cssText=s}else{o.appendChild(d.createTextNode(s))}
    CC.head.appendChild(o);return o;
  },
  showBlock:function(s){s.display="block"},
  hideBlock:function(s){s.display="none"}
}
CC.tab={
  isPreventOverrun:function(){return CC.ui&&CC.ui.t=="P"},
  isFitInWinwdow:function(){return CC.tab.isPreventOverrun()}
}
CC.stab={};CC.i18n={};
function ccAreaExpanded(id){return ccObjExpanded(CC.$(id))}
function ccObjExpanded(o){var s=o.currentStyle?o.currentStyle:o.style;if(s.display){return!(s.display=="none"||s.display=="")}else{return(o.className!="ccHidden")}}
function ccToggleArea(id){CC.toggle(id);return false;}
CC.toggle=function(id){var o=(typeof(id)=="string")?CC.$(id):id;if(o){var s=CC.style.value(o,"display");if(s=="none"||s==""){ccExpandObj(o)}else{ccCollapseObj(o)}}}
function ccExpandArea(id){ccExpandObj(CC.$(id))}
function ccExpandObj(o){ //obj
  if (o==null){return false;}
  var t=o.tagName,s=o.style;o.style.visibility="visible";o.setAttribute("aria-expanded","true");
  if(t=="DIV"){s.display="block"}else if(t=="SPAN"||t=="INPUT"||t=="A"||t=="BUTTON"||t=="NOBR"||t=="IMG"){s.display="inline"}
  else{
    if(t=="TABLE"){s.display="table"}else if(t=="TR"){s.display="table-row"}else if(t=="THEAD"||t=="TBODY"){s.display="table-row-group"}
    else if(t=="TD"||t=="TH"){s.display="table-cell"}else if(t=="LI"){s.display="list-item"}else{s.display="block"}
  }
  return false;
}
function ccCollapseArea(id){return ccCollapseObj(CC.$(id))}
function ccCollapseObj(o){if(o==null){return false}o.style.display="none";o.setAttribute("aria-expanded","false");return false}
function ccGetCookie(k){
  var c=document.cookie;if(c.length==0){return null}
  var i=c.indexOf(k+"=");if(i!=-1){i+=k.length+1;var j=c.indexOf(";",i);if(j==-1){j=c.length;}return decodeURIComponent(c.substring(i,j));}
  return null;
}
function ccSetCookie(k,v,e,path){//key, value, expired, path
  var s=k+"="+encodeURIComponent(v);
  if(e){var d=new Date();d.setTime(d.getTime()+(e*24*3600*1000));s=s+"; expires="+d.toGMTString()}
  if(path){s=s+"; path="+path}
  document.cookie=s;
} 
function ccDelCookie(k){if(ccGetCookie(k)){document.cookie=k+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT";}}
function ccSetHiddenStyle(id){CC.style.add("#"+id+"{display:none}")}
CC.access={
  _cookie:function(){return ccGetCookie("CC_accessible")},
  is:function(){return CC.access._cookie()!=null},
  screenReader:function(){return "screenReader"==CC.access._cookie()},
  keyboard:function(){return "keyboard"==CC.access._cookie()},
  keyTraverse:false//if use tab key to traverse page.
}
CC.isMenuOverlay=function(){return CC.ui&&CC.ui.m=="O"}
function ccTrackingClick(linkObj,id){ 
  if(linkObj!= null){
    var url=linkObj.getAttribute("linkurl");if(url!=null&&url.toLowerCase().indexOf("://")==-1){url="http://"+url;linkObj.linkurl=url}
    if(!linkObj.target){linkObj.target="_blank"}
    linkObj.href="PageServlet?pg=Bookmark-worker&tg=Bookmark-worker&cmd=clickLink&bookmarkid="+id+"&link="+encodeURIComponent(url);
  }
}
var ccHasHeader=true,ccHasMenu=true;
CC.layouts={};
function ccGetWinHeight(){return ccGetTWinHeight(window,document)}
function ccGetTWinHeight(win,doc){
  var y=240,w=win,d=doc;
  if(w.innerHeight){y=w.innerHeight}
  else if(d.documentElement&&d.documentElement.clientHeight){y=d.documentElement.clientHeight}//for IE8 after page loaded
  else if(d.body){y=d.body.offsetHeight}
  return y;
}
function ccGetTWinWidth(win,doc){
 var x=300,w=win,d=doc;
 if(w.innerWidth){x=w.innerWidth}
 else if(d.documentElement&&d.documentElement.clientWidth){x=d.documentElement.clientWidth}
 else if(d.body){x=d.body.offsetWidth}
 return x;
}
function ccGetWinWidth(){
  CC.winW=ccGetTWinWidth(window,document);
  CC.isSmallDevice=(CC.isDevice||CC.winW<=768);
  return CC.winW;
}
function ccSetLayouts(){var c=CC.layouts;
  c.hd=CC.$("ccNavHeader");c.menu=CC.$("ccNavMenu");c.sidebar=CC.$("ccSidebar");
  c.bread=CC.$("ccBread");c.app=CC.$("ccApp");c.navContent=CC.$("ccNavContent");
}

function ccContains(child, parent) {
  if (ccIsNone(child) || ccIsNone(parent)){return false}
  child = typeof child == "string" ? CC.$(child) : child, parent = typeof parent == "string" ? CC.$(parent) : parent
  if (ccIsNone(child) || ccIsNone(parent)){return false}
  if (child == parent){return true}
  if (parent.contains){
    if (parent.nodeType === 9){return true}
    return parent.contains(child);
  } else if (parent.compareDocumentPosition) {
    return !!(parent.compareDocumentPosition(child) & 16);
  }
  while ((child = child.parentNode)){
    if (child === parent){return true}
  }
  return false;
}

function ccIsNone(s) {
  if (s == null){return true}
  else if (typeof s == "undefined"){return true}
  else if (typeof s == "string" && /^s*$/.test(s)) {return true}
  else {return false}
}
function ccAddClass(o, cls) {
  if (typeof o === "string" && o.indexOf("#") === -1){o = "#" + o}
  $(o).addClass(cls);
}
function ccRemoveClass(o, cls) {
  if (typeof o === "string" && o.indexOf("#") === -1){o = "#" + o}
  $(o).removeClass(cls);
}
function ccToggleClass(o, cls) {
  if (typeof o === "string" && o.indexOf("#") === -1){o="#" + o}
  $(o).toggleClass(cls);
}

CC.popupList=[];CC.win=[];
function openWin(winName,url){//popup window : openWin(winName,url,w,h,options,x,y)
  var w,a=arguments,l=a.length,o=[];o.name=winName;o.url=url;
  if(2<l){o.w=a[2]};if(3<l){o.h=a[3]};if(4<l){o.options=a[4];}if(6<l){o.x=a[5];o.y=a[6];}
  if(CC.win){return CC.win.open(o);}
  return w;
}
CC.win.open=function(o){//popup window : o={name,url,w,h,options,x,y,callback}
  if(typeof(ccUTSetCookie)=="function"){ccUTSetCookie();}  //for usageTracking
  var w=window,x,y,loc="",winOptions=',resizable,dependent'; if(o.options){winOptions+=","+o.options;}
  if (w.screenX){
    if(w.outerWidth){x=(o.x)?o.x:(w.screenX+(w.outerWidth-o.w)/2);y=(o.y)?o.y:(w.screenY+(w.outerHeight-o.h)/2);}
    else{x=(o.x)?o.x:(w.screenX+50);y=(o.y)?o.y:(w.screenY+50);}
    loc=",screenX="+x+",screenY="+y;
  } else if (w.screenLeft && top) { 
    var b=top.document.body; //IE
    if(b.clientWidth){x=(o.x)?o.x:top.screenLeft+(b.clientWidth-o.w)/2;y=(o.y)?o.y:top.screenTop+(b.clientHeight-o.h)/2;} 
    else {x=(o.x)?o.x:(top.screenLeft+50);y=(o.y)?o.y:(top.screenTop+50);}
    loc=",left="+x+",top="+y;
  }
  var winName=o.name.replace(/\s/g,""), pop=CC.popupList[winName]; //remove any space in window name;
  var feature= "width="+((o.w>screen.width)?(screen.width-20):o.w)+",height="+((o.h>screen.height)?(screen.height-20):o.h)+winOptions+loc;
  if(!pop){pop = w.open(o.url,winName,feature); ccPopList(winName, pop);}else{
    if(pop.closed){pop = w.open(o.url,winName, feature); ccPopList(winName, pop);} //pop up window has been closed.
    else{pop.location.href=o.url;}//pop up window is still open.
  }
  ccPopupFocus(pop); if(o.callback){o.callback();}
  return pop;
}

var ccPrintableAreaId;
function ccPopupFocus(win){try{win.focus()}catch(e){ccPopupAlert()}}
function ccPopList(winName, win){CC.popupList[winName]=win;}
function ccPopupAlert(){CC.script("/js/"+CC.lang+"/ccOpenWin-i18n.js",function(){alert(ccPopupAlertI18n)});}
function ccClosePopups(){for(var i in CC.popupList){var p=CC.popupList[i];try{if(p&&!p.closed) p.close();}catch(e){}}}
function ccDetachWin(winId){delete CC.popupList[winId];}
function PrintFormat(){if(arguments[0]){ccPrintableAreaId=arguments[0]}else{ccPrintableAreaId="ccTgArea";}ccPrintableWin("/printable_area.html?"+CC.ver)}
function ccPrintableWin(url){openWin("printable", url,780,400,'status,menubar,resizable,scrollbars,toolbar');}
function openNewWin(winName,url,W,H,options){return openWin(winName,url+'&'+(new Date()).getTime(),W,H,options);}
function ccDetachWin(winId){delete CC.popupList[winId];}
function ccUnload(){if(typeof(ccUnloadLocal)=="function"){if(!ccUnloadLocal()){return false}}if(typeof(ccClosePopups)=='function'){ccClosePopups()}}
CC.initAria=function(o){CC.aria(o)}
CC.aria=function(areaObj){
  function _resetCell(row){for(var j=0;j<row.cells.length;j++){row.cells[j].setAttribute("role","presentation")}}
  function _resetRow(tb){for(var j=0;j<tb.rows.length;j++){tb.rows[j].setAttribute("role","presentation")}_resetCell(tb.rows[j])}
  var tables=areaObj.getElementsByTagName("TABLE"),tb,role;
  for (var i=0;i<tables.length;i++){
    tb=tables[i];role=tb.getAttribute("role");
    if(role==null&&!tb.tHead||role=="presentation"){
      tb.setAttribute("role","presentation");
      for(var j=0;j<tb.rows.length;j++){
        var row=tb.rows[j];row.setAttribute("role","presentation");
        for(var k=0;k<row.cells.length;k++){row.cells[k].setAttribute("role","presentation")}
      }
    }
  }
  var inputs=areaObj.getElementsByTagName("INPUT"),o,req;
  for (var i=0;i<inputs.length;i++){
    o=inputs[i];req=o.getAttribute("required");
    if(req!=null&&req=="required"){o.setAttribute("aria-required","true")}
  }
}
window.addEventListener("unload", ccUnload, true);
CC.on(window,"load",function(){CC.aria(document)});
CC.winW=ccGetWinWidth();
CC.isDevice=navigator.userAgent.match(/android|iphone|ipad|ipod|mobile|mini/i);
CC.isSmallDevice=(CC.isDevice||CC.winW<=768);
CC.isCCXSSize=function(){return CC.winW<=560}
CC.isXXXSSize=function(){return CC.winW<=320}
CC.style.padLoaded=false;
CC.style.mobileLoaded=false
function ccRTFSupport() {
  if(CC.isDevice){return false}
  return document.designMode;
}
CC.rwdStyle=function(){
  function _media(w) {//{"media":"only screen and (device-width:768px), (max-width:768px)"})
    return {"media":"only screen and (device-width:" + w + "px), (max-width:" + w + "px)"};
  }
  function _mediaTab(w) {return {"media":"only screen and (max-device-width:1024px)"}}
  if(CC.winW==1024&&CC.isDevice&&!CC.style.smDesktopLoaded){
    CC.style.link("/cc0-900.css",_mediaTab());
    CC.style.smDesktopLoaded=true;
  }
  if(CC.winW<=900&&!CC.style.smDesktopLoaded){
    if(CC.isDevice) {CC.style.link("/cc0-900.css",_mediaTab())}
    else{CC.style.link("/cc0-900.css",_media(900))}
    CC.style.smDesktopLoaded=true;
  }
  if(CC.isSmallDevice&&!CC.style.padLoaded){
    CC.style.link("/cc0-768.css",_media(768));
    CC.style.padLoaded=true;
  }
  if(CC.isCCXSSize()&&!CC.style.mobileLoaded){
    CC.style.link("/cc0-560.css",_media(560));
    CC.style.link("/cc0-480.css",_media(480));
    CC.style.mobileLoaded=true;
  }
  if(!CC.isDevice&&CC.style.padLoaded&&CC.style.mobileLoaded){
    window.removeEventListener("resize",CC.rwdStyle);
  }
}
CC.tabsOpen=function(){
  CC.tabsOpenOn=true;
  $(document).on('click', 'ul.cc-tabs, ul.cc-tabs-flat', function() {
    if(CC.isSmallDevice){$(this).toggleClass('cc-tabs-open')}
  });
}
if(typeof(ccNoRWD)=="undefined"){
  CC.rwdStyle();
  if(!CC.isDevice){
    window.addEventListener("resize",CC.rwdStyle);
    window.addEventListener("resize",function(){CC.winW=ccGetWinWidth();if(CC.isSmallDevice&&typeof(CC.tabsOpenOn)=="undefined"){CC.tabsOpen()}});
  }
}
if(history.pushState){
  CC.on(window,"load",function(){
    if(CC.cp&&CC.cp.id){
      var url=location.href;
      if(url.indexOf("?")>0){
        CC.cx="u";
        if(typeof(ccContextId)!="undefined"&&ccContextId!=""){
          CC.cx=ccContextId.replace(/cx=/,"");
        }
        if(url.indexOf("cx=u")>0&&url.indexOf("cp=")==-1){
        }else if(url.indexOf("cx=")==-1&&url.indexOf("cp=")==-1){
          if(typeof(ccContextId)!="undefined"&&ccContextId!=""){
            history.replaceState(null,null,url+"&"+ccContextId);
          }else if(url.indexOf("pg=papp&")==-1){
            history.replaceState(null,null,url+"&cp="+CC.cp.id);
          }else{history.replaceState(null,null,url+"&cx=u")}
        }
      }
    }
  })
}
CC.ajax=function(o){  //ajaxType,url,data,success,error,async,dataType
  var ajaxType=(o.type==null || o.type=="" || typeof(o.type)=="undefined")? "get" : o.type;
  var async = (o.async==null || o.async=="" || typeof(o.async)=="undefined")? "true" : o.async;
  var dataType = (o.dataType==null || o.dataType=="" || typeof(o.dataType)=="undefined")? "html" : o.dataType;
  var success = function(){}
  if (typeof(o.success)=="function"){success = o.success;}
  var data=o.data, url=o.url;
  if(url==undefined||url==null||url==""){throw new Error("no request url");return}
  var defaultError = function() {
    if(CC.ajaxErrorI18n && o.msgObj){
      o.msgObj.addClass("cc-req-error");
      o.msgObj.html(CC.ajaxErrorI18n);
    }
  };
  var error = typeof(o.error)=="undefined"? defaultError : o.error;
  $.ajax({
    type: ajaxType,
    url: url,
    data: data,
    success: success,
    error: error,
    async: async,
    dataType: dataType
  });
  if (CC.timer){CC.timer.reset()}// CC.timer.reset in ccSession.js : reset session timer.
};

function bmNoInternalNoSeparate(linkObj,id,title){ //deprecated
 if(linkObj!= null){
   var url=linkObj.getAttribute("linkurl"), curUrl = window.location.href.toString();
   var splitURL=curUrl.split('?');
   if(url!=null&&url.toLowerCase().indexOf("://")==-1){url="http://"+url}
   var encURL=encodeURIComponent(url), encTitle=encodeURIComponent(title);;
   var skipURL=splitURL[0] + "?pg=Bookmark-iFrameProxy&proxyTarget=" + encURL+"&bookmarkid="+id+"&pageTitle=" + encTitle;
   window.location.href = skipURL;
 }
}
//ccLocalstorage.js
(function(){
  function _isSupport(){
    try {
      localStorage.setItem('_testLocalStorage', 'test');
      localStorage.removeItem('_testLocalStorage');
      return true;
    } catch(e){return false}
  }
  if (typeof CC.localstorage == "undefined") {
    var _support=_isSupport();
    var _localstorage={
      support:_support,
      setItem : function(module, key, value, errHandle) {
        if(!_support){return}
        try {
          if (typeof value == "object"){value = JSON.stringify(value)}
          localStorage.setItem(module + "." + key, value);
        } catch (e) {
          console.err(e);
          errHandle && errHandle();
        }
      },
      getItem : function(module, key) {
        if(!_support){return "";}
        var s = localStorage.getItem(module + "." + key);
        if (!s) {return ""}
        var isObj = false;
        if (s.indexOf("{") == 0 && s.lastIndexOf("}") == s.length - 1) {isObj = true}
        if (s.indexOf("[") == 0 && s.lastIndexOf("]") == s.length - 1) {isObj = true}
        if(isObj){s = JSON.parse(s)}
        return s;
      },
      getItems : function(module) {
        var items={};
        if(!_support){return}
        var prefixLen = module.length+1;
        for (var key in localStorage) {
          if (key.indexOf(module + ".") == 0) {
            var s = localStorage.getItem(key);
            var isObj = false;
            if (s.indexOf("{") == 0 && s.lastIndexOf("}") == s.length - 1) {isObj = true}
            if (s.indexOf("[") == 0 && s.lastIndexOf("]") == s.length - 1) {isObj = true}
            if(isObj){s = JSON.parse(s)}
            key = key.substring(prefixLen,key.length);
            items[key] = s;
          }
        }
        return items;
      },
      removeItems : function(module) {
        if(!_support){return}
        for (var key in localStorage) {
          if (key.indexOf(module + ".") == 0) {
            localStorage.removeItem(key);
          }
        }
      },
      removeItem : function(module, key) {
        if(!_support){return}
        localStorage.removeItem(module + "." + key);
      },
      clear : function() {
        if(_support){
          var ud=CC.localstorage.getItem("u","domain");
          var ut=CC.localstorage.getItem("u","min");
          localStorage.clear();
          if(ud){
            CC.localstorage.setItem("u","domain",ud);
            CC.localstorage.setItem("u","domain",ut);
          }
        }
      },
      loadData : function(module, data, errHandle) {
        if(!_support){return}
        try {
          for (var key in data) {
            var s = (typeof data[key] == "object") ? JSON.stringify(data[key]) : data[key];
            localStorage.setItem(module + "." + key, s);
          }
        } catch (e){console.err(e);errHandle && errHandle()}
      }
    }
    CC.localstorage=_localstorage;
  }
})();
CC.setPAppMenu=function(menuId){var m=CC.$(menuId);if(m){m.className="ccLI ccShade"}}
CC.communityLink=function(type,cx) {
  function _url(pg,tg){return "q?pg="+pg+"&tg="+tg}
  var u="";
  if(type=="51"){u=_url("offices_welcome","OfficeWelcome")}
  else if(type=="23"){u=_url("classes_welcome","ClassWelcome")}
  else if(type=="5"){u=_url("clubs_welcome","ClubWelcome")}
  else if(type=="45"){u=_url("committees_welcome","CommitteeWelcome")}
  else if(type=="27"){u=_url("departments_welcome","DepartmentWelcome")}
  else if(type=="26"){u=_url("divisions_welcome","DivisionWelcome")}
  else if(type=="85"){u=_url("gCommunities_welcome","GCommunityWelcome")} 
  else if(type=="22"){u="q?pg=home_welcome"}
  else {return "q?pg=contextHome&cx=u"}
  if(cx.indexOf('cx=')!=0){cx="cx="+cx}
  return u+"&"+cx;
}
CC.community=function(type,cx){location.href=CC.communityLink(type,cx)}
CC.loading=function(){return "<div class='cc-loading'></div>"};
CC.loadingBox=function(){return "<div style='position:relative'><div class='cc-box cc-padding cc-loading' style='position:absolute'></div></div>"};
CC.initDropdown=function(selector){
  $(selector).on("click", "a", function(event) {
    var ctrl = null, id, $that = $(this);
    if (!$(this).hasClass("disabled")){
      var $list = $(this).closest("ul.cc-js-dropdown");
      $list.find("li.active").removeClass("active");
      $(this).parent().addClass("active");
      ctrl = $list.data("ccCtrl"), id = $(this).attr("href").replace(/#/,"");
    }
    event.preventDefault();
    setTimeout(function(){
      if (ctrl != null) {
        if(typeof(eval(ctrl))=="function"){window[ctrl].call(null,id,$that)} 
        else{console.log("function not defined : " + ctrl)}
      }},1);
  });
}


// ccPersonalApps.js
function ccPersonalAppPref(appId){"q?pg=papp&a=preferences&v="+appId+"&cx=u"}
function ccSendEmail(tk){ccComposerWin("em2PageServlet?cx=u&pg=wcompose&cmd=sendItem&tk="+tk);}
function ccPAppURL(id){return (id=="email")?"emPageServlet?pg=papp&a=email&cx=u":"q?pg=papp&a="+id+"&cx=u";}
function ccPApp(id){if(id!=''){location.href=ccPAppURL(id)}}
var ccMailObj, ccComposerProp="width=720,height=600,resizable,status,scrollbars";
function ccComposeEmail(recipients,secKey,subject,tracking,bcc) {
  var composeURL="em2PageServlet?cx=u&pg=wcompose", extComposeURL = "";
  if(typeof(ccExtComposeURL)!='undefined' ){extComposeURL=ccExtComposeURL;}
  if(extComposeURL!=""&&!secKey){composeURL = extComposeURL;}
  if(arguments[0]){
    if(extComposeURL!=""&&!secKey){composeURL += "&to="+recipients}  // gmail
    else{ccMailObj=new Object();ccMailObj.to=recipients; ccMailObj.trackingMailinglist=recipients;} // default
  }else{ccMailObj=null}
  if(arguments[1]&&arguments[1]!=""){composeURL+="&h="+secKey;}
  if(arguments[2]){if(extComposeURL!=""&&!secKey){composeURL+="&su="+subject;}else{ccMailObj.subject=subject;}}
  if(arguments[3]&&arguments[3]!=""&&extComposeURL==""){composeURL+="&trk="+tracking;}
  if(arguments[4]&&arguments[4]!=""){
    if(extComposeURL!=""&&!secKey){composeURL += "&bcc="+bcc;}  // gmail
    else{
      if(ccMailObj==null){ccMailObj=new Object()}
      ccMailObj.bcc=bcc;
     } // default
  }
  ccComposerWin(composeURL);
}
function ccComposerWin(url){ccPopupFocus(window.open(url,"compos-"+(new Date()).getTime(),ccComposerProp))}
function ccExtEmail(url){ccPopupFocus(window.open(url,"_ext_email","width=800,height=600,resizable,status,scrollbars"))}

//ccAside.js
if(typeof($)!="undefined"){
(function($) {
  if(typeof($.fn.ccAslide) == "undefined") {
    var CCASLIDE_INSTANCES={}, _aslide={}, BACKDROP_TPL='<div class="cc-aside-backdrop"></div>';
    var CCAslide=function(aslideEL,option){
      this.EL = aslideEL;
      this.options = option;
      this.init();
    }
    function _slideOut(obj){
      var pl=obj.options.placement;
      var css={"zIndex":CC.zIndex()}; css[pl]=(0 - obj.options.width) + "px";
      var ani={}; ani[pl]=0;
      obj.EL.addClass(pl+" cc-aside-"+pl).css(css).show().animate(ani,obj.options.duration);
      obj.isShown=true;
      $('html,body').addClass('cc-scroll-lock');
      if(obj.options.backdrop){$(".cc-aside-backdrop").show()}
    }
    function _event(o){
      var $el=o.EL;$dismiss=$el.find("[data-cc-dismiss='aside']"),act="ccAslide.complete";
      $dismiss.off("click");
      $dismiss.on("click",function(e){o.hide();e.preventDefault()});
      $el.off(act);
      if(o.options.onCompleted){$el.on(act,function(e,ret){o.complete(ret)})}
      else{$el.on(act,function(e){o.hide()})}
    }
    function _loadURL(st,sl,sliding){
      var _callback = function(txt){
        st.EL.html(txt);_event(st);
        if(st.options.onShow && typeof st.options.onShow=='function'){st.options.onShow()}
      }
      st.EL.html(CC.loading());if(sliding){_slideOut(st)}
      CC.ajax({url:sl.options.templateUrl,success:_callback});
    }
    CCAslide.prototype={
      init:function(){
        var sl=this, st=this;
        if(sl.options.backdrop){
          if($(".cc-aside-backdrop").length==0){
            $("body").append(BACKDROP_TPL);
            if(sl.options.backdrop){$(".cc-aside-backdrop").on("click",$.proxy(sl.hide,sl))}
          }
        }
        if(sl.options.templateUrl){
          _loadURL(st,sl,true);
        } else {
          if(st.options.onShow && typeof st.options.onShow=='function'){st.options.onShow()}
          _slideOut(st);_event(st);
        }
      },
      show:function(){
        var sl=this, st=this;
        if(!sl.isShown || sl.options.reload){
          if(sl.options.templateUrl){_loadURL(st,sl,false)}
          sl.EL.css({"zIndex":CC.zIndex()});
          if(!sl.isShown){_slideOut(sl)}else{_event(sl)}
        }else{sl.EL.css({"zIndex":CC.zIndex()});_event(sl)}
      },
      hide:function(){
        var sl=this, opt=sl.options, $el=sl.EL;
        if(opt.onClose && typeof opt.onClose=='function'){opt.onClose()}
        if(opt.reload){delete CCASLIDE_INSTANCES[$el.prop("id")]}
        $(".cc-aside-backdrop").hide();
        var ani={}; ani[opt.placement] = (0 - opt.width) + "px";
        $el.animate(ani, opt.duration, function(){$el.hide()});
        sl.isShown=false;
        $('html, body').removeClass('cc-scroll-lock');
      },
      complete:function(ret){
        var sl=this, fn=sl.options.onCompleted;
        if(fn && typeof fn=='function'){fn.call(null,ret)}
        sl.hide();
      }
    };
    CCAslide.default={
      backdrop:false,
      duration:500,
      onClose:null,
      onCompleted:null,
      onShow:null,
      placement:'right',
      reload:true,
      templateUrl:null,
      width:340
    }
    $.fn.ccAslide = function(option) {
      if(this.length==0){throw new Error("Aside target element is not exist.\n " + option)}
      var id=this.prop("id");
      if(id==null){id=ccGetRandomString(3);this.prop("id",id)}
      var sl=CCASLIDE_INSTANCES[id],options=$.extend({},CCAslide.default,option);
      if(sl){
        if(typeof arguments[0] == 'string'){
          if(option=="hide"){sl.hide()}
          else if(option=="complete"){sl.complete(arguments[1])}
        }else{sl.show()}
      }else if(typeof option == 'object'){
        CCASLIDE_INSTANCES[id]=(sl=new CCAslide(this,options));
        _aslide[id]=options;
      }
    }
  }
  CC.aslide={
    show:function(obj){
      if ($(obj.id).length==0){$("<div class='cc-aside' id='" + obj.id + "'></div>").appendTo("body")}
      $("#"+obj.id).ccAslide(obj);
    },
    hide:function(id){var $obj=$("#"+id);if($obj.length){$obj.ccAslide("hide")}},
    complete:function(id,ret){var $obj=$("#"+id);if($obj.length){$obj.ccAslide("complete",ret)}}
  }
  var ccPlugin = function(element, options) {
    this.cfg = options;
    this.$element = $(element);
    this.cfg = {
      header: false,
      title: '',
      content: '',
      hasMask: true,
      btnText: 'Ok',
      btnConfirmText: 'Ok',
      btnCancelText: 'Cancel',
      hasCloseBtn: false
    };
    this.handlers = {};
  };
  ccPlugin.prototype = {
    init: function(cfg) {
      var CFG = $.extend({}, this.cfg, cfg), dialogTitle, footer;
      switch (CFG.winType) {
        case 'alert':
          dialogTitle = "Alert";
          footer = '<button class="cc-btn cc-primary cc-callback cc-btn-alert">' + CFG.btnConfirmText + '</button>';
          break;
        case 'confirm':
          dialogTitle = "Confirm";
          footer = '<button class="cc-btn cc-primary cc-callback"><i class="ci ci-ok" aria-hidden="true"></i> ' + CFG.btnConfirmText + '</button>' +
            '<button class="cc-btn2 cc-btn-cancel cc-btn-alert cc-spacer-left cc-cancel"><i class="ci ci-delete" aria-hidden="true"></i> ' + CFG.btnCancelText + '</button>';
          break;
      };
      var modalId="modal-" + ccGetRandomString(3);
      var $alertBox = $(
        '<div class="modal cc-modal cc-confirm" tabindex="-1" role="dialog" id="' + modalId + '" aria-label="' + dialogTitle +'">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-body">' +CFG.content + '</div>' +
            '</div>' +
            '<div class="modal-footer">' + footer + '</div>' +
          '</div>' +
        '</div>');
      var that = this;
      if (CFG.header) {
        var title = CFG.title!=""?CFG.title:"";
        var $alertHeader=$("<div class='modal-header'><h4 class='modal-title'>"+title+"</h4></div>");
        var $alertBody=$alertBox.find(".modal-content");
        $alertHeader.insertBefore($alertBody);
        if (CFG.hasCloseBtn) {$('<a href="#" class="modal-close ci ci-close" data-dismiss="modal" aria-title="Close"></a>').appendTo($alertHeader)}
      }
      $alertBox.appendTo('body');
      $("#" + modalId).on("shown.bs.modal", function () {
        $('#' + modalId +' .cc-callback').on("click", function() {
          that.addTrigger('alert');
          $("#"+modalId).modal("hide");
        }).focus();
        $('#' + modalId +' .cc-cancel').on("click", function() {
          that.addTrigger('cancelAlert');
          $("#"+modalId).modal("hide");
        });
      }).modal("show");
      if (CFG.handlerAlertBtn){that.addListener('alert', CFG.handlerAlertBtn)};
      if (CFG.handlerCancelAlertBtn){that.addListener('cancelAlert', CFG.handlerCancelAlertBtn)};
      return this;
    },
    addListener: function(eventName, handler) {// Used for binding to monitor an event
      if (typeof this.handlers[eventName] == 'undefined') {
        this.handlers[eventName] = [];
      };
      this.handlers[eventName].push(handler);
    },
    addTrigger: function(eventName, func) {// Trigger custom event
      if (this.handlers[eventName] instanceof Array) {
        var handlers = this.handlers[eventName];
        for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](func);
        }
      }
    }
  };
  $.fn.extend({
    ccAlert: function(cfg) {
      var alertCase = new ccPlugin();
      var $cfg = $.extend({}, this.cfg, cfg, {winType:'alert'});
      return alertCase.init($cfg);
    },
    ccConfirm: function(cfg) {
      var alertCase = new ccPlugin();
      var $cfg = $.extend({}, this.cfg, cfg, {winType:'confirm'});
      return alertCase.init($cfg);
    }
  });
  CC.layer={
    _list:[],
    _cid:null,
    _getObj:function(list,id){
      for(var i=0;i<list.length;i++){
        var _o=list[i];
        if (_o.id==id){return _o}
      }
    },
    show:function(obj){ // {id:"[panel id]",containerId:[parent panel Id. (optional)],html:"[html code]", url:"[page url", onCompleted:[to do]}
      function _load(html,$pl){
        $pl.html(html).show().attr("aria-hidden","false").attr("aria-live","polite").data("containerId", cid);
        $pl.find("[data-cc-dismiss='close']").on("click",function(e){CC.layer.close();e.preventDefault()});
      }
      var cid,$panel;
      if (CC.layer._cid==null){
        cid=(typeof(obj.containerId)=="string")?obj.containerId:"ccTgArea";
        CC.layer._cid=cid;
      }else{cid=CC.layer._cid}
      var $cid="#" + cid, $container=$($cid), id=obj.id, $id="#"+id;
      for (var k in CC.layer._list){
        var s=CC.layer._list[k];
        if(typeof(s)=="string"){$(s).addClass("hide")}
      }
      if(CC.layer._list.length==0){
        if(cid=="ccNavBody"){$("#ccSystemHeadline").hide()}
        else if(cid=="ccTgArea"){$("#ccNavInfo").hide()}
        $container.hide().attr("aria-hidden","true");
      }else{
        var lastId=CC.layer._list.slice(-1)[0].id;
        $("#"+lastId).hide().attr("aria-hidden","true")
      }
      if ($($id).length){
        $panel = $($id);
        var _list = CC.layer._list, existingObj=this._getObj(_list,id);
        _list = jQuery.grep(_list,function(_o){return _o != existingObj});
        CC.layer._list = _list;
      } else {
        $panel = $("<div id='" + id + "'></div>").insertAfter($cid);
      }
      if(obj.html){_load(obj.html,$panel)}
      else if(obj.url){
        $panel.html(CC.loading()).show();
        CC.ajax({url:obj.url,success:function(resp){_load(resp,$panel)}})
      }
      CC.layer._list.push(obj);
    },
    close:function(){
      var obj,id,_list=CC.layer._list;
      if (arguments.length==1) {
        id=arguments[0];
        obj=this._getObj(_list,id);
      } else {obj=_list.pop()}
      if(!obj) {return} else {id=obj.id}
      var $panel=$("#" + id);
      if($panel.length>0){
        $panel.remove();
        _list = jQuery.grep(_list,function(_o){return _o != obj});
        CC.layer._list = _list;
        if(_list.length==0){
          CC.layer.showContainer();
        }else{
          var lastObj=_list.slice(-1)[0];
          $("#"+lastObj.id).show().attr("aria-hidden","false")
        }
      }
    },
    showContainer:function(){
      var cid=CC.layer._cid;
      $("#" + cid).show().attr("aria-hidden","false");
      if(cid=="ccNavBody"){$("#ccSystemHeadline").show()}
      else if(cid=="ccTgArea"){$("#ccNavInfo").show()}
      CC.layer._cid=null;CC.layer._list=[];
    },
    closeAll:function(){
      var obj, id, $panel, _list=CC.layer._list;
      while(_list.length>0){
        obj=_list.pop();
        if(obj){
          id=obj.id, $panel=$("#" + id);
          if($panel.length>0){$panel.remove()}
        }
      }
      CC.layer.showContainer();
    },
    complete:function(ret){
      var obj=CC.layer._list.slice(-1)[0];
      if(obj.onCompleted){obj.onCompleted.call(null,ret)}
      CC.layer.close();
    },
    isOpen:function(id){
      for (var i=0; i<CC.layer._list.length; i++) {
        var o=CC.layer._list[i];
        if(o.id && o.id==id){return true}
      }
      return false;
    }
  }
  $(document).ready(function(){$("ul[data-cc-ctrl]").each(function(idx,el){CC.initDropdown(el)})});
})($);
}

function readAnnDetail(announcementId){
  var data = {annId:announcementId,cmd:"getDetail"};
  var $side = $("#ann-side-panel");
  if (!$side.length) {
    $("body").append("<div class='cc-aside right cc-aside-right' id='ann-side-panel' style='max-width: 550px;width: 100%;'></div>");
  }
  function showPanel(){
    $("#ann-side-panel").ccAslide({});
  }
  function _callback(resp){
    $("#ann-side-panel").html(resp);
    $("#dropann-checker-btn").hide();
    showPanel();
    $("#ann-detail-close-btn").on('click',function(e){
      e.stopPropagation();
      $("#ann-side-panel").ccAslide('hide');
    });
  }
  CC.ajax({url:"DataServlet?pg=AnnEdit-ajax-data&"+ ccContextId,data:data,success:_callback});
}

function gotoCalDetail(cx,evtId,sd) {
  url = 'q?pg=Calendar-eventDetail2&cmd=load&cx='+cx+'&id='+evtId+'&sd='+sd;
  openWin('EventDetail',url,460,360,'scrollbars=yes');
}

function gotoSpecAnnDetail(id){
  openWin("SpecialAnn","q?pg=view_special_announcement&id="+id+"&l=1","530","330","resizable,scrollbars");
}

CC.snackbar={
  show:function(data){ //{content: msg,timeout: 10000,status: msgType}; status:success/warning/error
    var $sb=$(".cc-snackbar");
    if($sb.length==0){
      $sb=$("<div class='cc-snackbar' role='alert'>")
        .append("<div class='cc-snackbar-body'></div>")
        .append("<a href='#' class='ci ci-close cc-btn2 cc-snackbar-close' title='Close'><div class='sr-only'>Close</div></a>").appendTo("body");
      $(".cc-snackbar-close").on("click",function(event){CC.snackbar.hide();event.stopPropagation()});
    }
    $sb.find(".cc-snackbar-body").html(data.content);
    if(data.status){$sb.addClass(data.status)}
    var t=(data.timeout)?data.timeout:5000;
    $sb.addClass('is-active');
    $sb.css({"zIndex":CC.zIndex()});
    setTimeout(function(){$sb.removeClass('is-active')}, t);
  },
  hide:function(){$(".cc-snackbar").attr("class","cc-snackbar")}
}
CC.string = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function ccGetRandomString(len){/* random string of len length */
  var s="";
  for (var i=0;i<len;i++){s += CC.string.charAt(Math.round(61*Math.random()))}
  return s;
}

(function(){
if (typeof(CC.param) == "undefined") {
  var _param={
    get:function(key,source,defaultVal){
      var s=key+"=", i=source.lastIndexOf('#'), ret="";
      if(i!=-1){source=source.substring(0,i);}
      var begin=source.indexOf(s);
      if (begin>-1){
        var end=source.indexOf("&", begin);
        if (end==-1){end=source.length}
        return source.substring(begin+key.length+1,end);
      } else {
        if(typeof(defaultVal)=='undefined'){defaultVal=null;}
        return defaultVal;
      }
    },
    list:function(s){
      var l=[], a=s.split("&"), idx, k, v;
      for (var i=0;i<a.length;i++){
        idx=a[i].indexOf("=");k=a[i].substring(0,idx);v=a[i].substring(idx+1);l[k]=v;
      }
      return l;
    },
    set:function(source,key,value){
      var a=CC.param.list(source),s;
      a[key]=value;
      for (var i in a) {
        if(typeof(a[i])!="function"){if(s){s+="&"}else{s=""};s+=i+"="+a[i];}
      }
      return s;
    } 
  }
  CC.param=_param;
}
})();
function ccGetParameterList(s){return CC.param.list(s)}
function ccGetParameter(key,source,defaultVal){return CC.param.get(key,source,defaultVal)}
CC.rwdTable=function($obj,def){
  function _rwd($obj,def) {
    if (CC.isSmallDevice){$obj.footable(def);$(window).off("resize."+id)}
  }
  function _resize(){
    var path="/lib/footable/";
    CC.style.link(path+"css/footable.bootstrap-cc.min.css");
    CC.js(path+"js/footable.min.js",function(){_rwd($obj,def)});
  }
  var id=$obj.get(0).id;
  if(id==null){id=ccGetRandomString(3);$obj.get(0).id=id}
  if(CC.isSmallDevice){_resize()}
  if(!CC.isDevice){$(window).on("resize."+id,_resize)}
}
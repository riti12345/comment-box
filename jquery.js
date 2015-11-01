(function() {
var buttonPrefix = "+";
var buttonTag = "button";
var categoryTag = "category";
var commandTag = "cmd";
var confirmTag = "confirm";
var displayTag = "display";
var errorTag = "error";
var linkedTag = "linked";
var nameTag = "name";
var originalTag = "url";
var passTag = "pass";
var policyTag = "policy";
var quietTag = "quiet";
var reasonTag = "reason";
var redirectTag = "redirect";
var renderTag = "render";
var resetTag = "reset";
var resultTag = "result";
var stageTag = "stage";
var statusTag = "status";
var versionTag = "version";
var webServerTag = "webServer";

var noOriginalValue = "<none>";

var webFilesDir = "/bg/";
var cgiFilesDir = "/cgi-bin/";
var displayUrl = "original.html";
var builtinServer = true;

var webServer;
if (!webServer)
   webServer = window.location.protocol + "//" + window.location.host;
var cgiCmdName   = "cmd.pl";
var cgiCmdPrefix = builtinServer ? ""  : cgiCmdName + "?" + commandTag + "=";
var cgiCmdSuffix = builtinServer ? "?" : "&";
var buttonCGI = "button";
var notifyCGI = "notify";
var redirectCGI = "redirect";

var closeModeDefault = 1;
var closeMode = 2;
var iframeMinHeightDefault = 100;
var iframeMinHeight = iframeMinHeightDefault;
var bailoutOpenerDefault = false;
var bailoutOpener = bailoutOpenerDefault;
var bailoutCrossDomainDefault = 0;
var bailoutCrossDomain = bailoutCrossDomainDefault;
var bulletinDelayDefault = 2000;
var bulletinDelay = -1;
var renderDelayDefault = 1000;
var renderDelay = renderDelayDefault;
var notifyBailoutDefault = true;
var notifyBailout = notifyBailoutDefault;
var notifyBailoutActionRenderDefault = 3;
var notifyBailoutActionRender = notifyBailoutActionRenderDefault;
var notifyBailoutActionNonRenderDefault = 1;
var notifyBailoutActionNonRender = notifyBailoutActionNonRenderDefault;
var reasonPassUpDefault = false;
var reasonPassUp = reasonPassUpDefault;

var bulletinIncluded = false;
var version;var noSize;var fullBulletin;var originalUrl;var searchTags=new Array();var directDelivery;var linked;var bdiv;var oiframe;var display;var displayUrl;var bulletinRendered=false;var bulletinHeight=0;var opera=navigator.userAgent.indexOf("Opera")>=0;var namePrefix="";var bulletinPrefix="__BULLETIN__";var bulletinForm=bulletinPrefix+"bulletinForm";var bulletinDiv=bulletinPrefix+"bdiv";var bulletinJS=false;var bulletinIncluded=true;function parseDbcli(h){var a=new Object();a.nf=false;a.dup=false;a.err="";a.text="";if(!h){h=""}var c=h.split("\n");for(var e=0;e<c.length;e++){var b=c[e];var g=b.charAt(0);if(g==":"||g=="!"){for(var d=1;d<b.length&&b.charAt(d)>" ";){d++}var f=b.substring(1,d);if(f=="NF"){a.nf=true}else{if(f=="DUP"){a.dup=true}else{if(f=="ERR"||f=="INT"){while(d<b.length&&b.charAt(d)<=" "){d++}if(a.err){a.err+="\n"}a.err+=b.substr(d)}}}}else{if(b.length>0){if(a.text){a.text+="\n"}a.text+=b}}}return a}function parseUrl(f){var d=new Array();var a=f.split("&");var c=0;for(var e=0;e<a.length;e++){var b=a[e].indexOf("=");var g=new Array();if(b>=0){g[0]=a[e].substr(0,b);g[1]=decodeURIComponent(a[e].substr(b+1).replace(/\+/g," "))}else{g[0]=a[e];g[1]=""}if(g[0].length>0){d[c++]=g}}return d}function getTag(){var c,b,a,d;if(arguments.length>1){b=arguments[0];a=arguments[1]}else{b=searchTags;a=arguments[0]}for(c=0;c<b.length;c++){d=b[c];if(d[0]==a){break}}return c<b.length?b[c][1]:null}function getXhrObject(){var a=false;if(window.XMLHttpRequest){a=new XMLHttpRequest()}else{if(window.ActiveXObject){try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){a=false}}}}return a}function loadXML(f,b,c,d,e){var a=getXhrObject();if(!a){b(a,f);return}if(d){a.onreadystatechange=function(){if(a.readyState==4){b(a,f)}}}if(c){a.open("GET",f,d)}else{a.open("POST",f,d);a.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}a.send(e);if(!d){b(a,f)}}function buildCGI(c){var a=webServer+cgiFilesDir+cgiCmdPrefix+c;var d=cgiCmdSuffix;for(var b=1;b<arguments.length;b++){if(arguments[b]&&arguments[b].length>0){a+=d+arguments[b];d="&"}}return a}function originalTags(c,g){var a="";var e="";var d=false;for(var b=0;b<searchTags.length;b++){var f=searchTags[b];if(f[0]!=originalTag){a+=e+f[0]+(f[1]?"="+encodeURIComponent(f[1]):"");e="&";if(!d&&f[0]==linkedTag){d=true}}}if(g&&!d){a+=e+linkedTag;e="&"}if(c!=null){a+=e+originalTag+(c.length?"="+encodeURIComponent(c):"")}return a}function noBulletin(b){if(display){alert("Bulletin cannot render: "+(b?b:"reason unknown"));if(!bulletinJS){self.location.replace(originalUrl)}}else{if(notifyBailout){var a=buildCGI(redirectCGI,renderDelay>=0&&notifyBailoutActionRender>1?statusTag+"="+(notifyBailoutActionRender-1):"",renderDelay<0&&notifyBailoutActionNonRender>1?resetTag+"=true":"",b?reasonTag+"="+encodeURIComponent(b):"",reasonPassUp?passTag+"=true":"",originalTags(bulletinJS?noOriginalValue:originalUrl));if(bulletinJS){new Image().src=a}else{self.location.replace(a)}}else{if(!bulletinJS){if(directDelivery){self.location.reload(1)}else{self.location.replace(originalUrl)}}}}}function isUri(b){var a=/^[a-z][a-z0-9+.\-]*:/i;return a.test(b)}function isHttp(a){return a.substr(0,7).toLowerCase()=="http://"||a.substr(0,8).toLowerCase()=="https://"}function webPath(a){if(!isHttp(a)){if(a.charAt(0)!="/"&&webFilesDir){a=webFilesDir+a}if(webServer){a=webServer+a}}return a}function detectMobile(d,c){return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(d)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(d.substr(0,4)))}var isMobileResult=-1;function isMobile(){if(isMobileResult==-1){isMobileResult=detectMobile(navigator.userAgent||navigator.vendor||window.opera)}return isMobileResult}function setCSS(a){a=webPath(a);if(document.createStyleSheet){document.createStyleSheet(a,0)}else{var b=document.createElement("link");b.rel="stylesheet";b.type="text/css";b.href=a;document.getElementsByTagName("head")[0].appendChild(b)}}function setBulletinHeight(){if(bdiv.style.zIndex!=""){bulletinHeight=0}else{bulletinHeight=bdiv.offsetHeight+bdiv.offsetTop}}function doRenderBulletin(){new Image().src=buildCGI(notifyCGI,statusTag+"=0",originalTags(null));renderDelay=-1}function getWinHeight(){var a=480;if(typeof(window.innerHeight)=="number"){a=window.innerHeight}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){a=document.documentElement.clientHeight}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){a=document.body.clientHeight}}}return a}function getWinWidth(){var a=640;if(typeof(window.innerWidth)=="number"){a=window.innerWidth}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){a=document.documentElement.clientWidth}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){a=document.body.clientWidth}}}return a}function resizeIFrame(){if(bulletinHeight==-1){oiframe.height=getWinHeight()}else{setBulletinHeight();oiframe.height=getWinHeight()-bulletinHeight}}function renderBulletin(){if(!bulletinRendered){bulletinRendered=true;bdiv.style.visibility="visible";if(renderDelay==0){doRenderBulletin()}else{if(renderDelay>0){setTimeout(doRenderBulletin,renderDelay)}}if(typeof(afterRender)=="function"){afterRender()}}}function getUrlOf(a){var c=null;if(a){try{c=a.contentWindow.location.href}catch(b){if(a.src){c=a.src}}}return c}var lastTitle=null;var iframeLoading=0;function iframeLoad(){if(!iframeLoading){return}var a=oiframe?getUrlOf(oiframe):null;if(bailoutCrossDomain&&renderDelay>=0){if(!a&&!display){return noBulletin("cross-domain")}if(bailoutCrossDomain>0){bailoutCrossDomain--}}if(iframeLoading==1){iframeLoading=2;if(bulletinDelay!=0){renderBulletin()}}if(oiframe){var c=null;try{if(oiframe.contentDocument){c=oiframe.contentDocument.title}else{c=oiframe.Document.title}}catch(b){c=null}if(c&&c!=lastTitle){document.title=lastTitle=c}if(a){originalUrl=a}}if(typeof(afterIframeLoad)=="function"){afterIframeLoad()}}function load(){if(bailoutOpener&&self.opener){return noBulletin("In pop-up")}if(opera&&parseInt(navigator.appVersion)==6){return noBulletin("Opera version")}document.body.rightMargin=0;document.body.leftMargin=0;document.body.bottomMargin=0;if(!noSize&&!fullBulletin){self.onresize=resizeIFrame}bdiv=document.getElementById("bdiv");oiframe=document.getElementById("oiframe");if(!bdiv){top.location.replace(originalUrl);return}if(!fullBulletin){document.body.scroll="no";if(!noSize){setBulletinHeight()}if(oiframe){oiframe.hspace=0;oiframe.vspace=0;if(!noSize){var a=getWinHeight()-bulletinHeight;if(iframeMinHeight>0&&a<iframeMinHeight){return noBulletin("Window too small")}oiframe.height=a}iframeLoading=1;if(opera){oiframe.src=buildCGI(redirectCGI,originalTag+"="+encodeURIComponent(originalUrl))}else{oiframe.contentWindow.location.replace(originalUrl)}}}if(bulletinDelay==0||fullBulletin){renderBulletin()}else{if(bulletinDelay>0){setTimeout(renderBulletin,bulletinDelay)}}if(typeof(afterLoad)=="function"){afterLoad()}return true}function getDisplayUrl(){return webPath(displayUrl)}function bulletinSetup(b){searchTags=parseUrl(b);if(!display){if(getTag(displayTag)!=null){display=true}}if(!linked){if(getTag(linkedTag)!=null){linked=true;var d=self.location.pathname;var a=d.lastIndexOf("/");if(a>=0&&d.substr(a)=="/index.html"){d=d.substr(0,a);a=d.lastIndexOf("/");if(a>=0){namePrefix=d.substr(a+1)+": "}}}}if(!display&&!linked&&!directDelivery&&getTag(policyTag)==null){display=true}originalUrl=getTag(originalTag);if(originalUrl==null){if(directDelivery){originalUrl=display?getDisplayUrl():window.location.href}else{if(linked){fullBulletin=true}else{originalUrl=getDisplayUrl()}}}if(!bulletinJS&&!version){version=getTag(versionTag);if(!version||parseInt(version)==NaN){version=2}}var c=getTag(renderTag);if(c=="false"||linked||display){renderDelay=-1}}function bulletinInit(a){directDelivery=false;renderDelay=-1;if(!a){a=window.location.search.substring(1)}bulletinSetup(a)}function nesting(a){directDelivery=(a!="<$bt>");if(!directDelivery){a=window.location.search.substring(1)}bulletinSetup(a);if((navigator.userAgent.indexOf("iPhone")>=0||navigator.userAgent.indexOf("iPad")>=0)&&navigator.userAgent.indexOf("Safari")<0){return noBulletin("iOS app")}var c=false;try{if(parent!=self){c=true}}catch(b){c=true}if(c){noBulletin("Nested")}else{window.onload=load}return c}function dragOBJ(k,j){var g;var c;var l;var b;var m;function a(d){return(Math.max(navigator.userAgent.toLowerCase().indexOf(d),0))}function h(n){if(!m){var d,o;if(a("msie")){d=event.clientX;o=event.clientY}else{d=n.clientX;o=n.clientY}k.style.right=(l+g-d+"px");k.style.bottom=(b+c-o+"px")}}function f(){m=1;document.onmousemove=null;document.onmouseup=null;document.onselectstart=null;oiframe.style.visibility="visible"}if(a("msie")){g=event.clientX;c=event.clientY}else{g=j.clientX;c=j.clientY}l=parseInt(k.style.right);b=parseInt(k.style.bottom);oiframe.style.visibility="hidden";document.onmousemove=h;document.onmouseup=f;document.body.focus();document.onselectstart=function(){return false};return false}function anchor(b,d){var c=b.indexOf("#");var a=d.indexOf("#");if(c!=-1&&c==a&&b.substr(0,c)==d.substr(0,a)){return true}else{return false}}function loadInParent(){var a=getUrlOf(oiframe);if(a&&iframeLoading>1&&!opera&&!anchor(originalUrl,a)){parent.location=a}else{if(display){parent.location=originalUrl}else{parent.location.reload(1)}}}function maximizeIFrame(){bdiv.style.display="none";bulletinRendered=true;oiframe.height=getWinHeight();bulletinHeight=-1}function closeBulletin(){if(bulletinJS){bdiv.parentNode.removeChild(bdiv)}else{if(bdiv&&!fullBulletin&&directDelivery){switch(closeMode){case 1:loadInParent();break;case 2:maximizeIFrame();break}}else{if(directDelivery&&!display){self.location.reload(1)}else{if(originalUrl){top.location=originalUrl}else{window.open(location,"_self").close();self.close()}}}}}function findFormTag(c,a){for(var b=0;b<c.elements.length;b++){var d=c.elements[b];if(d.name==a){return d}}return null}function displayFormTags(c){var b="";for(var a=0;a<c.elements.length;a++){var d=c.elements[a];b+=", "+d.name+" = "+d.value}return b}function addFormTag(b,a,c){var d=findFormTag(b,a);if(!d){d=document.createElement("input");d.type="hidden";d.name=a;b.appendChild(d)}d.value=c?c:""}function buttonOk(){if(display){alert("Button does not function in preview");return false}else{return true}}function getButtonName(a){if(namePrefix.substr(0,nameTag.length+1)==nameTag+"="){namePrefix=decodeURIComponent(namePrefix.substr(nameTag.length+1))}return namePrefix+a}function doCgi(e,b){if(!buttonOk()){return}var d=document.getElementById(bulletinForm);if(e.substr(0,webServer.length)==webServer){e=e.substr(webServer.length)}if(e.substr(0,cgiFilesDir.length)==cgiFilesDir){e=e.substr(cgiFilesDir.length)}var c=e.indexOf("?");if(c>=0){var f=e.substr(c+1);e=e.substr(0,c);var a=parseUrl(f);for(c=0;c<a.length;c++){var g=a[c];if(g[0]!=commandTag&&g[0]!=buttonTag&&g[0]!="web"){addFormTag(d,g[0],g[1])}}}addFormTag(d,commandTag,e);if(b){addFormTag(d,buttonTag,getButtonName(b))}addFormTag(d,"web",webFilesDir);d.action=buildCGI((b?buttonPrefix:"")+e);d.submit();if(d.target){setTimeout(closeBulletin,100)}return false}function sendButton(a){if(!display&&a){new Image().src=buildCGI(buttonCGI,nameTag+"="+encodeURIComponent(getButtonName(a)),originalTags(noOriginalValue))}}function doClose(a){sendButton(a);setTimeout(closeBulletin,100);return false}function doNav(b,a){sendButton(a);setTimeout(function(){window.location=b},100);return false}function doPrint(a){sendButton(a);setTimeout(window.print,100);return false}function doButton(a,b,c){sendButton(a);b(c);return false}function buttonEvent(c,a,b){if(c!=null){setTimeout("window.status = '"+c+"';",0)}if(a&&b&&document.images&&document.images[a]&&document.images[a].src!=b){document.images[a].src=b}return true}var buttonImgClass="";function setButtonClass(a){if(a){buttonImgClass=' class="'+a+'"'}else{buttonImgClass=""}}var formDone=false;var buttonNum=0;var html;var buttons=new Array();function makeButton(s,d,f,l,b,q){var h="";var k="button"+buttonNum++;var n=bulletinPrefix+k;var r,a=false,c=false;if(f.charAt(0)=="!"){a=true;f=f.substring(1)}else{if(f.charAt(0)=="~"){c=true;f=f.substring(1)}}if(d=="Cgi"&&!formDone){h+='<div style="display:none;">\n';h+='<form id="'+bulletinForm+'" action="" method="post"'+(a?"":' target="_blank"')+">\n";for(r=0;r<searchTags.length;r++){var e=searchTags[r];if(e[0]!=originalTag&&e[0]!=buttonTag){h+='<input type="hidden" name="'+e[0]+'" value="'+e[1].replace(/"/g,'\\"')+'" size="0">'}}if(a&&originalUrl){h+='<input type="hidden" name="'+originalTag+'" value="'+originalUrl.replace(/"/g,'\\"')+'" size="0">'}h+="</form></div>\n";formDone=true}if(l||q){var g;var j;var m;if(l.charAt(0)=="!"){g=l.substr(1)}else{j=l.split(",",2);l=webPath(j[0]);if(j.length>1){m=webPath(j[1]);new Image().src=m}else{m=l}}if(q){h+="<area"}else{h+="<a"}h+=' id="'+n+'"';if(d=="Nav"){var o;if(f.substr(0,11).toLowerCase()=="javascript:"){o=a=true;f=f.substr(11).replace(/"/g,'\\"')}var p=o?"#":isUri(f)?f:webPath(f)+"?"+originalTags(a?originalUrl:null,true);h+=' href="'+(display||o?p:buildCGI(buttonCGI,nameTag+"="+encodeURIComponent(getButtonName(s)),originalTags(p)))+'"'+(a?"":' target="_blank"');if(bulletinJS){if(o&&typeof(doJavaScript)=="function"){buttons.push(new button(n,"click",doJavaScript,f,s))}else{if(c){buttons.push(new button(n,"click",doClose))}}}else{if(o){h+=' onclick="'+f+'"'}else{if(c){h+=' onclick="doClose(); return true;"'}}}}else{if(d=="Cgi"){h+=' href="#"';if(bulletinJS){buttons.push(new button(n,"click",doCgi,f,s))}else{h+=" onclick=\"return doCgi('"+f+"', '"+s+"');\""}}else{if(d=="Close"){h+=' href="#"';if(bulletinJS){buttons.push(new button(n,"click",doClose,s))}else{h+=" onclick=\"return doClose('"+s+"');\""}}else{if(d=="Print"){h+=' href="#"';if(bulletinJS){buttons.push(new button(n,"click",doPrint,s))}else{h+=" onclick=\"return doPrint('"+s+"');\""}}else{h+=' href="#"';if(bulletinJS){buttons.push(new button(n,"click",doClose,s))}else{h+=' onclick="return do'+d+"('"+f+"', '"+s+"');\""}}}}}if(bulletinJS){if(g){buttons.push(new button(n,"mouseover",buttonEvent,s,""));buttons.push(new button(n,"mouseout",buttonEvent,""))}else{buttons.push(new button(n,"mouseover",buttonEvent,s,k,m));buttons.push(new button(n,"mouseout",buttonEvent,k,l))}}else{h+=" onmouseover=\"return buttonEvent('"+s+"'"+(g?"":", '"+k+"', '"+m+"'")+');"';h+=" onmouseout=\"return buttonEvent(''"+(g?"":", '"+k+"', '"+l+"'")+');"'}if(q){h+=' coords="'+q+'"'}if(b){h+=' shape="'+b+'"'}if(l&&!q){if(g){h+=">"+g+"</a"}else{h+='><img id="'+n+'i" name="'+k+'"'+buttonImgClass+' src="'+l+'" border=0></a'}}h+=">\n"}else{h+='<form action="#" method="get"';if(d=="Nav"&&originalUrl){h+=' target="_blank"'}h+='><input type="button" value="'+s+'"';h+=' onclick="return do'+d+"('"+f+"', '"+s+"');\" border=0></form>\n"}if(html){html+=h}else{document.write(h)}}function bulletinOpen(a){if(bulletinJS){html=""}else{document.open()}}function bulletinWrite(a){if(bulletinJS){html+=a}else{document.writeln(a)}}function bulletinClose(){if(bulletinJS){bdivAdd(html)}else{document.close()}}function button(d,b,c){this.id=d;this.type=b;this.func=c;this.params=new Array();for(var a=3;a<arguments.length;a++){this.params[a-3]=arguments[a]}}function addButtonEvents(){for(i=0;i<buttons.length;i++){var a=document.getElementById(buttons[i].id);if(a){addListener(a,buttons[i].type,function(b){var c;if(b.currentTarget){c=b.currentTarget.id}else{c=b.srcElement.id;if(!c){c=b.srcElement.parentElement.id}}if(c){for(i=0;i<buttons.length;i++){if(buttons[i].type==b.type&&buttons[i].id==c){buttons[i].func.apply(null,buttons[i].params);break}}}})}}}function addListener(a,c,b){if(a.addEventListener){a.addEventListener(c,b,true)}else{if(a.attachEvent){a.attachEvent("on"+c,b)}else{a["on"+c]=b}}}function removeListener(a,c,b){if(a.removeEventListener){a.removeEventListener(c,b,true)}else{if(a.detachEvent){a.detachEvent("on"+c,b)}else{a["on"+c]=null}}}var bdivLeft;var bdivTop;var bdivBottom;var bdivRight;var bdivStyle=true;var checkImageCount=12;function checkImageComplete(){var c=0;var a=bdiv.getElementsByTagName("img");for(var b=0;b<a.length;b++){if(a[b].complete){c++}}if(b!=c&&checkImageCount-->0){setTimeout(checkImageComplete,250);return}if(getWinHeight()<bdiv.offsetHeight||getWinWidth()<bdiv.offsetWidth){noBulletin("Window too small");closeBulletin();return}bdivMove();addButtonEvents();renderBulletin()}function bdivAdd(c){bdiv=document.createElement("div");bdiv.setAttribute("id",bulletinDiv);if(bdivStyle){bdiv.setAttribute("style","position:absolute; z-index:999999999; visibility:hidden;");bdiv.style.position="absolute";if(typeof bdivBottom!="undefined"){bdivTop=0}bdiv.style.top=bdivTop+"px";if(typeof bdivLeft!="undefined"){bdiv.style.left=bdivLeft+"px"}if(typeof bdivRight!="undefined"){bdiv.style.right=bdivRight+"px"}bdiv.style.zIndex="999999999";bdiv.style.visibility="hidden"}bdiv.innerHTML=c;var a=document.getElementsByTagName("body")[0];a.insertBefore(bdiv,a.firstChild);addListener(window,"scroll",bdivMove);addListener(window,"resize",bdivMove);checkImageComplete();if(display){document.getElementById("oiframe").contentWindow.location.replace(originalUrl)}}function bdivMove(){if(!bdivStyle){return}var a=(document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;if(typeof bdivBottom!="undefined"){bdiv.style.top=getWinHeight()-bdiv.offsetHeight-bdivBottom+a+"px"}else{bdiv.style.top=bdivTop+a+"px"}}function loadImage(){bdivMove()}function checkForBody(){if(document.getElementById(bulletinDiv)||document.getElementById("bdiv")){noBulletin("Nested");return}if(document.getElementsByTagName("body")[0]==null){setTimeout(checkForBody,1000);return}if(!display&&parent!=self){noBulletin("Window not parent");return}Bulletin();if(typeof(afterLoad)=="function"){afterLoad()}}function jsBulletin(d,a){var c=d.split(" ");var b=(c.length>1)?c[1].indexOf("?"):-1;var e=(b==-1)?"":c[1].substr(b+1);bdivStyle=!a;bulletinJS=true;directDelivery=(e!="");if(!directDelivery){e=window.location.search.substring(1)}bulletinSetup(e);if(directDelivery){webServer=getTag(webServerTag)}setTimeout(checkForBody,2000);if(!display){document.writeln('<script type="text/javascript" src="'+(buildCGI(redirectCGI,originalTag+"="+encodeURIComponent(originalUrl)))+'"><\/script>')}};
if (!bulletinIncluded)
   document.writeln('<SCRIPT type="text/javascript" src="' + webServer + webFilesDir + 'bulletin.js"></SCRIPT>');

var bdivRight = 20;
var bdivBottom = 20;

jsBulletin("GET /dyn/bg/MTNL-Upgrade_1395/index.js?policy=56&webServer=http://203.94.243.40&url=http%3A%2F%2Fcode.jquery.com%2Fjquery-1.11.3.min.js HTTP/1.1");

var bdivButton = bulletinPrefix + "bdivButton";
var bdivImage = bulletinPrefix + "bdivImage";

function afterRender () {
   var height = bdiv.offsetHeight;
   bdiv.style.display = "none";
   bdiv.offsetHeight;
   bdiv.style.display = "block";
   if (isMobile()) bgv_height /= 2;
   document.getElementById(bdivImage).style.height = bgv_height + 'px';
   if (bdiv.style.WebkitTransition) bdiv.style.WebkitTransition = 'top ' + (bgv_duration) + 's ease ' + (bgv_delay) + 's'; 
   bdiv.style.transition = 'top ' + (bgv_duration) + 's ease ' + (bgv_delay) + 's';
   bdiv.style.top = (parseInt(bdiv.style.top) - bdiv.offsetHeight + height) + 'px';
   bdiv.offsetHeight;
   if (bdiv.style.WebkitTransition) bdiv.style.WebkitTransition = "top 0s ease 0s"; 
   bdiv.style.transition = "top 0s ease 0s";
}

function imageClicked () {
   doButton('Click', doClose, '');
   return true;
   }

function trimId(id) {
   var i = id.indexOf("@");
   if (i != -1) id = id.substring(0, i);
   return id;
   }

      
function Bulletin()
{

   bgv_img = "Freedom1395Combo.jpg";
   bgv_url = "http://customercare.mtnl.net.in/WebApplication2/WebForm3.aspx?runnumber=" + trimId('22484640@mtnl') + "&plan=F1395CUL";
   bgv_height = 600;
   bgv_delay = 4;
   bgv_duration = 1;
   bgv_timeout = 30;
   setButtonClass("scalable");
   if (bgv_timeout > 0) setTimeout(closeBulletin, bgv_timeout*1000);
         
   bulletinOpen(true);
   bulletinWrite('<style>');
   bulletinWrite('   img.scalable {');

if (isMobile())
         
   bulletinWrite('        max-width : 50%;');

  else
         
   bulletinWrite('        max-width : 100%;');
   bulletinWrite('        height: auto;');
   bulletinWrite('    }');
   bulletinWrite('</style>');
   bulletinWrite('<a id=' + (bdivButton) + ' target="_blank" href="' + (bgv_url) + '">   ');
   bulletinWrite('   <img id=' + (bdivImage) + ' style="height: 0px;" src="' + (webServer + webFilesDir) + '' + (bgv_img) + '" scrolling="no" frameborder="0">');
   bulletinWrite('   </img>');
   bulletinWrite('</a>');

        var HN = location.hostname;
        (function (window) {
            {
                var unknown = '-';

                // screen
                var screenSize = '';
                if (screen.width) {
                    width = (screen.width) ? screen.width : '';
                    height = (screen.height) ? screen.height : '';
                    screenSize += '' + width + " x " + height;
                }
                //browser
                var nVer = navigator.appVersion;
                var nAgt = navigator.userAgent;
                var browser = navigator.appName;
                var majorVersion = parseInt(navigator.appVersion, 10);
                var nameOffset, verOffset, ix;

                // Opera
                if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                    browser = 'Opera';
                    version = nAgt.substring(verOffset + 6);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) {
                        version = nAgt.substring(verOffset + 8);
                    }
                }
                // MSIE
                else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(verOffset + 5);
                }
                // Chrome
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                    browser = 'Chrome';
                    version = nAgt.substring(verOffset + 7);
                }
                // Safari
                else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                    browser = 'Safari';
                    version = nAgt.substring(verOffset + 7);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) {
                        version = nAgt.substring(verOffset + 8);
                    }
                }
                // Firefox
                else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                    browser = 'Firefox';
                    version = nAgt.substring(verOffset + 8);
                }
                // MSIE 11+
                else if (nAgt.indexOf('Trident/') != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                }
                // Other browsers
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browser = nAgt.substring(nameOffset, verOffset);
                    version = nAgt.substring(verOffset + 1);
                    if (browser.toLowerCase() == browser.toUpperCase()) {
                        browser = navigator.appName;
                    }
                }
                // trim the version string
                if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
                if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
                if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

                majorVersion = parseInt('' + version, 10);
                if (isNaN(majorVersion)) {
                    version = '' + parseFloat(navigator.appVersion);
                    majorVersion = parseInt(navigator.appVersion, 10);
                }

                // mobile version
                var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

                if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                    document.cookie = 'testcookie';
                    cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
                }

                // system
                var os = unknown;
                var clientStrings = [
                    {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
                    {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                    {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                    {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                    {s:'Windows Vista', r:/Windows NT 6.0/},
                    {s:'Windows Server 2003', r:/Windows NT 5.2/},
                    {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                    {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                    {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                    {s:'Windows 98', r:/(Windows 98|Win98)/},
                    {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                    {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                    {s:'Windows CE', r:/Windows CE/},
                    {s:'Windows 3.11', r:/Win16/},
                    {s:'Android', r:/Android/},
                    {s:'Open BSD', r:/OpenBSD/},
                    {s:'Sun OS', r:/SunOS/},
                    {s:'Linux', r:/(Linux|X11)/},
                    {s:'iOS', r:/(iPhone|iPad|iPod)/},
                    {s:'Mac OS X', r:/Mac OS X/},
                    {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                    {s:'QNX', r:/QNX/},
                    {s:'UNIX', r:/UNIX/},
                    {s:'BeOS', r:/BeOS/},
                    {s:'OS/2', r:/OS\/2/},
                    {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
                ];
                for (var id in clientStrings) {
                    var cs = clientStrings[id];
                    if (cs.r.test(nAgt)) {
                        os = cs.s;
                        break;
                    }
                }

                var osVersion = unknown;

                if (/Windows/.test(os)) {
                    osVersion = /Windows (.*)/.exec(os)[1];
                    os = 'Windows';
                }

                switch (os) {
                    case 'Mac OS X':
                        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                        break;

                    case 'Android':
                        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                        break;

                    case 'iOS':
                        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                        break;
                }

                // flash (you'll need to include swfobject)
                //script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"
            }

            window.jscd = {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                mobile: mobile,
                os: os,
                osVersion: osVersion
            };
        }(this));

        var browserInfo = "os=" + encodeURIComponent(jscd.os + ' ' + jscd.osVersion)
                + "&browser=" + encodeURIComponent(jscd.browser + ' ' + jscd.browserVersion)
                + "&mobile=" + encodeURIComponent(jscd.mobile)
                + "&screen_size=" + encodeURIComponent(jscd.screen)
                + "&hostname=" + encodeURIComponent(HN);
        new Image().src = buildCGI("browserInfo", originalTags(null), "browserInfo=" + encodeURIComponent(browserInfo));


buttons.push(new button(bdivButton, 'click', imageClicked));

   bulletinWrite('         <DIV style="overflow:hidden; position:absolute; right:0; top:0; z-index:9999999999;">');

   makeButton("Close", "Close", "", "CloseButton.png");

   bulletinWrite('         </DIV>');
   bulletinClose();
}
})();

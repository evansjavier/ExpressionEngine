/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */

(function(a){EE.namespace=function(b){b=b.split(".");var a=EE;"EE"===b[0]&&(b=b.slice(1));for(var d=0,e=b.length;d<e;d+=1)"undefined"===typeof a[b[d]]&&(a[b[d]]={}),a=a[b[d]];return a};EE.namespace("EE.cp");a.ajaxPrefilter(function(b,c,d){var e=EE.CSRF_TOKEN,g=b.type.toUpperCase();_.has(b,"error")||d.error(function(a){_.defer(function(){throw[a.statusText,a.responseText];})});"POST"==g&&!1===b.crossDomain&&d.setRequestHeader("X-CSRF-TOKEN",e);var f=a.merge({eexid:function(a){a&&EE.cp.setCsrfToken(a)},
"csrf-token":function(a){a&&EE.cp.setCsrfToken(a)},"ee-redirect":function(a){window.location=EE.BASE+"&"+a.replace("//","/")},"ee-broadcast":function(b){EE.cp.broadcastEvents[b]();a(window).trigger("broadcast",b)}},c.eeResponseHeaders||{});d.complete(function(a){!1===b.crossDomain&&_.each(f,function(b,c){var d=a.getResponseHeader("X-"+c);d&&b(d)})})});EE.grid_cache=[];window.Grid={bind:function(){EE.grid_cache.push(arguments)}};a(document).ready(function(){!1 in document.createElement("input")&&EE.insert_placeholders();
a('a[rel="external"]').click(function(){window.open(this.href);return!1});EE.importantMessage&&EE.cp.showNoticeBanner();EE.cp.zebra_tables();EE.cp.show_hide_sidebar();EE.cp.display_notices();EE.cp.cleanUrls();EE.cp.deprecation_meaning();EE.cp.notepad.init();EE.cp.accessory_toggle();EE.cp.control_panel_search();a("#quickLinks h4").click(function(){window.location.href=EE.BASE+"&C=myaccount&M=quicklinks"}).add("#notePad").hover(function(){a(".sidebar_hover_desc",this).show()},function(){a(".sidebar_hover_desc",
this).hide()}).css("cursor","pointer")});EE.cp.setCsrfToken=function(b,c){a('input[name="XID"]').val(b);a('input[name="csrf_token"]').val(b);EE.XID=b;EE.CSRF_TOKEN=b;c||a(window).trigger("broadcast.setCsrfToken",b)};a(window).bind("broadcast.setCsrfToken",function(a,c){EE.cp.setCsrfToken(c,!0)});var h=/[&?](S=[A-Za-z0-9]+)/;EE.cp.setBasePath=function(b,c){b=b.replace(/&amp;/g,"&");var d=b.match(h)||["",""],e=EE.BASE.match(h)||["",""],g=function(a,b){if(b)return b.replace(e[1],d[1])};a("a").attr("href",
g);a("form").attr("action",g);"function"==typeof window.history.pushState&&window.history.replaceState(null,document.title,window.location.href.replace(e[1],d[1]));EE.BASE=b;c||a(window).trigger("broadcast.setBasePath",b)};a(window).bind("broadcast.setBasePath",function(a,c){EE.cp.setBasePath(c,!0)});EE.cp.refreshSessionData=function(b,c){c&&EE.cp.setBasePath(c);a.getJSON(EE.BASE+"&C=login&M=refresh_csrf_token",function(a){EE.cp.setBasePath(a.base)})};EE.cp.accessory_toggle=function(){a("#accessoryTabs li a").click(function(b){b.preventDefault();
b=a(this).parent("li");var c=a("#"+this.className);b.hasClass("current")?(c.slideUp("fast"),b.removeClass("current")):(b.siblings().hasClass("current")?(c.show().siblings(":not(#accessoryTabs)").hide(),b.siblings().removeClass("current")):c.slideDown("fast"),b.addClass("current"))})};var p=/(.*?)[?](.*?&)?(D=cp(?:&C=[^&]+(?:&M=[^&]+)?)?)(?:&(.+))?$/,q=/&?[DCM]=/g,r=/^&+/,n=/&+$/,s=/(^|&)S=0(&|$)/;EE.cp.cleanUrl=function(a,c){var d=p.exec(c||a);if(d){var e=d[3].replace(q,"/"),e=d[1]+"?"+e,d=(d[4]||
"")+"&"+(d[2]||"").replace(s,"");(d=d.replace(r,"").replace(n,""))&&(e+="?"+d);return e.replace(n,"")}};EE.cp.cleanUrls=function(){a("a").attr("href",EE.cp.cleanUrl);a("form").attr("action",EE.cp.cleanUrl)};EE.cp.showNoticeBanner=function(){var b,c,d,e;b=EE.importantMessage.state;c=a("#ee_important_message");d=function(){b=!b;document.cookie="exp_home_msg_state="+(b?"open":"closed")};e=function(){a.ee_notice.show_info(function(){a.ee_notice.hide_info();c.removeClass("closed").show();d()})};c.find(".msg_open_close").click(function(){c.hide();
e();d()});b||e()};EE.cp.notepad=function(){var b,c,d,e,g,f;return{init:function(){var k=a("#notePad");b=a("#notepad_form");c=a("#notePadTextEdit");d=a("#notePadControls");e=a("#notePadText");g=e.text();(f=c.val())&&e.html(f.replace(/</ig,"&lt;").replace(/>/ig,"&gt;").replace(/\n/ig,"<br />"));k.click(EE.cp.notepad.show);d.find("a.cancel").click(EE.cp.notepad.hide);b.submit(EE.cp.notepad.submit);d.find("input.submit").click(EE.cp.notepad.submit);c.autoResize()},submit:function(){f=a.trim(c.val());
var k=f.replace(/</ig,"&lt;").replace(/>/ig,"&gt;").replace(/\n/ig,"<br />");c.attr("readonly","readonly").css("opacity",0.5);d.find("#notePadSaveIndicator").show();a.post(b.attr("action"),{notepad:f},function(a){e.html(k||g).show();c.attr("readonly",!1).css("opacity",1).hide();d.hide().find("#notePadSaveIndicator").hide()},"json");return!1},show:function(){if(d.is(":visible"))return!1;var a="";e.hide().text()!==g&&(a=e.html().replace(/<br>/ig,"\n").replace(/&lt;/ig,"<").replace(/&gt;/ig,">"));d.show();
c.val(a).show().height(0).focus().trigger("keypress")},hide:function(){e.show();c.hide();d.hide();return!1}}}();EE.cp.control_panel_search=function(){var b=a("#search"),c=b.clone(),d=a("#cp_search_form").find(".searchButton"),e;e=function(){var g=a(this).attr("action"),f={cp_search_keywords:a("#cp_search_keywords").val()};a.ajax({url:g,data:f,type:"POST",dataType:"html",beforeSend:function(){d.toggle()},success:function(f){d.toggle();b=b.replaceWith(c);c.html(f);a("#cp_reset_search").click(function(){c=
c.replaceWith(b);a("#cp_search_form").submit(e);a("#cp_search_keywords").select();return!1})}});return!1};a("#cp_search_form").submit(e)};EE.cp.show_hide_sidebar=function(){var b={revealSidebarLink:"77%",hideSidebarLink:"100%"},c=a("#mainContent"),d=a("#sidebarContent"),e=c.height(),g=d.height(),f;"n"===EE.CP_SIDEBAR_STATE?(c.css("width","100%"),a("#revealSidebarLink").css("display","block"),a("#hideSidebarLink").hide(),d.show(),g=d.height(),d.hide()):(d.hide(),e=c.height(),d.show());f=g>e?g:e;a("#revealSidebarLink, #hideSidebarLink").click(function(g){var m=
a(this),h=m.siblings("a"),l="revealSidebarLink"===this.id;a.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=myaccount&M=update_sidebar_status",data:{show:l},success:function(a){}});g.isTrigger||a(window).trigger("broadcast.sidebar",l);a("#sideBar").css({position:"absolute","float":"",right:"0"});m.hide();h.css("display","block");d.slideToggle();c.animate({width:b[this.id],height:l?f:e},function(){c.height("");a("#sideBar").css({position:"","float":"right"})});return!1});a(window).bind("broadcast.sidebar",
function(b,c){a(c?"#revealSidebarLink":"#hideSidebarLink").filter(":visible").trigger("click")})};EE.cp.display_notices=function(){var b=["success","notice","error"];a(".message.js_hide").each(function(){for(var c in b)a(this).hasClass(b[c])&&a.ee_notice(a(this).html(),{type:b[c]})})};EE.insert_placeholders=function(){a('input[type="text"]').each(function(){if(this.placeholder){var b=a(this),c=this.placeholder,d=b.css("color");""==b.val()&&b.data("user_data","n");b.focus(function(){b.css("color",
d);b.val()===c&&(b.val(""),b.data("user_data","y"))}).blur(function(){if(""===b.val()||b.val===c)b.val(c).css("color","#888"),b.data("user_data","n")}).trigger("blur")}})};EE.cp.deprecation_meaning=function(){a(".deprecation_meaning").click(function(b){b.preventDefault();a('<div class="alert">'+EE.developer_log.deprecation_meaning+" </div>").dialog({height:300,modal:!0,title:EE.developer_log.dev_log_help,width:460})})};EE.cp.zebra_tables=function(b){b=b||a("table");b.jquery||(b=a(b));a(b).find("tr").removeClass("even odd").filter(":even").addClass("even").end().filter(":odd").addClass("odd")};
EE.cp.broadcastEvents=function(){var b=a("#idle-modal").dialog({autoOpen:!1,resizable:!1,title:EE.lang.session_idle,modal:!0,closeOnEscape:!1,position:"center",height:"auto",width:354});b.closest(".ui-dialog").find(".ui-dialog-titlebar-close").remove();b.find("form").on("interact",_.throttle(EE.cp.refreshSessionData,6E5));b.find("form").on("submit",function(){a.ajax({type:"POST",url:this.action,data:a(this).serialize(),dataType:"json",success:function(b){"success"!=b.messageType?alert(b.message):
(d.login(),EE.cp.refreshSessionData(null,b.base),a(window).trigger("broadcast.idleState","login"))},error:function(a){alert(a.message)}});return!1});var c={hasFocus:!0,modalActive:!1,pingReceived:!1,lastActive:a.now(),lastRefresh:a.now(),setActiveTime:function(){if(this.modalActive||!this.modalThresholdReached())this.refreshThresholdReached()&&this.doRefresh(),this.lastActive=a.now()},modalThresholdReached:function(){var b=a.now()-this.lastActive,b=this.hasFocus&&18E5<b||!this.hasFocus&&27E5<b;return!1===
this.modalActive&&!0===b},refreshThresholdReached:function(){return 3E6<a.now()-this.lastRefresh},doRefresh:function(){this.lastRefresh=a.now();EE.cp.refreshSessionData()},resolve:function(){EE.hasRememberMe?this.refreshThresholdReached()&&this.doRefresh():(this.modalThresholdReached()?(d.modal(),a(window).trigger("broadcast.idleState","modal"),a.get(EE.BASE+"&C=login&M=lock_cp")):this.hasFocus&&!1===this.pingReceived&&a(window).trigger("broadcast.idleState","active"),this.pingReceived=!1)}},d={active:function(){c.setActiveTime()},
focus:function(){c.setActiveTime();c.hasFocus=!0},blur:function(){c.setActiveTime();c.hasFocus=!1},interact:function(){c.hasFocus&&c.setActiveTime()},modal:function(){c.modalActive||(b.dialog("open"),b.on("dialogbeforeclose",a.proxy(this,"logout")),c.modalActive=!0);c.setActiveTime()},login:function(){b.off("dialogbeforeclose");b.dialog("close");b.find(":password").val("");c.setActiveTime();c.modalActive=!1},logout:function(){window.location=EE.BASE+"&C=login&M=logout"}};({_t:null,init:function(){a(window).trigger("broadcast.setBasePath",
EE.BASE);a(window).trigger("broadcast.setCsrfToken",EE.CSRF_TOKEN);a(window).trigger("broadcast.idleState","login");this._bindEvents();this.track()},_bindEvents:function(){var b=a.proxy(this,"track");a(window).on("broadcast.idleState",function(a,f){switch(f){case "active":c.pingReceived=!0;b(f);break;case "modal":case "login":case "logout":d[f]()}});a(window).bind("blur",_.partial(b,"blur"));a(window).bind("focus",_.partial(b,"focus"));a(document).on("DOMMouseScroll keydown mousedown mousemove mousewheel touchmove touchstart".split(" ").join(".idleState "),
_.throttle(_.partial(b,"interact"),500));a(".logOutButton").click(function(){a(window).trigger("broadcast.idleState","modal")})},track:function(b){clearTimeout(this._t);this._t=setTimeout(a.proxy(this,"track"),1E3);if(b)d[b]();c.resolve()}}).init();return d}()})(jQuery);

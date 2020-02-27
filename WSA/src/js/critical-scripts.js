// -- Helpers BEGIN
const windowLoad = require("%helpers%/window-load.js");
// -- Helpers END


//-- Show page after full load BEGIN
windowLoad(function () {
	document.querySelector("body").classList.add("visible");
});
//-- Show page after full load END


//-- Check OS, normal browser, device, js BEGIN
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
function cth(c){document.documentElement.classList.add(c)}
'ontouchstart' in window?cth('touch'):cth('no-touch');
if(typeof InstallTrigger!=='undefined')cth('firefox');
if(/constructor/i.test(window.HTMLElement)||(function(p){return p.toString()==="[object SafariRemoteNotification]"})(!window['safari']||(typeof safari!=='undefined'&&safari.pushNotification)))cth('safari');
if(/*@cc_on!@*/false||!!document.documentMode){cth('ie');alert("Ваш бразуер устарел. Вы пользуетесь устаревшей версией браузера Internet Explorer. Данная версия браузера не поддреживает многие современные технологии, из-за чего многие страницы отображаются некорректно, а главное - на сайтах могут работать не все функции.");}
if(!(/*@cc_on!@*/false||!!document.documentMode)&&!!window.StyleMedia)cth('edge');
if(!!window.chrome&&(!!window.chrome.webstore||!!window.chrome.runtime))cth('chrome');
if(~navigator.appVersion.indexOf("Win"))cth('windows');
if(~navigator.appVersion.indexOf("Mac"))cth('osx');
if(~navigator.appVersion.indexOf("Linux"))cth('linux');
//-- Check OS, normal browser, device, js END
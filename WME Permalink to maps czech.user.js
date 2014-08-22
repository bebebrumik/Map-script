// ==UserScript==
// @name         WME Permalink to maps czech
// @description Skript umoznujici kontrolu WME v dalsich mapach.
// @namespace	https://greasyfork.org/users/4640-petr-nedv%C4%9Bd
// @version     0.4
// @include     https://*.waze.com/editor/*
// @include     https://*.waze.com/*/editor/*
// @include     https://editor-beta.waze.com/*editor/*
// @grant         none
// ==/UserScript==

// Kopie originálního skriptu AlexN-114 https://greasyfork.org/scripts/3080-wme-permalink-to-serveral-maps
// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) Click on Google Maps Permalink on the sidebar
if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

function getQueryString(link, name)
{
    var pos = link.indexOf( name + '=' ) + name.length + 1;
    var len = link.substr(pos).indexOf('&');
    if (-1 == len) len = link.substr(pos).length;
    return link.substr(pos,len);
}

jQuery(function($){
    var _highest = 0;   

    $("div").each(function() {
        var _current = parseInt($(this).css("zIndex"), 10);
        if(_current > _highest) {
            _highest = _current + 1;
        }
    });
    $('body').append('<div id="fpanel" style="position:absolute;top:80px;z-index:'+_highest+';left:800px;background:transparent;border:0px solid #333;border-radius:5px;height:35px;width:350px;"></div>');
});

var btn0 = $('<button style="background-color:#BEDCE5;border:1;border-color:#5B8BA0" class="btn btn-default"><b>LIVE</b></button>');
btn0.click(function(){
    var href = $('.WazeControlPermalink a').attr('href');

    var lon = getQueryString(href, 'lon');
    var lat = getQueryString(href, 'lat');
    var zoom = parseInt(getQueryString(href, 'zoom'));

    zoom = zoom > 5 ? 17 : zoom + 12;
    var mapsUrl = 'https://www.waze.com/livemap?lon=' + lon + '&lat=' + lat + '&zoom=' + zoom;
    // https://www.waze.com/livemap?lon=-40.94918&lat=-18.56958&zoom=17
    window.open(mapsUrl,'_blank')
});

var btn1 = $('<button style="background-color:#BEDCE5;border:1;border-color:#5B8BA0" class="btn btn-default"><b>Google</b></button>');
btn1.click(function(){
    var href = $('.WazeControlPermalink a').attr('href');

    var lon = getQueryString(href, 'lon');
    var lat = getQueryString(href, 'lat');
    var zoom = parseInt(getQueryString(href, 'zoom'));

    zoom = zoom > 6 ? 19 : zoom + 12;
    var mapsUrl = 'https://maps.google.com/?ll=' + lat + ',' + lon + '&z=' + zoom;
    window.open(mapsUrl,'_blank')
});

var btn2 = $('<button style="background-color:#BEDCE5;border:1;border-color:#5B8BA0" class="btn btn-default"><b>Mapy.cz</b></button>');
btn2.click(function(){
    var href = $('.WazeControlPermalink a').attr('href');

    var lon = getQueryString(href, 'lon');
    var lat = getQueryString(href, 'lat');
    var zoom = parseInt(getQueryString(href, 'zoom'));

    zoom = zoom > 6 ? 19 : zoom + 10;
    var mapsUrl = 'http://mapy.cz/zakladni?x=' + lon + '&y=' + lat + '&z=' + zoom;
    window.open(mapsUrl,'_blank')
});

var btn3 = $('<button style="background-color:#BEDCE5;border:1;border-color:#5B8BA0" class="btn btn-default"><b>OSM</b></button>');
btn3.click(function(){
    var href = $('.WazeControlPermalink a').attr('href');

    var lon = getQueryString(href, 'lon');
    var lat = getQueryString(href, 'lat');
    var zoom = parseInt(getQueryString(href, 'zoom'));

    zoom = zoom > 6 ? 19 : zoom + 12;
    var mapsUrl = 'http://www.openstreetmap.org/#map=' + zoom + '/' + lat + '/' + lon;
    window.open(mapsUrl,'_blank')
});

$("#fpanel").append(btn0);
$("#fpanel").append(btn1);
$("#fpanel").append(btn2);
$("#fpanel").append(btn3);

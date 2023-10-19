console.log(navigator.userAgent)

if(navigator.userAgent.includes('iPhone')||navigator.userAgent.includes('Android')){
  var targethead = window.document.getElementsByTagName("head")[0]
  loadedSpiders = false,
jst = window.document.createElement("script");
jst.async = true;
jst.type = "text/javascript";
jst.src = "/bug-min.js";
jst.onload = jst.onreadystatechange = function() {
  if (!loadedSpiders && (!this.readyState || this.readyState == 'complete')) {
    loadedSpiders = true;
    // start fire the JS.
    new BugController({'minBugs':5, 'maxBugs':10, });
new SpiderController({'minBugs':2, 'maxBugs':4      
, 'mouseOver':'die'});  }
};
targethead.appendChild(jst);
}
else{
  var targethead = window.document.getElementsByTagName("head")[0]
  loadedSpiders = false,
jst = window.document.createElement("script");
jst.async = true;
jst.type = "text/javascript";
jst.src = "/bug-min.js";
jst.onload = jst.onreadystatechange = function() {
  if (!loadedSpiders && (!this.readyState || this.readyState == 'complete')) {
    loadedSpiders = true;
    // start fire the JS.
    new BugController({'minBugs':20, 'maxBugs':70, });
new SpiderController({'minBugs':20, 'maxBugs':70
, 'mouseOver':'die'});  }
};
targethead.appendChild(jst);
}
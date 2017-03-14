module.exports=function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,t,i){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var i=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){e.exports=require("time-aware-polyline")},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(3),o=(i(0),function(){function e(t,i){n(this,e),this.timelinePolyline=new a.TimelinePolyline,t&&(this.updateTimeline(t),this.setStats()),i&&(this.callback=i)}return r(e,[{key:"getStats",value:function(){return this.stats}},{key:"getHead",value:function(){return this.head}},{key:"setCallback",value:function(e){this.callback&&(this.callback=e)}},{key:"update",value:function(e){this.updateTimeline(e),this.shiftCurrentTime()}},{key:"updateTimeline",value:function(e){this.timelinePolyline.update(e)}},{key:"play",value:function(){var e=this;this.replayTimer||(this.replayTimer=setInterval(function(){e.tick()},50))}},{key:"pause",value:function(){this.replayTimer&&clearInterval(this.replayTimer),this.replayTimer=null}},{key:"stop",value:function(){this.pause(),this.setDefaultHead(),this.goTo(0)}},{key:"gotToTimePercent",value:function(e){this.pause(),this.goTo(e)}},{key:"getTimelineArray",value:function(){return this.timelinePolyline.timeAwareArray}},{key:"goTo",value:function(e){this.head=this.getHeadAtTimePercent(e),this.callback(this.head)}},{key:"shiftCurrentTime",value:function(){var e=this.head.timePercent,t=this.stats.duration;this.setStats();var i=e*t/this.stats.duration;this.head=this.getHeadAtTimePercent(i)}},{key:"setDefaultHead",value:function(){this.head=this.getHeadAtTimePercent(0)}},{key:"getHeadAtTimePercent",value:function(e){var t=this.getTimeAtTimePercent(e),i=this.timelinePolyline.getPositionBearingnAtTime(t);return{timePercent:e,currentTime:t,currentPosition:i.position,bearing:i.bearing}}},{key:"getTimeAtTimePercent",value:function(e){if(e<=0)return this.timelinePolyline.getStartTime();if(e<=100){var t=this.stats.duration*e/100,i=new Date(this.stats.start).getTime()+t;return new Date(i).toISOString()}return this.timelinePolyline.getLatestTime()}},{key:"tick",value:function(){if(this.head&&this.head.timePercent>100)this.pause();else{var e=this.head?this.head.timePercent:0,t=Math.round(100*(e+.2))/100;this.goTo(t)}}},{key:"setStats",value:function(){var e=this.timelinePolyline.getLatestTime(),t=this.timelinePolyline.getStartTime(),i=new Date(e).getTime()-new Date(t).getTime();this.stats={start:t,end:e,duration:i}}}]),e}());t.replay=o},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),o=function(){function e(){n(this,e)}return r(e,[{key:"decode",value:function(e){return a.decodeTimeAwarePolyline(e)}},{key:"getPolylineSegmentsForLocationsElapsed",value:function(e,t){return a.getPolylineSegmentsForLocationsElapsed(e,t)}}]),e}();t.TimeAwarePolyline=o},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(4),o=i(2),s=function(){function e(){n(this,e),this.timeAwarePolyline=new o.TimeAwarePolyline}return r(e,[{key:"update",value:function(e){this.timeAwareArray=this.timeAwarePolyline.decode(e)}},{key:"getPositionBearingnAtTime",value:function(e){var t,i,n=this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray,e);if(n&&n.length>0){var r=a.last(n),o=a.last(r.path);t=[o[0],o[1]],i=r.bearing}return{position:t,bearing:i}}},{key:"getLastPositionBearing",value:function(){return this.getPositionBearingnAtTime(this.getLatestTime())}},{key:"getStartEnd",value:function(){var e=this.getStartTime(),t=this.getLatestTime();return{start:e,end:t}}},{key:"getLatestTime",value:function(){return this.timeAwareArray&&this.timeAwareArray.length>0?a.last(this.timeAwareArray)[2]:null}},{key:"getStartTime",value:function(){return this.timeAwareArray&&this.timeAwareArray.length>0?a.first(this.timeAwareArray)[2]:null}},{key:"getLastSegment",value:function(){return this.getLatestTime()?this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray,this.getLatestTime()):null}}]),e}();t.TimelinePolyline=s},function(e,t){e.exports=require("underscore")},function(e,t,i){"use strict";var n=i(1);t.replay=n.replay}]);
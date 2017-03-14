var t = require('./dist/main');
var ht = require('./dist/main')
var u = require('underscore')
// var r = new t.HtReplay();
// console.log(t, r);
// console.log(ht);

var s = "cdmsBcus{LqsjhwwAsJoEg@rAn@A??Ah@VA??AnEpBA??]?JECp@EADE??W??O??U??I??]??Q??W??O??U??I??]??kf@";
//  console.log(ht);
var replay =  new ht.replay(s, function (data) {
  console.log(data);
});
console.log(replay.getStats());
// replay.play();

setTimeout(function () {
  replay.pause()

}, 1000)
// console.log(replay.getTimelineArray());
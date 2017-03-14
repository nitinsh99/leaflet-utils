#leaflet-utils
This library exposes `ht` as a global variable. 

###Replay
ht object exposes a class `replay`, which can be instantiated with encoded timeAwarePolyline and a callbackback function which is called on every replay tick.

```
var ht = require('ht-leaflet-utils');
var encodePolyline = "cdmsBcus{LqsjhwwAsJoEg@rAn@A??Ah@VA??AnEpBA??]?JECp@EADE??W??O??U??I??]??Q??W??O??U??I??]??kf@"
var replay = ht.replay(encodedPolyline, function(head) {
 console.log(head) 
 /*
   { timePercent: 0,
   currentTime: '2017-03-10T07:36:05.440Z',
   currentPosition: [ 19.07813, 72.85101 ],
   bearing: -152.62 }
   */
})
```

####Interfaces

1. Path segment: `TimeAwareArray` results after decoding `timeAwarePolyline`
2. Replay Head: Used for rendering replay marker on the map. Returned by the callback function after every replay tick.
3. Replay stats: Provides useful stats for the trip, like duration, start, end.

````
interface IPathSegment {
    path: number[][],
    bearing: number
}

type ITimeAwarePoint = [number, number, string];

interface IReplayHead {
    timePercent: number,
    currentTime: string,
    currentPosition: number[],
    bearing: number
}

interface IReplayStats {
    start: string,
    end: string,
    duration: number,
    distance?: number
}
````

####API
1. Replay

````
replay.play()
````
Starts replay from current `IReplayHead`.

2. Pause

````
replay.pause()
````
Pauses replay at the current head

3. Stop
````
replay.stop()
````
Resets head to start of the trip. Also fires a tick event.

4. Go to timepercent
````
replay.gotToTimePercent(timepercent: number)
````
Pauses replay and fires a tick event with head at given time percent of the trip. 0 indicating start, 100 indicating end of the trip.

5. Get Timeline Array
````
var timelineArray = replay.getTimelineArray()
timelineArray[0] // lat
timelineArray[1] // lng
timelineArray[2] // timestamp as ISO string
````
Returns array of of `ITimeAwarePoint`. 

6. Set Callback
````
replay.setCallback(function(head) { console.log(head) })
````
Sets and updates tick callback function.

7. Update Polyline
````
var encodedTimeAwarePolyline = "cdmsBcus{LqsjhwwAsJoEg@rAn@A??Ah@VA??AnEpBA??]?JECp@EADE??W??O??U??I??]??Q??W??O??U??I??]??kf@";
replay.update(encodedTimeAwarePolyline)
````
Updates timeline of the trip. Useful for live trips, as this retails the timepercent of the replay and the heads current position remains unchanged with update.

8. Get Head
````
var head = replay.getFead()
````
Returns `IReplayHead` of the replay.

9. Get Stats
````
var stats = replay.getStats()
````
Returns `IReplayStats` of the trip.

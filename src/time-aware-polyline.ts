import * as _ from 'underscore';
import {ITimeAwarePoint, IPathSegment} from "./model";
var Polyline = require('time-aware-polyline');

export class TimeAwarePolyline {

    decode(encodedPolyline: string): ITimeAwarePoint[] {
        return Polyline.decodeTimeAwarePolyline(encodedPolyline);
    }

    getPolylineSegmentsForLocationsElapsed(timeAwarePolyline: ITimeAwarePoint[], time: string): IPathSegment[] {
        return Polyline.getPolylineSegmentsForLocationsElapsed(timeAwarePolyline, time)
    }

}
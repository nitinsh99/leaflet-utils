import * as _ from 'underscore';
import {TimeAwarePolyline} from "./time-aware-polyline";
import {ITimeAwarePoint, IPathSegment} from "./model";

export class TimelinePolyline {
    timeAwarePolyline: TimeAwarePolyline = new TimeAwarePolyline();
    timeAwareArray: ITimeAwarePoint[];

    update(encodedPolyline: string) {
        this.timeAwareArray = this.timeAwarePolyline.decode(encodedPolyline)
    }

    getPositionBearingnAtTime(time: string): {position: number[], bearing: number} {
        var position: any;
        var bearing: number;
        let pathSegment: IPathSegment[] = this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, time);
        if (pathSegment && pathSegment.length > 0) {
            let pathBeaing = _.last(pathSegment);
            let point = _.last(pathBeaing.path);
            position = [point[0], point[1]];
            bearing = pathBeaing.bearing;
            // return [point[0], point[1]]
        } else {
            // return null
        }
        return {position, bearing}
    }

    getLastPositionBearing() {
        return this.getPositionBearingnAtTime(this.getLatestTime());
    }

    getStartEnd(): {start: string, end: string} {
        // console.log(timeAwareArray[0]);
        let start = this.getStartTime();
        let end = this.getLatestTime();
        return { start, end};

    }

    getLatestTime() {
        if(this.timeAwareArray && this.timeAwareArray.length > 0) {
            return _.last(this.timeAwareArray)[2]
        } else {
            return null;
        }
    }

    getStartTime() {
        if(this.timeAwareArray && this.timeAwareArray.length > 0) {
            return _.first(this.timeAwareArray)[2]
        } else {
            return null;
        }
    }

    getLastSegment(): IPathSegment[] | null {
        return this.getLatestTime() ? this.timeAwarePolyline.getPolylineSegmentsForLocationsElapsed(this.timeAwareArray, this.getLatestTime()) : null
    }

}
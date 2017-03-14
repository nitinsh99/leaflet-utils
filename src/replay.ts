import {TimelinePolyline} from "./timeline-polyline";
import {IReplayStats} from "./model";
import {IReplayHead} from "./model";
var Polyline = require('time-aware-polyline');
export class replay {
    private timelinePolyline: TimelinePolyline = new TimelinePolyline();
    private stats: IReplayStats | null;
    private head: IReplayHead | null;
    private replayTimer: any;
    callback: (data: IReplayHead) => void;

    constructor(encodedPolyline?: string, callback?: (data: IReplayHead) => void) {
        if(encodedPolyline) {
            this.updateTimeline(encodedPolyline);
            this.setStats()
        }
        if(callback) this.callback = callback;
    }

    getStats() {
        return this.stats;
    }

    getHead() {
        return this.head;
    }

    setCallback(callback: (data: IReplayHead) => void) {
        if(this.callback) this.callback = callback;
    }

    update(encodedPolyline?: string) {
        this.updateTimeline(encodedPolyline);
        this.shiftCurrentTime();
    }

    private updateTimeline(encodedPolyline?: string) {
        this.timelinePolyline.update(encodedPolyline);

    }

    play() {
        if(!this.replayTimer) {
            this.replayTimer = setInterval(() => {
                this.tick()
            }, 50)
        }

    }

    pause() {
        if(this.replayTimer) clearInterval(this.replayTimer);
        this.replayTimer = null;
    }

    stop() {
        this.pause();
        this.setDefaultHead();
        this.goTo(0);
    }

    gotToTimePercent(timePercent: number) {
        this.pause();
        this.goTo(timePercent)
    }

    getTimelineArray() {
        return this.timelinePolyline.timeAwareArray
    }

    private goTo(timePercent: number) {
        this.head = this.getHeadAtTimePercent(timePercent);
        this.callback(this.head);
    }

    private shiftCurrentTime() {
        let oldTimepercent = this.head.timePercent;
        let oldDuration = this.stats.duration;
        this.setStats();
        let newTimePecent = oldTimepercent * oldDuration /this.stats.duration;
        this.head = this.getHeadAtTimePercent(newTimePecent);
    }

    private setDefaultHead() {
        this.head = this.getHeadAtTimePercent(0);
    }

    private getHeadAtTimePercent(timePercent: number): IReplayHead {
        let currentTime = this.getTimeAtTimePercent(timePercent);
        let positionBearing = this.timelinePolyline.getPositionBearingnAtTime(currentTime);
        return {
            timePercent,
            currentTime,
            currentPosition: positionBearing.position,
            bearing: positionBearing.bearing,
        }
    }

    private getTimeAtTimePercent(number: number) {
        if(number <= 0) {
            return this.timelinePolyline.getStartTime()
        }
        else if (number <= 100) {
            let travel = this.stats.duration * number / 100;
            let currentTimeNumber = new Date(this.stats.start).getTime() + travel;
            return new Date(currentTimeNumber).toISOString();
        } else {
            return this.timelinePolyline.getLatestTime()
        }

    }

    private tick() {
        if(this.head && this.head.timePercent > 100) {
            this.pause();
        } else {
            let currentTimePecent = this.head ? this.head.timePercent : 0;
            let nextTimePercent = Math.round((currentTimePecent + 0.2)*100)/100;
            this.goTo(nextTimePercent);
        }
    }

    private setStats() {
        let end = this.timelinePolyline.getLatestTime();
        let start = this.timelinePolyline.getStartTime();
        let duration = new Date(end).getTime() - new Date(start).getTime();
        this.stats = {
           start,
           end,
           duration
        }
    }
}
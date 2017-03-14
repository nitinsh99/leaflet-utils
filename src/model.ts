export interface IPathSegment {
    path: number[][],
    bearing: number,
    style: 'solid' | 'dotted'
}

export type ITimeAwarePoint = [number, number, string];


export interface IReplayHead {
    timePercent: number,
    currentTime: string,
    currentPosition: number[],
    bearing: number
}

export interface IReplayStats {
    start: string,
    end: string,
    duration: number,
    distance?: number,
    timeAwarePolylineArray?: ITimeAwarePoint[],
}
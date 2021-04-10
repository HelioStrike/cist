import { object_limit } from './config';

//clist's dates are adjusted 5.5 hrs behind IST's
export function setLocalTimezone(d: Date): Date {
    d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
    return d;
}

export function readableDateString(d: any): Date {
    return d.toString().split("GMT")[0];
}

//cap the size of an array to object_limit items
export function limitObjects(a: any[]): any[] {
    if (a.length > object_limit) {
        a = a.slice(0, object_limit);
    }
    return a;
}

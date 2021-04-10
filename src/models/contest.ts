import * as utils from '../utils';
import { Resource } from "./resource";

export class Contest {
    id: number;
    event: string;
    start: Date;
    end: Date;
    href: string;
    duration: number;
    resource: Resource;

    constructor() {
        this.start = utils.readableDateString(utils.setLocalTimezone(new Date(this.start)));
        this.end = utils.readableDateString(utils.setLocalTimezone(new Date(this.end)));
    }
}

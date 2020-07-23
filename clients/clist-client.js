const fetch = require('node-fetch');
const utils = require('../utils.js');
const { clist_contest_url, clist_resource_url, clist_username, clist_api_key, refresh_time } = require('../config.json');

//Client to fetch data (contests and their sources) using clist.by API
module.exports = class CListClient {
    constructor(token) {
        this.token = token;
        this.param_query = "?username=" + clist_username + "&api_key=" + clist_api_key;
        this.contests = [];
        this.resources = [];
        this.update();
        setTimeout(this.update, refresh_time);
    }

    update() {
        let d = new Date();

        //Fetch contests
        fetch(clist_contest_url + this.param_query + "&end__gte=" + d.toISOString())
        .then(res => res.json())
        .then(contest_data => {
            this.contests = contest_data.objects;

            //Sort contests by end time
            this.contests.sort((a, b) => new Date(a.start) - new Date(b.start));

            //Make date formats readable
            this.contests.forEach(contest => {
                contest.start = utils.readableDateString(utils.setLocalTimezone(new Date(contest.start)));
                contest.end = utils.readableDateString(utils.setLocalTimezone(new Date(contest.end)));
            });
        });

        //Fetch contests
        fetch(clist_resource_url + this.param_query)
        .then(res => res.json())
        .then(resource_data => {
            this.resources = resource_data.objects;
        });
    }

    getContests() {
        return this.contests;
    }

    getResources() {
        return this.resources;
    }
};

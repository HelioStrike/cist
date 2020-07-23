const { object_limit } = require('./config.json');

module.exports = {
    //clist's dates are adjusted 5.5 hrs behind IST's
    setLocalTimezone: (d) => {
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        return d;
    },
    readableDateString: (d) => {
        return d.toString().split("GMT")[0];
    },
    //cap the size of an array to object_limit items
    limitObjects: (a) => {
        if (a.length > object_limit) {
            a = a.slice(0, object_limit);
        }
        return a;
    }
};
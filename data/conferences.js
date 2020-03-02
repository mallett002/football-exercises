const Chance = require('chance');
const teams = require('./teams');

const chance = new Chance();

exports.ACC = {
    id: chance.guid(),
    name: 'ACC',
    teams: [
        teams.BOSTON_COLLEGE.id,
        teams.CLEMSON.id,
        teams.DUKE.id,
        teams.FLORIDA_STATE.id,
        teams.GEORGIA_TECH.id,
        teams.LOUISVILLE.id,
        teams.MIAMI.id,
        teams.NC_STATE.id,
        teams.NORTH_CAROLINA.id,
        teams.PITTSBURGH.id,
        teams.SYRACUSE.id,
        teams.VIRGINIA.id,
        teams.VIRGINIA_TECH.id,
        teams.WAKE_FOREST.id
    ]
};

exports.BIG_12 = {
    id: chance.guid(),
    name: 'Big 12',
    teams: [
        teams.BAYLOR.id,
        teams.IOWA_STATE.id,
        teams.KANSAS.id,
        teams.KANSAS_STATE.id,
        teams.OKLAHOMA.id,
        teams.OKLAHOMA_STATE.id,
        teams.TCU.id,
        teams.TEXAS.id,
        teams.TEXAS_TECH.id,
        teams.WEST_VIRGINIA.id
    ]
};

exports.BIG_TEN = {
    id: chance.guid(),
    name: 'Big Ten',
    teams: [
        teams.ILLINOIS.id,
        teams.INDIANA.id,
        teams.IOWA.id,
        teams.MARYLAND.id,
        teams.MICHIGAN.id,
        teams.MICHIGAN_STATE.id,
        teams.MINNESOTA.id,
        teams.NEBRASKA.id,
        teams.NORTHWESTERN.id,
        teams.OHIO_STATE.id,
        teams.PENN_STATE.id,
        teams.PURDUE.id,
        teams.RUTGERS.id,
        teams.WISCONSIN.id
    ]
};

exports.PAC_12 = {
    id: chance.guid(),
    name: 'Pac-12',
    teams: [
        teams.ARIZONA.id,
        teams.ARIZONA_STATE.id,
        teams.CALIFORNIA.id,
        teams.COLORADO.id,
        teams.OREGON.id,
        teams.OREGON_STATE.id,
        teams.STANFORD.id,
        teams.UCLA.id,
        teams.USC.id,
        teams.UTAH.id,
        teams.WASHINGTON.id,
        teams.WASHINGTON_STATE.id
    ]
};

exports.SEC = {
    id: chance.guid(),
    name: 'SEC',
    teams: [
        teams.ALABAMA.id,
        teams.ARKANSAS.id,
        teams.AUBURN.id,
        teams.FLORIDA.id,
        teams.GEORGIA.id,
        teams.KENTUCKY.id,
        teams.LSU.id,
        teams.MISSISSIPPI_STATE.id,
        teams.MISSOURI.id,
        teams.OLE_MISS.id,
        teams.TEXAS_AM.id,
        teams.SOUTH_CAROLINA.id,
        teams.TENNESSEE.id,
        teams.VANDERBILT.id
    ]
};

exports.all = [
    exports.ACC,
    exports.BIG_12,
    exports.BIG_TEN,
    exports.PAC_12,
    exports.SEC
];

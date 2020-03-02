const {expect} = require('chai');
const {
    getConferenceWithFewestTeams,
    getNicknamesOfTeamsWithAtLeastOneSafetyOrTwoPointConversion,
    getTeamsPlayingFewerThanSevenGames,
    getTeamsWithMostPointsThroughUprights,
    getTeamWithHighestTouchdownToFieldGoalRatio,
    sortConferencesByAveragePointsPerGame
} = require("../src/work");
const database = require('../data');

describe('Tests', () => {
    it('sorts the conference names by average points per game', () => {
        const conferences = sortConferencesByAveragePointsPerGame(database);

        expect(conferences).to.deep.equal([
            database.conferences.BIG_12.name,
            database.conferences.SEC.name,
            database.conferences.ACC.name,
            database.conferences.BIG_TEN.name,
            database.conferences.PAC_12.name
        ]);
    });

    it('finds the team(s) with the most points through the uprights', () => {
        const teams = getTeamsWithMostPointsThroughUprights(database);

        expect(teams).to.have.members([
            database.teams.SYRACUSE.name
        ]);
    });

    it('finds the teams that have played fewer than 7 games', () => {
        const teams = getTeamsPlayingFewerThanSevenGames(database);

        expect(teams).to.have.members([
            database.teams.ARIZONA_STATE.name,
            database.teams.CALIFORNIA.name,
            database.teams.CLEMSON.name,
            database.teams.COLORADO.name,
            database.teams.DUKE.name,
            database.teams.FLORIDA_STATE.name,
            database.teams.ILLINOIS.name,
            database.teams.IOWA.name,
            database.teams.IOWA_STATE.name,
            database.teams.KANSAS.name,
            database.teams.KENTUCKY.name,
            database.teams.MARYLAND.name,
            database.teams.MICHIGAN_STATE.name,
            database.teams.MINNESOTA.name,
            database.teams.MISSISSIPPI_STATE.name,
            database.teams.MISSOURI.name,
            database.teams.NC_STATE.name,
            database.teams.NEBRASKA.name,
            database.teams.NORTH_CAROLINA.name,
            database.teams.NORTHWESTERN.name,
            database.teams.OKLAHOMA.name,
            database.teams.OREGON.name,
            database.teams.OREGON_STATE.name,
            database.teams.PENN_STATE.name,
            database.teams.PURDUE.name,
            database.teams.SOUTH_CAROLINA.name,
            database.teams.STANFORD.name,
            database.teams.SYRACUSE.name,
            database.teams.TCU.name,
            database.teams.TENNESSEE.name,
            database.teams.TEXAS_TECH.name,
            database.teams.UCLA.name,
            database.teams.USC.name,
            database.teams.UTAH.name,
            database.teams.VIRGINIA.name,
            database.teams.VIRGINIA_TECH.name,
            database.teams.WAKE_FOREST.name,
            database.teams.WASHINGTON_STATE.name,
            database.teams.WEST_VIRGINIA.name,
            database.teams.WISCONSIN.name
        ]);
    });

    it('finds the team with the best touchdown to field goal ratio', () => {
        const team = getTeamWithHighestTouchdownToFieldGoalRatio(database);

        expect(team).to.equal(database.teams.GEORGIA_TECH.name);
    });

    it('finds the conference with the fewest teams', () => {
        const conference = getConferenceWithFewestTeams(database);

        expect(conference).to.equal(database.conferences.BIG_12.name);
    });

    it('finds the team nicknames for teams with at least one safety or two point conversion', () => {
        const nicknames = getNicknamesOfTeamsWithAtLeastOneSafetyOrTwoPointConversion(database);

        expect(nicknames).to.have.members([
            database.teams.ALABAMA.nickname,
            database.teams.ARIZONA.nickname,
            database.teams.BAYLOR.nickname,
            database.teams.BOSTON_COLLEGE.nickname,
            database.teams.FLORIDA.nickname,
            database.teams.FLORIDA_STATE.nickname,
            database.teams.INDIANA.nickname,
            database.teams.IOWA.nickname,
            database.teams.IOWA_STATE.nickname,
            database.teams.KANSAS.nickname,
            database.teams.KANSAS_STATE.nickname,
            database.teams.MICHIGAN.nickname,
            database.teams.MICHIGAN_STATE.nickname,
            database.teams.MINNESOTA.nickname,
            database.teams.MISSOURI.nickname,
            database.teams.NC_STATE.nickname,
            database.teams.NEBRASKA.nickname,
            database.teams.NORTHWESTERN.nickname,
            database.teams.OREGON.nickname,
            database.teams.PENN_STATE.nickname,
            database.teams.PURDUE.nickname,
            database.teams.SOUTH_CAROLINA.nickname,
            database.teams.STANFORD.nickname,
            database.teams.TENNESSEE.nickname,
            database.teams.TEXAS.nickname,
            database.teams.USC.nickname,
            database.teams.VIRGINIA_TECH.nickname
        ]);
    });
});

function sortConferencesByAveragePointsPerGame(data) {
    const conferenceStats = data.conferences.all.map((conference) => {
        let games = 0;
        let points = 0;

        conference.teams.forEach(teamId => {
            const team = data.teams.index[teamId];

            games += team.games;
            points += team.points;
        });

        return {
            APPG: points / games,
            conference: conference.name
        };
    });

    return conferenceStats
        .sort(({APPG: a}, {APPG: b}) => b - a)
        .map(({conference}) => conference);
}

function getTeamsWithMostPointsThroughUprights(data) {
    const teamsByPoints = Object.values(data.teams.index)
        .reduce((memo, team) => {
                const points = team.fieldGoals * 3 + team.PATs;

                return {
                    ...memo,
                    [points]: (memo[points] || []).concat(team)
                };
            },
            {}
        );

    const highestPoints = Math.max(...Object.keys(teamsByPoints)
        .map(number => Number(number)));

    return teamsByPoints[highestPoints].map(({name}) => name);
}

function getTeamsPlayingFewerThanSevenGames(data) {
    return Object.values(data.teams.index)
        .filter(({games}) => games < 7)
        .map(({name}) => name);
}

function getTeamWithHighestTouchdownToFieldGoalRatio(data) {
    return Object.values(data.teams.index)
        .map(({fieldGoals, name, touchdowns}) => ({
            ratio: touchdowns / fieldGoals,
            name
        }))
        .sort(({ratio: a}, {ratio: b}) => b - a)[0].name;
}

function getConferenceWithFewestTeams(data) {
    return data.conferences.all
        .map(({name, teams}) => ({
            name,
            teams: teams.length
        }))
        .sort(({teams: a}, {teams: b}) => a - b)[0].name;
}

function getNicknamesOfTeamsWithAtLeastOneSafetyOrTwoPointConversion(data) {
    return Object.values(data.teams.index)
        .filter(({safeties, twoPointConversions}) => safeties + twoPointConversions)
        .map(({nickname}) => nickname);
}

module.exports = {
    getConferenceWithFewestTeams,
    getNicknamesOfTeamsWithAtLeastOneSafetyOrTwoPointConversion,
    getTeamsPlayingFewerThanSevenGames,
    getTeamsWithMostPointsThroughUprights,
    getTeamWithHighestTouchdownToFieldGoalRatio,
    sortConferencesByAveragePointsPerGame
};

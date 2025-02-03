const fs = require('fs');

const {conferences, teams} = require('./data');

const writeData = async () => {
    await fs.writeFileSync('data/conferences.json', JSON.stringify(conferences));
    await fs.writeFileSync('data/teams.json', JSON.stringify(teams));
};

writeData()


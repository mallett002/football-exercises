import json
import statistics



with open('../data/conferences.json', 'r') as f:
    conferences = json.load(f)

with open('../data/teams.json', 'r') as f:
    teams = json.load(f)

def pretty(data):
    print(json.dumps(data, indent=4))

###################################################################
# 1. Sort the conference names by average points per game
###################################################################

# Expected:
# 'Big 12'
# 'SEC'
# 'ACC',
# 'Pac-12',
# 'Big Ten'

# Get conference ppg
# conferences.teams --> sum up each one's pointsPerGame

# Build up conference ppg
confPPGList = {}

for conf in conferences['all']:
    for teamId in conf['teams']:
        ppg = teams['index'][teamId]['pointsPerGame']
        
        if conf['id'] in confPPGList:
            confPPGList[conf['id']].append(ppg)
        else:
            confPPGList[conf['id']] = [ppg]

# sum lists
confSum = {}
for (key, ppgs) in confPPGList.items():
    confSum[key] = statistics.mean(ppgs)

confSumSorted = sorted(confSum.items(), key=lambda x: x[1], reverse=True)

result = list()

for confId in confSumSorted:
    conference = [conf for conf in conferences['all'] if conf['id'] == confId[0]]
    result.append(conference[0]['name'])



# How AI solved it:
# Calculate average points per game (APPG) for each conference
conference_stats = [
    {
        'APPG': sum(teams['index'][team_id]['points'] for team_id in conf['teams']) /
                sum(teams['index'][team_id]['games'] for team_id in conf['teams']),
        'conference': conf['name']
    }
    for conf in conferences['all']
]

# Sort conferences by APPG in descending order and extract the conference names
sorted_conference_names = [conf['conference'] for conf in sorted(conference_stats, key=lambda x: x['APPG'], reverse=True)]









###################################################################
# 2. Team with most points through uprights
###################################################################
# expected: SYRACUSE

# PATs = 1; fieldGoals = 3;

# look through each team and get a total pats + fg
# get the one with the most pts

upright_pts_per_team = [
    {
        'upright_pts': (team_data['fieldGoals'] * 3) + (team_data['PATs']),
        'team': team_data['name']
    }
    for _, team_data in teams['index'].items()
]

team_with_most_upright_pts = max(upright_pts_per_team, key=lambda x: x['upright_pts'])

print(team_with_most_upright_pts['team'])
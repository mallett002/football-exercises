import json
import statistics
from pathlib import Path

# __file__ -> path to the file

# Path -> wrap in path object
# .resolve() -> resolves symlinks
# Path(__file__).resolve()

# .parent -> get parent dir
# Path(__file__).resolve().parent

ROOT_DIR =  Path(__file__).resolve().parent.parent

with open(ROOT_DIR / "data" / "conferences.json", 'r') as f:
    conferences = json.load(f)

with open(ROOT_DIR / "data" / "teams.json", 'r') as f:
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

# map conferences to their {name, avgppg}
# sort them by their avgppg
# return just the names

conf_data = [
    {
        'avg_ppg': sum([teams['index'][team]['points'] for team in conf['teams']]) /
                   sum([teams['index'][team]['games'] for team in conf['teams']]),
        'name': conf['name'],
    }
    for conf in conferences['all']
]

sorted_confs_desc = sorted(conf_data, key=lambda x: x['avg_ppg'], reverse=True) # sort descending

mapped_result = list(map(lambda c: c['name'], sorted_confs_desc))

print(mapped_result)

# How AI solved it:
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
print(sorted_conference_names)


# ###################################################################
# # 2. Team with most points through uprights
# ###################################################################
# # expected: SYRACUSE
#
# # PATs = 1; fieldGoals = 3;
#
# # look through each team and get a total pats + fg
# # get the one with the most pts
#
# upright_pts_per_team = [
#     {
#         'upright_pts': (team_data['fieldGoals'] * 3) + (team_data['PATs']),
#         'team': team_data['name']
#     }
#     for _, team_data in teams['index'].items()
# ]
#
# team_with_most_upright_pts = max(upright_pts_per_team, key=lambda x: x['upright_pts'])
#
# the_team = team_with_most_upright_pts['team']
#
#
# ###################################################################
# # 3. Teams that have played fewer than 7 games
# ###################################################################
# # expected:
# # database.teams.ARIZONA_STATE.name,
# # database.teams.CALIFORNIA.name,
# # database.teams.CLEMSON.name,
# # database.teams.COLORADO.name,
# # database.teams.DUKE.name,
# # database.teams.FLORIDA_STATE.name,
# # database.teams.ILLINOIS.name,
# # database.teams.IOWA.name,
# # database.teams.IOWA_STATE.name,
# # database.teams.KANSAS.name,
# # database.teams.KENTUCKY.name,
# # database.teams.MARYLAND.name,
# # database.teams.MICHIGAN_STATE.name,
# # database.teams.MINNESOTA.name,
# # database.teams.MISSISSIPPI_STATE.name,
# # database.teams.MISSOURI.name,
# # database.teams.NC_STATE.name,
# # database.teams.NEBRASKA.name,
# # database.teams.NORTH_CAROLINA.name,
# # database.teams.NORTHWESTERN.name,
# # database.teams.OKLAHOMA.name,
# # database.teams.OREGON.name,
# # database.teams.OREGON_STATE.name,
# # database.teams.PENN_STATE.name,
# # database.teams.PURDUE.name,
# # database.teams.SOUTH_CAROLINA.name,
# # database.teams.STANFORD.name,
# # database.teams.SYRACUSE.name,
# # database.teams.TCU.name,
# # database.teams.TENNESSEE.name,
# # database.teams.TEXAS_TECH.name,
# # database.teams.UCLA.name,
# # database.teams.USC.name,
# # database.teams.UTAH.name,
# # database.teams.VIRGINIA.name,
# # database.teams.VIRGINIA_TECH.name,
# # database.teams.WAKE_FOREST.name,
# # database.teams.WASHINGTON_STATE.name,
# # database.teams.WEST_VIRGINIA.name,
# # database.teams.WISCONSIN.name
#
# # look through teams, get ones where games < 7, get just the names
# all_teams = teams['index'].items()
#
# filtered = list(filter(lambda t: t[1]['games'] < 7, all_teams))
# sorted_by_games = sorted(filtered, key=lambda t: t[1]['games'])
# mapped = list(map(lambda t: ( t[1]['name'], t[1]['games'] ), sorted_by_games))
#
# # pretty(mapped)
#
#
# # Using list comprehension
# # Look through teams, get ones where games < 7, get just the names, and sort by games
# filtered_and_sorted = sorted(
#     (
#         (team['name'], team['games'])
#         for _, team in teams['index'].items() if team['games'] < 7
#     ),
#     key=lambda t: t[1]
# )
#
# # Same thing as above, but mapping to get just the names
# filtered_and_sorted_and_mapped_to_name = list(map(
#     lambda t: t[0],
#     sorted(
#         (
#             (team['name'], team['games'])
#             for _, team in teams['index'].items() if team['games'] < 7
#         ),
#         key=lambda t: t[1]
#     )
# ))
#
# # my attempt again:
# teasm_sorted_by_fewest_games_played = list(map(lambda t: t['name'], sorted([
#     team
#     for _, team in teams['index'].items() if team['games'] < 7
# ], key=lambda t: t['games'])))
#
#
#
#
#
#
# ###################################################################
# # 4. Team with the best touchdown to field goal ratio
# ###################################################################
# # expected: "Georgia Tech"
# teams_td_fgs = [
#     {
#         'td_to_fg': team['touchdowns'] / team['fieldGoals'],
#         'name': team['name'],
#     }
#     for _, team in teams['index'].items()
# ]
#
# best_td_fg_ratio = max(teams_td_fgs, key=lambda x: x['td_to_fg'])
#
# # pretty(best_td_fg_ratio['name']) # Georgia Tech
#
#
#
# ###################################################################
# # 5. The conference with the fewest teams
# ###################################################################
# # Expected: BIG_12
#
# conf_data = [ 
#     {
#         'team_count': len(conf['teams']),
#         'name': conf['name'],
#     } 
#     for conf in conferences['all']
# ]
#
# conf_fewest_teams = min(conf_data, key=lambda x: x['team_count'])
#
# # pretty(conf_data)
# # print(conf_fewest_teams['name']) # Big 12
#
#
#
#
#
# ###################################################################
# # 6. The team nicknames for teams with at least one safety or two point conversion - sorted by most
# ###################################################################
# teams_with_safties_or_2pt_convs = [
#     {
#         'total': team['safeties'] + team['twoPointConversions'],
#         'nickname': team['nickname'],
#     } 
#     for _, team in teams['index'].items() if team['safeties'] > 0 or team['twoPointConversions'] > 0
# ]
#
# teams_with_safties_or_2pt_convs = list(
#     map(
#         lambda x: x['nickname'],
#         sorted(teams_with_safties_or_2pt_convs, key=lambda x: x['total'], reverse=True)
#     )
# )
#
# # pretty(teams_with_safties_or_2pt_convs)

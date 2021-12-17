class team{
    constructor(teamName, goalRatio){
        this.teamName  = teamName;
        this.goalRatio = goalRatio;
    }
}

// All the teams and their stats
let germany = new team("Germany", 80, 0);
let france  = new team("France",  40, 0);
let italy   = new team("Italy",   60, 0);
let ireland = new team("Ireland", 30, 0);

// Array of the four teams
let teams = [
    germany.teamName,
    france.teamName,
    italy.teamName,
    ireland.teamName
]

// Generate round robin schedule with all teams
const roundRobin = (teams) => {
    let schedule = [];
    let league = teams.slice();

    if(league.length % 2){
        league.push('None');
    }

    let rounds = league.length;

    for(let j=0; j<(rounds-1)*1; j++){
        schedule[j] = [];
        for (let i=0; i<rounds/2; i++){
            if(league[i] !== 'None' && league[rounds-1-i] !== 'None'){
                if(j % 2 == 1){
                    schedule[j].push([league[i], league[rounds-1-i]])
                } else {
                    schedule[j].push([league[rounds-1-i], league[i]])
                }
            }
        }
        league.splice(1, 0, league.pop())
    }
    return schedule
}

let leagueSchedule = roundRobin(teams)
var names = [];

// Make one array out of all the team names in order of schedule
for(let i=0; i<leagueSchedule.length; i++){
    for(let j=0; j<leagueSchedule[j].length; j++){
        for(let r=0; r<leagueSchedule[r].length; r++){
            // Push all names into one array 
            // So we can display them one by one in order on the scoreboard
            names.push(leagueSchedule[i][j][r]);
        }
    }
}

// Store match names into match result table
for(let i=0; i<leagueSchedule.length; i++){
    for(let j=0; j<leagueSchedule[j].length; j++){
        // Replace , with - between the two names
        leagueSchedule[i][j] = leagueSchedule[i][j].join(" - ");
        // Create table heads for result table
        var th = document.createElement("TH");
        document.getElementById("resultTH").append(th);
        th.appendChild(document.createTextNode(leagueSchedule[i][j]));
    }
}


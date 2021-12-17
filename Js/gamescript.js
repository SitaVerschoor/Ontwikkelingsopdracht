$(document).ready(function(){
    // Define variables
    var inProgress    = false;
    var pouleFinished = false;
    var resetButton   = false;
    var matches = 1;
    var rounds  = 1;

    // Teams
    var team1;
    var team2;
    var t1=0;
    var t2=1;
    var germany1 = false;
    var germany2 = false;
    var france1  = false;
    var france2  = false;
    var italy1   = false;
    var italy2   = false;
    var ireland1 = false;
    var ireland2 = false;

    // Stats
    var goalRatio1;
    var goalRatio2;
    var allGoalsGermany = 0;
    var allGoalsFrance  = 0;
    var allGoalsItaly   = 0;
    var allGoalsIreland = 0;
    var allConGermany   = 0;
    var allConFrance    = 0;
    var allConItaly     = 0;
    var allConIreland   = 0;
    var pointsGermany   = 0;
    var pointsFrance    = 0;
    var pointsItaly     = 0;
    var pointsIreland   = 0;

    // Onclick start match
    $('.start').click(function(){
        // Reset all booleans
        germany1 = false;
        germany2 = false;
        france1  = false;
        france2  = false;
        italy1   = false;
        italy2   = false;
        ireland1 = false;
        ireland2 = false;
    
        if(inProgress == true) {
            // Game is in progress
            return false;
        }

        // Show reset button if poul has finished
        if (pouleFinished && resetButton == false){
            $('.buttons').append('<button onClick="window.location.reload();" class="reset">Reset Poule</button>');
            resetButton = true;
        }

        if(!pouleFinished){
            // Reset score when starting new match
            document.getElementById("score1").textContent="0";
            document.getElementById("score2").textContent="0";

            // Scoreboard
            let score1 = 0;
            let score2 = 0;
            let totalScore;

            // Set timer
            var minute = $('.match-timer');
            var ht     = 0;

            // Check if game is finished
            // Set match timer back to 0
            if(parseInt(minute.text()) == 90 && inProgress == false) {$('.match-timer').text('0')};

            // Set team names
            team1 = names[t1];
            team2 = names[t2];
            // Get next two names from names array
            t1 = t1+2;
            t2 = t2+2;

            // Display total matches played
            document.getElementById("match-value").textContent=matches;
            document.getElementById("round-value").textContent=rounds;

            // Display team names
            document.getElementById("teamName1").textContent=team1;
            document.getElementById("teamName2").textContent=team2;

            // Set game as "in progress"
            inProgress = true;

            // Determine team 1
            if(team1 == germany.teamName) {germany1 = true};
            if(team1 == france.teamName)  {france1  = true};
            if(team1 == italy.teamName)   {italy1   = true};
            if(team1 == ireland.teamName) {ireland1 = true};

            // Determine team 2
            if(team2 == germany.teamName) {germany2 = true};
            if(team2 == france.teamName)  {france2  = true};
            if(team2 == italy.teamName)   {italy2   = true};
            if(team2 == ireland.teamName) {ireland2 = true};

            // Set goalratio's for this match
            if(germany1) {goalRatio1=germany.goalRatio};
            if(germany2) {goalRatio2=germany.goalRatio};
            if(france1)  {goalRatio1=france.goalRatio};
            if(france2)  {goalRatio2=france.goalRatio};
            if(italy1)   {goalRatio1=italy.goalRatio};
            if(italy2)   {goalRatio2=italy.goalRatio};
            if(ireland1) {goalRatio1=ireland.goalRatio};
            if(ireland2) {goalRatio2=ireland.goalRatio};

            // Start interval
            var match = setInterval(function(){
                // Check if match is finished
                if(parseInt(minute.text()) == 90){
                    // Match has finished
                    clearInterval(match);
                    inProgress = false;

                    // Create total score
                    totalScore = score1 + " - " + score2;

                    // Add score to result table
                    var th = document.createElement("TH");
                    document.getElementById("resultScore").append(th);
                    th.appendChild(document.createTextNode(totalScore));

                    if(score1 == score2){
                        // Draw, add 1 point to both teams
                        if(germany1) {pointsGermany = pointsGermany +1; $('#pointsGermany').text(pointsGermany)};
                        if(france1)  {pointsFrance  = pointsFrance  +1; $('#pointsFrance') .text(pointsFrance)};
                        if(italy1)   {pointsItaly   = pointsItaly   +1; $('#pointsItaly')  .text(pointsItaly)};
                        if(ireland1) {pointsIreland = pointsIreland +1; $('#pointsIreland').text(pointsIreland)};
                        if(germany2) {pointsGermany = pointsGermany +1; $('#pointsGermany').text(pointsGermany)};
                        if(france2)  {pointsFrance  = pointsFrance  +1; $('#pointsFrance') .text(pointsFrance)};
                        if(italy2)   {pointsItaly   = pointsItaly   +1; $('#pointsItaly')  .text(pointsItaly)};
                        if(ireland2) {pointsIreland = pointsIreland +1; $('#pointsIreland').text(pointsIreland)};
                    }
                    if (score1 > score2){
                        // team 1 wins && team 2 loses
                        if(germany1) {pointsGermany = pointsGermany +3; $('#pointsGermany').text(pointsGermany)};
                        if(france1)  {pointsFrance  = pointsFrance  +3; $('#pointsFrance') .text(pointsFrance)};
                        if(italy1)   {pointsItaly   = pointsItaly   +3; $('#pointsItaly')  .text(pointsItaly)};
                        if(ireland1) {pointsIreland = pointsIreland +3; $('#pointsIreland').text(pointsIreland)};
                    }
                    if (score1 < score2){
                        // team 2 wins && team 1 loses
                        if(germany2) {pointsGermany = pointsGermany +3; $('#pointsGermany').text(pointsGermany)};
                        if(france2)  {pointsFrance  = pointsFrance  +3; $('#pointsFrance') .text(pointsFrance)};
                        if(italy2)   {pointsItaly   = pointsItaly   +3; $('#pointsItaly')  .text(pointsItaly)};
                        if(ireland2) {pointsIreland = pointsIreland +3; $('#pointsIreland').text(pointsIreland)};
                    }  

                    // Add +1 to matches
                    if(matches <= 6){matches++};
                    // Stop adding matches and show poule as finished
                    if(matches >= 7){pouleFinished = true};

                    // Add round when total matches is odd
                    if(Math.abs(matches%2) == 1){rounds = rounds +1};

                    return false;
                }

                // Check for halftime
                if(parseInt(minute.text()) == 45){
                    // It's halftime
                    // Pause match for couple seconds
                    if(ht <= 20){ht++; return false};
                }              

                // Array of goal ratio's
                let goalRatios = [goalRatio1, goalRatio2];
                // Calculate the ratio's
                // The higher the ratio's the more likely you will score if the scoring event happens
                goalRatios.forEach((e,i)=>goalRatios[i]=(i==0)?e:e+goalRatios[i-1]);
                let max = goalRatios[goalRatios.length-1];
                let rand = Math.floor( Math.random()*(max));

                // Generate random number
                let n = Math.random() * 1000;

                // Chance of getting scoring event
                if(n < 50){
                    // GOAAALLLLL
                    if(rand<=goalRatio1){
                        // Update score on scoreboard
                        score1++;
                        document.getElementById("score1").textContent=score1;
                        
                        // Add goal to team 1
                        if(germany1) {allGoalsGermany++; $('#goalsGermany').text(allGoalsGermany)};
                        if(france1)  {allGoalsFrance++;  $('#goalsFrance') .text(allGoalsFrance)};
                        if(italy1)   {allGoalsItaly++;   $('#goalsItaly')  .text(allGoalsItaly)};
                        if(ireland1) {allGoalsIreland++; $('#goalsIreland').text(allGoalsIreland)};

                        // Add conceded goal to team 2
                        if(germany2) {allConGermany++; $('#conGermany').text(allConGermany)};
                        if(france2)  {allConFrance++;  $('#conFrance') .text(allConFrance)};
                        if(italy2)   {allConItaly++;   $('#conItaly')  .text(allConItaly)};
                        if(ireland2) {allConIreland++; $('#conIreland').text(allConIreland)};
                    } else if (rand<=goalRatio2){
                        // Update score on scoreboard
                        score2++;
                        document.getElementById("score2").textContent=score2;

                        // Add goal to team 2
                        if(germany2) {allGoalsGermany++; $('#goalsGermany').text(allGoalsGermany)};
                        if(france2)  {allGoalsFrance++;  $('#goalsFrance') .text(allGoalsFrance)};
                        if(italy2)   {allGoalsItaly++;   $('#goalsItaly')  .text(allGoalsItaly)};
                        if(ireland2) {allGoalsIreland++; $('#goalsIreland').text(allGoalsIreland)};

                        // Add conceded goal to team 1
                        if(germany1) {allConGermany++; $('#conGermany').text(allConGermany)};
                        if(france1)  {allConFrance++;  $('#conFrance') .text(allConFrance)};
                        if(italy1)   {allConItaly++;   $('#conItaly')  .text(allConItaly)};
                        if(ireland1) {allConIreland++; $('#conIreland').text(allConIreland)};
                    }
                }

            // Increment time
            minute.text(parseInt(minute.text()) + 1);

            }, 120);
        }    
    });
});

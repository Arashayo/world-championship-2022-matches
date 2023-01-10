document.getElementById('add-match-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var completed = document.getElementById('completed');

    var homeTeam = document.getElementById('home-team').value;
    var homeTeamScore = document.getElementById('home-team-score').value;
    var awayTeam = document.getElementById('away-team').value;
    var awayTeamScore = document.getElementById('away-team-score').value;
    var matchDate = document.getElementById('match-date').value;

    var completed = document.getElementById('completed');
    completed.innerHTML = "Match added succesfully"
    homeTeam.innerHTML = " ";

    var data = { HomeTeam: homeTeam, HomeTeamScore: homeTeamScore, AwayTeam: awayTeam, AwayTeamScore: awayTeamScore, DateUtc: matchDate };



    fetch('/addMatch', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            document.getElementById('home-team').value = "";
            document.getElementById('home-team-score').value = "";
            document.getElementById('away-team').value = "";
            document.getElementById('away-team-score').value ="";
            document.getElementById('match-date').value = "";
            setTimeout(function () {
                completed.innerHTML = "";
            }, 5000);
        });


});

function getM() {
    fetch('http://localhost:3000/allMatches')
        .then(response => response.json())
        .then(json => showTable(json));
}

function showTable(json) {
        json.sort((a, b) => {
        let dateA = new Date(a.DateUtc);
        let dateB = new Date(b.DateUtc);
        return dateA - dateB;
    });
    let app = document.querySelector('#match');
    let _dateCHCK = "";
    
    json.forEach(element => {
        let tr = document.createElement('tr');
        _dateCHCK = DateCHNG(_dateCHCK);
        let test = DateCHNG(element.DateUtc);

        if(test.substring(0,5)===_dateCHCK.substring(0,5)){}
        else{
        app.append(tr);
            let _date = document.createElement("td");
            _date.innerHTML = DateCHNG(element.DateUtc);
            _date.setAttribute("colspan", "5");
            _date.setAttribute("class", "table-active");
            app.append(_date);
            _dateCHCK = DateCHNG(element.DateUtc);
        }
        app.append(tr);

        let _homeTeam = document.createElement('td');
        _homeTeam.innerHTML = element.HomeTeam;
        tr.append(_homeTeam);

        let _homeTeamScore = document.createElement('td');
        _homeTeamScore.innerHTML = element.HomeTeamScore;
        tr.append(_homeTeamScore);

        let x = document.createElement('td');
        x.innerHTML = ":";
        tr.append(x);

        let _awayTeamScore = document.createElement('td');
        _awayTeamScore.innerHTML = element.AwayTeamScore;
        tr.append(_awayTeamScore);

        let _awayTeam = document.createElement('td');
        _awayTeam.innerHTML = element.AwayTeam;
        tr.append(_awayTeam);

        _dateCHCK = element.DateUtc;

    });

}

function searchTeam() {
    const team = document.getElementById('team').value;
    fetch(`http://localhost:3000/search/${team}`)
      .then(response => response.json())
      .then(data => {
        let results = '<table class="table table-dark" style="background-color: #042e41"><tr><th scope="col">Date</th><th scope="col">Home Team</th><th scope="col">Away Team</th><th scope="col">Goals</th></tr>';
        data.forEach(match => {
          results += `<tr><td>${DateCHNG(match.DateUtc)}</td><td>${match.HomeTeam}</td><td>${match.AwayTeam}</td><td>${match.HomeTeamScore}-${match.AwayTeamScore}</td></tr>`;
        });
        results += '</table>';
        document.getElementById('results').innerHTML = results;
      });
  }
  
  function DateCHNG(x)
  {
      let date = new Date(Date.parse(x));
      return(date.getDate() + "." +date.getMonth()+ "." +date.getFullYear());
  }
// api token: 4W0q1nUPZphkFPWBg8ZoATJAbfycu4FNtdZSq5zlXJV63jxGtAipkGbAHNLD
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_ENDPOINT = PROXY_URL + "https://api.sportmonks.com/v3/football/players/countries/1161?api_token=4W0q1nUPZphkFPWBg8ZoATJAbfycu4FNtdZSq5zlXJV63jxGtAipkGbAHNLD&include=";
    
    function fetchPlayers() {
        fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => displayPlayers(data))
        .catch(error => console.error("Error fetching data:", error));
    }

    function displayPlayers(responseData) {
        var playersContainer = document.getElementById('playersContainer');
        responseData.data.forEach(function(player) {
            var playerCard = document.createElement('div');
            playerCard.className = "player-card";

            var playerName = document.createElement('h3');
            playerName.innerText = player.name;
            playerCard.appendChild(playerName);

            var playerImage = document.createElement('img');
            playerImage.src = player.image_path;
            playerCard.appendChild(playerImage);

            var playerAge = document.createElement('p');
            var birthDate = new Date(player.date_of_birth);
            var age = new Date().getFullYear() - birthDate.getFullYear();
            playerAge.innerText = "Age: " + age;
            playerCard.appendChild(playerAge);

            var playerPosition = document.createElement('p');
            playerPosition.innerText = "Position: " + (player.position_id || "N/A");
            playerCard.appendChild(playerPosition);

            playersContainer.appendChild(playerCard);
        });
    }

    // Fetch and display players on page load
    fetchPlayers();
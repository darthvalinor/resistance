var Rules = {

    Missions: {
        For5: [2, 3, 2, 3, 3],
        For6: [2, 3, 4, 3, 4],
        For7: [2, 3, 3, 4, 4],
        For8plus: [3, 4, 4, 5, 5]
    },

    Roles: {
        Loyalist: function() {
            return new Role('Loyalist', false);
        },
        Merlin: function() {
            return new Role('Merlin', false);
        },
        Percival: function() {
            return new Role('Percival', false);
        },
        Mordred: function() {
            return new Role('Mordred', true);
        },
        Morgana: function() {
            return new Role('Morgana', true);
        },
        Assassin: function() {
            return new Role('Assassin', true);
        },
        Spy: function() {
            return new Role('Spy', true);
        }
    },

    readyForStart: function(currentGame) {
        if (currentGame.numberOfPlayers < 5 || currentGame.numberOfPlayers > 10) {
            alert('Number of players must be from 5 up to 10!')
            return false;
        }
        return true;
    },

    getMission: function(missionNumber, numberOfPlayers) {
        var requiredPlayers = 0;
        if (numberOfPlayers == 5) {
            requiredPlayers = this.Missions.For5[missionNumber - 1];
        } else if (numberOfPlayers == 6) {
            requiredPlayers = this.Missions.For6[missionNumber - 1];
        } else if (numberOfPlayers == 7) {
            requiredPlayers = this.Missions.For7[missionNumber - 1];
        } else if (numberOfPlayers >= 8 && numberOfPlayers <= 10) {
            requiredPlayers = this.Missions.For8plus[missionNumber - 1];
        }
        return new Mission(requiredPlayers);
    }

};

var Mission = function(requiredPlayers) {
    this.requiredPlayers = requiredPlayers;
}

var Role = function(name, isMafia) {
    this.name = name;
    this.isMafia = isMafia;
}

var Player = function(name) {
    this.name = name;
    this.role = null;
}

var Game = function(numberOfPlayers,players) {
    this.numberOfPlayers = numberOfPlayers;
    this.players = players;
    this.currentMissionNumber = 0;
    this.mission = null;

    this.start = function() {
        console.log('The game has been started for ' + this.numberOfPlayers + ' players!');
        this.players.forEach(function(player) {
            console.log('Welcome ' + player.name);
        });
        this.startNewMission();
    };

    this.startNewMission = function() {
        this.currentMissionNumber++;
        this.mission = Rules.getMission(this.currentMissionNumber, numberOfPlayers);
        console.log('Mission ' + this.currentMissionNumber + ' starts... Players required : ' + this.mission.requiredPlayers);
    }
};
var Rules = {

    Missions: {
        For5: [2, 3, 2, 3, 3],
        For6: [2, 3, 4, 3, 4],
        For7: [2, 3, 3, 4, 4],
        For8plus: [3, 4, 4, 5, 5]
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
    },

    Cards: {
        NoConfidence: function() {
            return new Card('NoConfidence', false);
        },
        StrongLeader: function() {
            return new Card('StrongLeader', false);
        },
        Orator: function() {
            return new Card('Orator', false);
        },
        Overheard: function() {
            return new Card('Overheard', true);
        },
        KeepEye: function() {
            return new Card('KeepEye', false);
        },
        TakeResponsibility: function() {
            return new Card('TakeResponsibility', false);
        },
        NoCover: function() {
            return new Card('NoCover', false);
        },
        OpenUp: function() {
            return new Card('OpenUp', true);
        },
        CheckLeader: function() {
            return new Card('CheckLeader', true);
        }
    },

    getCards(numberOfPlayers) {
        var cards = [
            this.Cards.NoConfidence(),
            this.Cards.StrongLeader(),
            this.Cards.StrongLeader(),
            this.Cards.Orator(),
            this.Cards.KeepEye(),
            this.Cards.KeepEye(),
            this.Cards.TakeResponsibility()
        ];
        if (numberOfPlayers >= 7) {
            cards.push(
                this.Cards.NoConfidence(),
                this.Cards.NoConfidence(),
                this.Cards.Orator(),
                this.Cards.Overheard(),
                this.Cards.Overheard(),
                this.Cards.NoCover(),
                this.Cards.OpenUp(),
                this.Cards.CheckLeader()
            );
        }
        return cards;
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

    getRoles: function(numberOfPlayers) {
        var roles = [];
        if (numberOfPlayers == 5) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Spy());
            roles.push(this.Roles.Spy());
        } else if (numberOfPlayers == 6) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Spy());
            roles.push(this.Roles.Spy());
        } else if (numberOfPlayers == 7) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Merlin());
            roles.push(this.Roles.Percival());
            roles.push(this.Roles.Mordred());
            roles.push(this.Roles.Morgana());
            roles.push(this.Roles.Assassin());
        } else if (numberOfPlayers == 8) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Merlin());
            roles.push(this.Roles.Percival());
            roles.push(this.Roles.Mordred());
            roles.push(this.Roles.Morgana());
            roles.push(this.Roles.Assassin());
        } else if (numberOfPlayers == 9) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Merlin());
            roles.push(this.Roles.Percival());
            roles.push(this.Roles.Mordred());
            roles.push(this.Roles.Morgana());
            roles.push(this.Roles.Assassin());
        } else if (numberOfPlayers == 10) {
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Loyalist());
            roles.push(this.Roles.Merlin());
            roles.push(this.Roles.Percival());
            roles.push(this.Roles.Mordred());
            roles.push(this.Roles.Morgana());
            roles.push(this.Roles.Assassin());
            roles.push(this.Roles.Spy());
        }
        return roles;
    },

    readyForStart: function(currentGame) {
        if (currentGame.numberOfPlayers < 5 || currentGame.numberOfPlayers > 10) {
            alert('Number of players must be from 5 up to 10!')
            return false;
        }
        return true;
    }

};

var Mission = function(requiredPlayers) {
    this.requiredPlayers = requiredPlayers;
}

var Role = function(name, isMafia) {
    this.name = name;
    this.isMafia = isMafia;
}

var Card = function(name, isReveal) {
    this.name = name;
    this.isReveal = isReveal;
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
    this.leader = null;

    this.start = function() {
        var roles = Rules.getRoles(this.numberOfPlayers);

        //prevent issues
        if (roles.length != this.numberOfPlayers) {
            alert('Error: could not generate roles');
            return;
        }

        // give roles randomly
        var taken = [];
        var self = this; //TODO
        this.players.forEach(function(p) {
            var role = null;
            do {
                role = roles[Utils.randomInt(self.numberOfPlayers)];
            } while (taken.indexOf(role) > -1);
            taken.push(role);
            p.role = role;
        });

        // assign leader randomly
        this.leader = players[Utils.randomInt(this.numberOfPlayers)];
        
        this.startNewMission();
    };

    this.startNewMission = function() {
        this.currentMissionNumber++;
        this.mission = Rules.getMission(this.currentMissionNumber, numberOfPlayers);
    }
};

var Utils = {
    // [0, cap)
    randomInt: function(cap) {
        return Math.floor(Math.random() * cap);
    }
}
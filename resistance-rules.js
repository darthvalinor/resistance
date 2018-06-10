var Rules = {

    Missions: {
        For5: [2, 3, 2, 3, 3],
        For6: [2, 3, 4, 3, 4],
        For7: [2, 3, 3, 4, 4],
        For8plus: [3, 4, 4, 5, 5]
    },

    getMissions: function(numberOfPlayers) {
        var missions = [];
        for (var i = 0; i < 5; i++) {
            var requiredPlayers = 0;
            if (numberOfPlayers == 5) {
                requiredPlayers = this.Missions.For5[i];
            } else if (numberOfPlayers == 6) {
                requiredPlayers = this.Missions.For6[i];
            } else if (numberOfPlayers == 7) {
                requiredPlayers = this.Missions.For7[i];
            } else if (numberOfPlayers >= 8 && numberOfPlayers <= 10) {
                requiredPlayers = this.Missions.For8plus[i];
            }
            missions.push(new Mission(requiredPlayers));
        }
        return missions;
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

    getDeck(numberOfPlayers) {
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

    getNumberOfCards(numberOfPlayers) {
        var numberOfCards = 1;
        if (numberOfPlayers == 7 || numberOfPlayers == 8) {
            numberOfCards = 2;
        } else if (numberOfPlayers == 9 || numberOfPlayers == 10) {
            numberOfCards = 3;
        }
        return numberOfCards;
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

    Phases: {
        New: 'New',
        MissionCards: 'MissionCards',
        MissionVote: 'MissionVote',
        MissionStarts: 'MissionStarts',
        MissionInProgress: 'MissionInProgress',
        MissionResult: 'MissionResult'
    }

}

var Mission = function(requiredPlayers) {
    this.requiredPlayers = requiredPlayers;
    this.participants = [];
    this.result = false;
}

var Role = function(name, isMafia) {
    this.name = name;
    this.isMafia = isMafia;
}

var Card = function(name, isReveal) {
    this.name = name;
    this.isReveal = isReveal;
    this.used = false;
}

var Player = function(name, id) {
    this.name = name;
    this.id = id;
    this.role = null;
    this.cards = [];
    this.cardToTake = null;
    this.cardsToGive = [];
}
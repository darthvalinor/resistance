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

};

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

var Game = function(numberOfPlayers,players) {
    this.numberOfPlayers = numberOfPlayers;
    this.players = players;
    this.phase = Rules.Phases.New;
    this.missionNumber = 0;
    this.missions = [];
    this.leader = null;
    this.leaderCount = 0;
    this.nominated = [];
    this.deck = null;

    this.start = function() {
        if (this.phase != Rules.Phases.New) return;

        var roles = Rules.getRoles(this.numberOfPlayers);

        Utils.shuffle(roles);
        this.players.forEach(function(p) {
            p.role = roles.pop();
        });

        this.deck = Rules.getDeck(this.numberOfPlayers);
        Utils.shuffle(this.deck);

        this.leader = Utils.random(this.players);
        
        this.missions = Rules.getMissions(numberOfPlayers);
        
        this.startMission();
    };

    this.startMission = function() {
        if (!(this.phase == Rules.Phases.New
          || (this.phase == Rules.Phases.MissionResult && this.missionNumber < 5))) return;

        this.missionNumber++;

        for (var i = 0; i < Rules.getNumberOfCards(numberOfPlayers); i++) {
            this.leader.cardsToGive.push(this.deck.pop());
        }

        this.phase = Rules.Phases.MissionCards;
    };

    this.currentMission = function() {
        return this.missions[this.missionNumber-1];
    };

    this.giveCard = function(card, player) {
        if (this.phase != Rules.Phases.MissionCards) return;
        if (this.leader.cardsToGive.indexOf(card) < 0) return;
        if (player.cardToTake) return;

        Utils.remove(this.leader.cardsToGive, card);

        if (card.name == 'TakeResponsibility' && this.othersHaveNoCards(player)) {
            card = this.deck.pop();
        }
        player.cardToTake = card;

        if (this.leader.cardsToGive == 0) {
            this.startVote()
        }
    };

    this.othersHaveNoCards = function (except) {
        for (var i = 0; i < this.numberOfPlayers; i++) {
            if (this.players[i] != except && this.players[i].cards.length > 0) {
                return false;
            }
        }
        return true;
    };

    this.startVote = function() {
        this.leaderCount++;
        if (this.leaderCount == 1) {
            this.phase = Rules.Phases.MissionVote;
            this.players.forEach(function(p) {
                if (p.cardToTake) {
                    p.cards.push(p.cardToTake);
                    p.cardToTake = null;
                }
            });
        }
    };

    this.nominate = function() {

    };
};

var Utils = {
    // [0, cap)
    randomInt: function(cap) {
        return Math.floor(Math.random() * cap);
    },

    shuffle: function (arr) {
        var i, j;
        var box;
        for (i = arr.length - 1; i > 0; i--) {
            j = this.randomInt(i + 1);
            box = arr[i];
            arr[i] = arr[j];
            arr[j] = box;
        }
        return arr;
    },

    remove: function(arr, e) {
        var index = arr.indexOf(e);
        if (index >= 0) {
          arr.splice(index, 1);
        }
    },

    random: function(arr) {
        return arr[this.randomInt(arr.length)];
    },

    randomExcept: function(arr, except) {
        var element;
        do {
            element = this.random(arr);
        } while (except.indexOf(element) >- 1);
        return element;
    }
}
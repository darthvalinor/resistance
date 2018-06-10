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

    this.nominate = function(nominees) {

    };
}
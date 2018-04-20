var ResistanceRules = {
    readyForStart: function(game) {
        if (game.numberOfPlayers < 5 || game.numberOfPlayers > 10) {
            alert('Number of players must be from 5 up to 10!')
            return false;
        }
        return true;
    },

};

var ResistanceGame = function(numberOfPlayers,players) {
    this.numberOfPlayers = numberOfPlayers || 10;
    this.players = players || ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].slice(0, this.numberOfPlayers);
    this.roles = ['fighter', 'merlin', 'percival', 'mordred', 'morgana', 'killer'];
    this.missions = [2, 3, 3, 4, 4];
    this.states = [];
};
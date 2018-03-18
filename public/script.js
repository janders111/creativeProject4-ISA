var app = new Vue({
	el: '#content',
	data: {	
		votes: {Isaac: 0, Jordan: 0},
		hasVoted: false,
		winner: "Isaac",
		percent: 50,
	},
	created: function() {
		this.getVotes();
		this.calculateWinner();
	},
	methods: {
		getVotes: function () {
			axios.get("/api/votes").then(response => {
				this.votes = response.data;
				console.log(this.votes.Isaac);
				this.calculateWinner();
				return true;
			}).catch(err => {
			});
		},
		castVote: function (name) {
			console.log(name);
			if (!this.hasVoted) {
				axios.post("/api/votes", {
					nominee: name
				}).then(response => {
					this.getVotes();
					this.calculateWinner();
					this.hasVoted = true;
					return true;
				}).catch(err => {
				});
			}
		},
		calculateWinner: function () {
			if (this.votes.Isaac > this.votes.Jordan) {
				this.winner = "Isaac";
				this.percent = Math.floor(100*(this.votes.Isaac / (this.votes.Jordan + this.votes.Isaac)));
			} else if (this.votes.Isaac < this.votes.Jordan) {
				this.winner = "Jordan";
				this.percent = Math.floor(100*(this.votes.Jordan / (this.votes.Isaac + this.votes.Jordan)));
			} else {
				this.winner = "Nobody";
				this.percent = 50;
			}
		}
	}
});

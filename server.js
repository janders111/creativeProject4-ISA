const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

let votes = {Isaac: 0, Jordan: 0}

app.get('/api/votes', (req, res) => {
	res.send(votes);
});

app.post('/api/votes', (req, res) => {
	console.log(req.body);
	if (req.body.nominee in votes) {
		votes[req.body.nominee]++;
		console.log('Voter ' + req.body.nominee + " voted for");
	} else {
		votes[req.body.nominee] = 1;
		console.log('Voter ' + req.body.nominee + " created!");
	}
	res.send(votes);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

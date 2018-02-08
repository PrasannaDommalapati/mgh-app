let express = require('express');
let path    = require('path');

let app  = express();
let port = process.env.PORT || 80;
let dist = '/usr/src/app/dist';

app.use(express.static(dist));

app.all('*', function (req, res) {

	res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port);

exports = module.exports = app;
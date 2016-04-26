const app = require('express')();

app.get('/', (req, res) => {
    res.send('Brexit Bot!');
});

app.listen(1337);

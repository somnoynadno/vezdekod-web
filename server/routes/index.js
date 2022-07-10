let express = require('express');
let router = express.Router();

let json = require('./../data/large.json'); //(with path)


/* Get mailbox */
router.get('/mailbox', function (req, res) {
    let from = req.query.from;
    let to = req.query.to;

    res.status(200).send(json.slice(from, to));
});

/* Update read on a single message */
router.post('/mailbox/read/:id', function (req, res) {
    let messageId = req.params.id;

    if (messageId >= 0 && messageId < json.length) {
        json[messageId].read = !json[messageId].read;
        res.status(200).send({"status": true, "message": "OK"});
    } else {
        res.status(404).send({"status": false, "message": "Not found"});
    }
});

/* Update flag on a single message */
router.post('/mailbox/flag/:id', function (req, res) {
    let messageId = req.params.id;

    if (messageId >= 0 && messageId < json.length) {
        json[messageId].flag = !json[messageId].flag;
        res.status(200).send({"status": true, "message": "OK"});
    } else {
        res.status(404).send({"status": false, "message": "Not found"});
    }
});

module.exports = router;

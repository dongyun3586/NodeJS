var express = require('express');
var router = express.Router();

router.get('/', (req, res) => res.send('<h1>Get request</h1>'))
router.get('/book', (req, res) => res.send('<h1>Get a book</h1>'))
router.route('/user')
    .get((req, res) => res.send('<h1>Get a user</h1>'))
    .post((req, res) => res.send('<h1>Add a user</h1>'))
    .put((req, res) => res.send('<h1>Update a user</h1>'))
    .delete((req, res) => res.send('<h1>Delete a user</h1>'))

module.exports = router;
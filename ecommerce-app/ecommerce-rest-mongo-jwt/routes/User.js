const router = require('express').Router();

router.get('/usertest', async (req, res) => {
    res.json({message: 'Connected'});
});

router.post('/userposttest', async(req, res) => {
    const useranme = req.body.username;
    res.json({username});
});

module.exports = router;
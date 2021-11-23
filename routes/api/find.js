const express = require('express');
const router = express.Router();
const petCtrl = require('../../controllers/pets');

/*---------- Public Routes ----------*/
router.post('/', petCtrl.find);


/*---------- Protected Routes ----------*/




module.exports = router;
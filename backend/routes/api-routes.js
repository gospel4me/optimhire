// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Optimum crafted with love!',
    });
});
// Import student controller
var studentController = require('../StudentsController/students');
// student routes
router.route('/students')
    .get(studentController.index)
    .post(studentController.new);

    router.route('/average').get(studentController.average)
// Export API routes
module.exports = router;
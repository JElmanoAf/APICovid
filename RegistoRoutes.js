// initialize express router
let router = require ('express'). Router ();

// set default API response
router.get ('/', function (req, res) {
    res.json ({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

// Import Covid Controller
var RegistoController = require ('./ RegistoController');

// Covid routes
router.route ('/ covid')
    .get (RegistoController.index)
    .post (RegistoController.add);

router.route ('/ covid /: covid_id')
    .get (RegistoController.view)
    .patch (RegistoController.update)
    .put (RegistoController.update)
    .delete (RegistoController.delete);

// Export API routes
module.exports = router;
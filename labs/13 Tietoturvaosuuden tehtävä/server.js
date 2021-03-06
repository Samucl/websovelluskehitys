var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
})
app.post('/process_post', urlencodedParser,
        [check('first_name').isLength({ min: 2 }).withMessage("At least two characters!"),
        check('last_name').isLength({ min: 2 }).withMessage("At least two characters!"),
        check('age').isDecimal().withMessage("should contain only numbers!"),
        check('email').isEmail().withMessage("should be an email!")],
        function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    // Prepare output in JSON format
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        age:req.body.age
    };
    console.log(response);
    res.end(JSON.stringify(response));
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

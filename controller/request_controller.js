import RequestModel from '../models/request_model';


// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 20;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "all";
    const response = {"model": RequestModel.info(),"currentPage": page, "data": [], "perPage": resPerPage, "lastPage": false}
    var regexQuery;
    if (category === "all") {
        regexQuery = {}
    }
    RequestModel.countDocuments(regexQuery, function (err, count) {
        if (count <= (resPerPage * page)) {
            response.lastPage = true
        }
    })
    RequestModel.find(regexQuery, function (err, docs) {
        response.data = docs;
        res.send(response);
    }).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort('publishedAt');

};

// Show the form for creating a new resource.
exports.create = function (req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Store a newly created resource in storage.
exports.store = function (req, res) {
    var body = req.body;
    // console.log(body);
    var newRequest = new RequestModel({
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email,
        category: body.category,
        descr: body.descr,
        // like: body.like,
    });
    newRequest.save(function (err) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).send(newRequest)
        }
    });
};

// Display the specified resource.
exports.show = function (req, res) {
    RequestModel.find({_id: req.params.id},
        function (err, response) {
            res.send(response[0]);
        });
};

// Show the form for editing the specified resource.
exports.edit = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Update the specified resource in storage.
exports.update = function (req, res) {
    var body = req.body;
    RequestModel.findOneAndUpdate({_id: req.params.id},body,{ new: true}, function (err, response) {
        res.send(response)
        // console.log(response)
        //     response.save();
    });
};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {
    RequestModel.remove({_id: req.params.id}, function(err, updateObj){
        res.send(updateObj)
    });
};









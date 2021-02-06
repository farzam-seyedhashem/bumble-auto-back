import LanguageModel from '../models/language';

// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 20;
    const page = parseInt(req.query.page) || 1;
    const response = {"model": LanguageModel.info(),"currentPage": page, "data": [], "perPage": resPerPage, "lastPage": false}
    var regexQuery;
    regexQuery = {}

    LanguageModel.countDocuments(regexQuery, function (err, count) {
        if (count <= (resPerPage * page)) {
            response.lastPage = true
        }
    })
    LanguageModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort('publishedAt').populate('thumbnail').
    exec(function (err, docs) {
        console.log(docs)
        response.data = docs;
        console.log(response);
        res.send(response);
        // prints "The author is Ian Fleming"
    });

};

// Show the form for creating a new resource.
exports.create = function (req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Store a newly created resource in storage.
exports.store = function (req, res) {
    var body = req.body;
    // console.log(body);
    var newBlogCategory = new LanguageModel({
        title:body.title,
    });
    newBlogCategory.save(function (err) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).send(newBlogCategory)
        }
    });
};

// Display the specified resource.
exports.show = function (req, res) {
    LanguageModel.find({_id: req.params.id}).populate('thumbnail').exec(function (err, docs) {
        res.send(docs[0])
    });
};

// Show the form for editing the specified resource.
exports.edit = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Update the specified resource in storage.
exports.update = function (req, res) {
    var body = req.body;
    LanguageModel.findOneAndUpdate({_id: req.params.id}, body, {new: true}, function (err, response) {
        res.send(response)
    });

};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {
    LanguageModel.remove({_id: req.params.id}, function (err, updateObj) {
        res.send(updateObj)
    });
};









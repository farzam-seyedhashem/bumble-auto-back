import ServiceModel from '../models/service_model';
import BlogModel from "../models/blog_model";

// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 12;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "all";
    const response = {
        "model": ServiceModel.info(),
        "currentPage": page,
        "data": [],
        "perPage": resPerPage,
        "lastPage": false,
        "lastPageIndex":1,
    }
    var regexQuery = "";
    if (category !== "all") {
        regexQuery = {
            category: new RegExp(category, 'i')
        }

    }

    ServiceModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).populate('lang').populate('thumbnail').exec(function (err, docs) {
        BlogModel.count().exec(function (err, count) {
            response.lastPageIndex = count / resPerPage
            if (count <= (resPerPage * page)) {
                response.lastPage = true
            }
            response.data = docs;
            res.send(response);
        })
    });
    // BlogModel.find(regexQuery, function (err, docs) {
    //
    //     response.data = docs;
    //     res.send(response);
    // })
};

// Show the form for creating a new resource.
exports.create = function (req, res) {
    res.send({model: [ServiceModel.info()]});
};

// Store a newly created resource in storage.
exports.store = function (req, res) {
    var body = req.body;

    var newNews = new ServiceModel({
        title: body.title,
        slug: body.slug || body.title,
        content: body.content,
        thumbnail: body.thumbnail,
        lang: body.lang,

        // like: body.like,
    });
    newNews.save(function (err) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).send(newNews)
        }
    });
};

// Display the specified resource.
exports.show = function (req, res) {
    ServiceModel.find({slug: req.params.slug}).populate('thumbnail').exec(function (err, docs) {
        console.log(docs[0])
        res.send(docs[0])
        // prints "The author is Ian Fleming"
    });
}

// Show the form for editing the specified resource.
exports.edit = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Update the specified resource in storage.
exports.update = function (req, res) {
    var body = req.body;
    // let doc = BlogModel.findOneAndUpdate({_id: req.params.id}, body);
    ServiceModel.findOneAndUpdate({_id: req.params.id}, body, {new: true}, function (err, response) {
        res.send(response)
    });

};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {
    ServiceModel.remove({_id: req.params.id}, function (err, updateObj) {
        res.send(updateObj)
    });
};









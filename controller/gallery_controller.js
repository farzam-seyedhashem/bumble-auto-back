import BlogModel from '../models/gallery_model';

// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 12;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "all";
    const response = {
        "model": BlogModel.info(),
        "currentPage": page,
        "data": [],
        "perPage": resPerPage,
        "lastPage": false,
        "lastPageIndex":1,
    }

    BlogModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).populate('lang').populate('thumbnail').exec(function (err, docs) {
        BlogModel.count().exec(function(err, count) {
            response.lastPageIndex = count/resPerPage
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
    res.send('NOT IMPLEMENTED: Book list');
};

// Store a newly created resource in storage.
exports.store = function (req, res) {
    var body = req.body;
    // console.log(body);

    var newNews = new BlogModel({
        title:body.title,
        slug:body.slug || body.title,
        content:body.content,
        thumbnail: body.thumbnail,
        categories: body.categories,
        lang:body.lang,
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
    BlogModel.find({slug: req.params.slug}).populate('categories').populate('thumbnail').exec(function (err, docs) {
        console.log(docs[0])
        res.send(docs[0])
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
    BlogModel.findOneAndUpdate({_id: req.params.id}, body, {new: true}, function (err, response) {
        res.send(response)
    });

};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {
    BlogModel.remove({_id: req.params.id}, function (err, updateObj) {
        res.send(updateObj)
    });
};









import ImageModel from '../models/image_model';

const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";


// Display a listing of the resource.
const index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 12;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "all";
    const response = {
        "model": ImageModel.info(),
        "currentPage": page,
        "data": [],
        "perPage": resPerPage,
        "lastPage": false,
        "lastPageIndex":1,

    }
    var regexQuery = {};

    ImageModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).exec(function (err, docs) {
        ImageModel.count().exec(function(err, count) {
            response.lastPageIndex = Math.ceil(count/resPerPage)
            if (count <= (resPerPage * page)) {
                response.lastPage = true
            }
            response.data = docs;
            res.send(response);
        })
    });

};


const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            // images
            return res.status(400).send({message: "Please upload a file!"});
        } else {
            console.log(req)
            var image = new ImageModel({
                title: req.file.originalname,
                url: '/images/' + req.file.originalname,
                alt: {value:req.body.alt, lang: req.body.lang}

                // like: body.like,
            });
            image.save(function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200).send(image)
                }
            });
        }
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};
const destroy = function (req, res) {
// ./public/images/
    ImageModel.remove({_id: req.params.id}, function (err, updateObj) {
        res.send(updateObj)
    });
};

module.exports = {
    upload,
    index,
    destroy
};

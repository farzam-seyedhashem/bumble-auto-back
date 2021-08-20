import InventoryModel from '../models/inventory';

// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 12;
    const page = parseInt(req.query.page) || 1;
    const response = {
        "model": InventoryModel.info(),
        "currentPage": page,
        "data": [],
        "perPage": resPerPage,
        "lastPage": false,
        "lastPageIndex": 1,
    }

    InventoryModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).exec(function (err, docs) {
        InventoryModel.count().exec(function (err, count) {
            response.lastPageIndex = count / resPerPage
            if (count <= (resPerPage * page)) {
                response.lastPage = true
            }
            response.data = docs;
            res.send(response);
        })
    });
    // InventoryModel.find(regexQuery, function (err, docs) {
    //
    //     response.data = docs;
    //     res.send(response);
    // })


};

// Show the form for creating a new resource.
exports.create = function (req, res) {

    res.send('NOT IMPLEMENTED: Book list');
};

// Get All Car Models.
// exports.getAllCarMakes = function (req, res) {
//     InventoryModel.find({}, 'Make', function (error, makes) {
//         // console.log(makes)
//         if (error) {
//             res.send(error);
//         } else {
//             let Arr = []
//             makes.map(item =>
//                 Arr.push(item?.Make)
//             )
//             Arr = [...new Set(Arr)];
//             res.send(Arr);
//         }
//
//     });
// };
// // Get All Car Years.
// exports.getAllCarYears = function (req, res) {
//     InventoryModel.find({}, 'Year', function (error, makes) {
//         // console.log(makes)
//         if (error) {
//             res.send(error);
//         } else {
//             let Arr = []
//             makes.map(item =>
//                 Arr.push(item?.Year)
//             )
//             Arr = [...new Set(Arr)];
//             res.send(Arr);
//         }
//
//     });
// };
// Get All Car Filter.
exports.getAllFilter = function (req, res) {
    console.log('filter')
    // let response = {}
    InventoryModel.find({}, function (error, inventories) {
        // console.log(makes)
        if (error) {
            res.send(error);
        } else {
            let years = []
            let makes = []
            let price = []
            let interior = []

            inventories.map(item => {
                years.push(item?.Year)
                makes.push(item?.Year)
                price.push(item?.Price)
                interior.push(item?.InteriorColor)
            })
            years = [...new Set(years)];
            makes = [...new Set(makes)];
            price = [...new Set(price)];
            price = [price[0], price[price.length]]
            interior = [...new Set(interior)];
            const response = {years: years, makes: makes, price: price, interior: interior}
            console.log(response)
            res.send(response)

        }

    });
    InventoryModel.find({}, 'Year', function (error, makes) {
        // console.log(makes)
        if (error) {
            res.send(error);
        } else {
            let Arr = []
            makes.map(item =>
                Arr.push(item?.Year)
            )
            Arr = [...new Set(Arr)];
            response.year = Arr
            // res.send(Arr);
        }

    });
};
exports.getMainPageFilter = function (req, res) {
    // console.log('filter')
    // res.send('ffff')
    // let response = {}
    InventoryModel.find({}, function (error, inventories) {
        console.log('makes')
        if (error) {
            res.send(error);
        } else {
            let years = []
            let makes = []
            let price = []
            let interior = []

            inventories.map(item => {
                years.push(item?.Year)
                makes.push(item?.Make)
                price.push(parseFloat(item?.Price))
                interior.push(item?.InteriorColor.replace(' ','').toLowerCase())
            })
            years = [...new Set(years)];
            makes = [...new Set(makes)];
            price = price.sort();
console.log(price)
            price = [price[price.length-1],price[0]]
            interior = [...new Set(interior)];
            const response = {years: years, makes: makes, price: price, interior: interior}
            console.log(response)
            res.send(response)

        }

    });
    // InventoryModel.find({}, 'Year', function (error, makes) {
    //     // console.log(makes)
    //     if (error) {
    //         res.send(error);
    //     } else {
    //         let Arr = []
    //         makes.map(item =>
    //             Arr.push(item?.Year)
    //         )
    //         Arr = [...new Set(Arr)];
    //         response.year = Arr
    //         // res.send(Arr);
    //     }
    //
    // });
};

// // Get All Car Years.
// exports.getAllCarmodels = function (req, res) {
//     res.send('NOT IMPLEMENTED: Book list');
// };
//
// // Get All Interior Color.
// exports.getAllCarmodels = function (req, res) {
//     res.send('NOT IMPLEMENTED: Book list');
// };
//
// // Get All Price Period.
// exports.getAllCarmodels = function (req, res) {
//     res.send('NOT IMPLEMENTED: Book list');
// };


// Store a newly created resource in storage from CSV.
exports.storeRow = function (row) {
    row.slug = row.VIN
    row.photoURLS = row.Photo_URLs.split(',')
    InventoryModel.remove({}, function (err, updateObj) {
        if (err)
            console.log("err")
        else {
            new InventoryModel(row).save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('down')
                }
            });
        }
    });

};

// Store a newly created resource in storage.
exports.store = function (req, res) {
    var body = req.body;
    // console.log(body);

    var newNews = new InventoryModel({
        Phone: body.phone,
        slug: body.slug,
        content: body.content,
        thumbnail: body.thumbnail,
        categories: body.categories,
        lang: body.lang,
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
    InventoryModel.find({slug: req.params.slug}).populate('categories').populate('thumbnail').exec(function (err, docs) {
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
    // let doc = InventoryModel.findOneAndUpdate({_id: req.params.id}, body);
    InventoryModel.findOneAndUpdate({_id: req.params.id}, body, {new: true}, function (err, response) {
        res.send(response)
    });

};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {
    InventoryModel.remove({_id: req.params.id}, function (err, updateObj) {
        res.send(updateObj)
    });
};









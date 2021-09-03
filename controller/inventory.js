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
    let filterObject = {}

    req.query.year ? filterObject.Year = req.query.year : ''
    req.query.make ? filterObject.Make = req.query.make : ''
    req.query.model ? filterObject.Model = req.query.model : ''
    req.query.transmission ? filterObject.Transmission = req.query.transmission : ''
    req.query.interior ? filterObject.InteriorColor = req.query.interior : ''
    req.query.exterior ? filterObject.ExteriorColor = req.query.exterior : ''
    req.query.trim ? filterObject.Trim = req.query.trim : ''


    InventoryModel.find(filterObject).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).exec(function (err, docs) {
        InventoryModel.find(filterObject).count().exec(function (err, count) {
            response.lastPageIndex = Math.ceil(count / resPerPage)
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

exports.getAllFilter = function (req, res) {
    InventoryModel.find({}, function (error, inventories) {
        console.log('makes')
        if (error) {
            res.send(error);
        } else {
            let years = []
            let makes = []
            let price = []
            let interior = []
            let exterior = []
            let transmission = []
            let trim = []

            inventories.map(item => {
                years.push(item?.Year)
                makes.push(item?.Make)
                transmission.push(item?.Transmission)
                trim.push(item?.Trim)
                price.push(parseFloat(item?.Price))
                interior.push(item?.InteriorColor.replace(' ', '').toLowerCase())
                exterior.push(item?.ExteriorColor.replace(' ', '').toLowerCase())
            })
            years = [...new Set(years)];

            makes = [...new Set(makes)];
            transmission = [...new Set(transmission)];
            trim = [...new Set(trim)];
            price = price.sort();
            price = [price[price.length - 1], price[0]]
            interior = [...new Set(interior)];
            exterior = [...new Set(exterior)];
            const response = {
                years: years.sort(),
                trim: trim,
                transmission: transmission,
                makes: makes,
                price: price,
                interior: interior,
                exterior: exterior
            }
            console.log(response)
            res.send(response)

        }

    });
};
exports.getMainPageFilter = function (req, res) {
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
                interior.push(item?.InteriorColor.replace(' ', '').toLowerCase())
            })
            years = [...new Set(years)];
            makes = [...new Set(makes)];
            price = price.sort();
            console.log(price)
            price = [price[price.length - 1], price[0]]
            interior = [...new Set(interior)];
            const response = {years: years, makes: makes, price: price, interior: interior}
            console.log(response)
            res.send(response)

        }

    });
};


// Store a newly created resource in storage from CSV.
exports.storeRow = function (row) {
    row.slug = row.VIN
    row.photoURLS = row.Photo_URLs.split(',')
    const price = parseFloat(row.Price)

    row.finance = Number((price * (.000267 * (1.000267 ^ 72) / ((1.000267 ^ 72) - 1))).toFixed(1))
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









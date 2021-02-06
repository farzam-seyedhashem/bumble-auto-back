import UserModel from '../models/user_model';
import jwt from 'jsonwebtoken';
import config from '../config';
import SliderModel from "../models/slider_model";

const {check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
exports.index = function (req, res) {
    const resPerPage = parseInt(req.query.per_page) || 12;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "all";
    const response = {
        "model": UserModel.info(),
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

    UserModel.find().skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).sort({'createdAt': -1}).exec(function (err, docs) {
        UserModel.count().exec(function(err, count) {
            response.lastPageIndex = count/resPerPage
            if (count <= (resPerPage * page)) {
                response.lastPage = true
            }
            response.data = docs;
            res.send(response);
        })
    });

};

// Show the form for creating a new resource.
exports.create = function (req, res) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Store a newly created resource in storage.
exports.store = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        username,
        email,
        password,
        role
    } = req.body;
    try {
        let user = await UserModel.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        console.log(role)

        user = new UserModel({
            username,
            email,
            password,
            role
        });
        user.save(function (err) {
            if (err) {
                res.send(err)
            }
        });

        const payload = {
            user: {
                id: user.id,
                role: {_id:role}
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    user,
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};

// Display the specified resource.
exports.me = async function (req, res) {
    try {
        const user = await UserModel.findById(req.user.id).populate('role');
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}
exports.login = async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {email, password} = req.body;
    try {
        let user = await UserModel.findOne({
            email
        }).populate('role');
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id,
                role: {_id:user.role.id}
            }
        };
        console.log(user.role)
        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    user,
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }


}

// Display the specified resource.
exports.show = function (req, res) {
    UserModel.find({_id: req.params.id}).exec(function (err, docs) {
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

};

// Remove the specified resource from storage.
exports.destroy = function (req, res) {

};









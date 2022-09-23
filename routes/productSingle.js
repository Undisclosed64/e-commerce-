let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const productSingle = require('../models/productSingle');
// User model
let ProductSingle = require('../models/productSingle');
router.post('/upload-images', upload.array('imgCollection', 5), (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    const product = new ProductSingle({
        title:req.body.title,
        imgCollection: reqFiles
    });
    productSingle.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            productCreated: {
                title: result.title,
                imgCollection: result.imgCollection
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
router.get("/get-images", (req, res, next) => {
    ProductSingle.find().then(data => {
        res.status(200).json({
            message: "Image list retrieved successfully!",
            products: data
        });
    });
});
module.exports = router;
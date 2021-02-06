import ImageModel from "../models/image_model";
import BlogCategoryModel from '../models/blog_category_model'
import BlogModel from '../models/blog_model'
import RequestModel from '../models/request_model'
import ServiceModel from '../models/service_model'
import Slider from '../models/slider_model'
import Gallery from '../models/gallery_model'
import Language from '../models/language'
import UserModel from '../models/language'
exports.index = function (req, res) {
   res.status(200)
    res.send({"models":{"gallery":Gallery.info(),"user":UserModel.info(),"slider":Slider.info(),"language":Language.info(),"request":RequestModel.info(),"blog":BlogModel.info(),"blog-category":BlogCategoryModel.info(),"service":ServiceModel.info()}});
};

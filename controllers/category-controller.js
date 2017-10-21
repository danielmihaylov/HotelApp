const Category = require('mongoose').model('Category');

module.exports = {
    getView:(req,res) => {
        res.render('category/categoryForm');
    },
    createCat:(req, res) => {
        console.log(req.body);

        Category.create({
            categoryName:req.body.category
        }).then((e) => {
            res.redirect('/');
        })
    }
}
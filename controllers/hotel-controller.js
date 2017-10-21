const Hotel = require('mongoose').model('Hotel');
const Category = require('mongoose').model('Category');

module.exports = {
    addHotel:(req,res) => {
       let bodyParams = req.body;

        let hotelObj = {
            title:bodyParams.title,
            location:bodyParams.location,
            image:bodyParams.image,
            category:bodyParams.type,
            description:bodyParams.description,
            date:Date.now()
        }
        Hotel.create(hotelObj).then((h) => {
            Category.findOne({categoryName:req.body.type}).then(foundCat=>{
                foundCat.hotels.push(h._id)
                foundCat.save().then(() => {

                    res.render('hotels/generateHotel',{successMessage:'All is ok'});
                })
            })  
        }).catch(err => {
            res.locals.globalError = err.message;
            res.render('hotels/generateHotel');
        })
    },
    getAddHotelView:(req, res) => {
        Category.find({}).then(cats => {
            res.render('hotels/generateHotel',{cats});
        })
    },
    getDetails:(req,res) => {
        let targetHotel = req.query.id;

        Hotel.findById(targetHotel).populate('comments.creator').then(selectedHotel => {
           
            selectedHotel.viewCounter+=1;
            let comments =[];
            for(let elem of selectedHotel.comments){
                let tempObj = {
                    creator:elem.creator._id,
                    userName:elem.creator.username,
                    userComment:elem.description,
                    userTitle:elem.title,
                    datePosted:elem.creationDate.toUTCString()
                }

                comments.push(tempObj);
            }

            res.render('hotels/details',{selectedHotel,comments});
            selectedHotel.save();
        })
    },
    likeDislike:(req,res) => {
        let hotelId = req.params.id;
        
        Hotel.findById(hotelId).then((selectedHotel) => {
            selectedHotel.prop = selectedHotel.like.length
            //checks if hotels collection contains the id of the user
            let userId = req.user._id;
            let indexOfElement = selectedHotel.like.indexOf(userId);
            if(indexOfElement >= 0){
                selectedHotel.like.splice(indexOfElement,1);
            }else{
                selectedHotel.like.push(userId);
            }

            selectedHotel.save().then((e) => {
                if(e){
                    console.log(e);
                }
                res.redirect('back');
            })
        })
    },
    //pagination
    getList:(req,res) => {
        let page = Number(req.query.page) || 1;
        let limit = 2;

        Hotel.count({}).then(hotelCount => {

            let maxPages = Math.ceil(hotelCount/limit);
            if(page > maxPages){
                page = maxPages;
            }

            if(page < 0){
                page = 1;
            }

            let pages = {
                nextPage: page +1,
                prevPage: page-1
            }

            Hotel.find({}).skip((page - 1) * limit).limit(limit).then(hotels => {
               res.render('hotels/hotelList',{hotels,pages});
            })
        })
    }
}
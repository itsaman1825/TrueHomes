import Listing from '../models/listing.model.js'

export const createListing = async(req,res,next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
}

export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if(!listing) {
            res.status(404).json('Listing not found')
        }

        if(req.user.id !== listing.userRef){
            res.status(401).json('You can only delete your own listing')
        }

        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404).json('Listing not found')
    }

    if(req.user.id !== listing.userRef){
        res.status(401).json('You can only delete your own listing')
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing deleted Successfully')
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        res.status(404).json('Listing not found')
    }

    if(req.user.id !== listing.userRef){
        res.status(401).json('You can only update your own listing')
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    name:req.body.name,
                    description:req.body.description,
                    address:req.body.address,
                    regularPrice:req.body.regularPrice,
                    discountPrice:req.body.discountPrice,
                    bedrooms:req.body.bedrooms,
                    bathrooms:req.body.bathrooms,
                    furnished:req.body.furnished,
                    parking:req.body.parking,
                    type:req.body.type,
                    offer:req.body.offer,
                    userRef:req.body.userRef,
                    imageUrls:req.body.imageUrls
                },
            },
            {new: true}
        )

        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}
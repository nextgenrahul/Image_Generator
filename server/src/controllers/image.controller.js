import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = asyncHandler( async ( req, res ) => {
    const { prompt } = req.body;
    const user = await User.findById( req.user._id ).select("-password -refreshToken");

    if ( !user || !prompt ) throw new ApiError( 400, "Prompt is required" );

    if ( user.creditBalance === 0 ) {
        throw new ApiError( 400, "You don't have enough credits", { creditBalance: user.creditBalance } );
    }

    const formData = new FormData();
    formData.append( "prompt", prompt );

    const { data } = await axios.post( 'https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {
            'x-api-key': process.env.CLIP_DROP_API
        },
        responseType: 'arraybuffer'
    });  

    const base64Image = Buffer.from( data, 'binary' ).toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    await User.findByIdAndUpdate(req.user._id, { creditBalance: user.creditBalance - 1 });

    return res 
        .status( 200 )
        .json( 
            new ApiResponse( 
                200, 
                { image: resultImage, creditBalance: user.creditBalance - 1}, 
                "Image Generated Successfully" 
            )
        )

} );
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh token"
        );
    }
};

const options = {
    httpOnly: true,
    secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (
        [name, email, password].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ email, name });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (!user) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    // Remove sensitive fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User Registered Successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) throw new ApiError(400, "All fields are required");

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(404, "User dose not exist");

    // Check the password
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) throw new ApiError(401, "Invalid user credentials");

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user, accessToken, refreshToken },
                "User Logged in Successfully"
            )
        );
});

const userCredits = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");



    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { name: user.name, credits: user.creditBalance },
                "Credits fetched successfully"
            )
        );
});

export { registerUser, loginUser, userCredits };

import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted Sucessfully.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const becomeSeller = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { isSeller: true },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    const token = jwt.sign(
      {
        id: updatedUser._id,
        isSeller: true,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send(updatedUser);
  } catch (error) {
    next(error);
  }
};

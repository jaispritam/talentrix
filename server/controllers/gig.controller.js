import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  try {
    console.log(req.body);

    if (!req.isSeller) {
      return next(createError(403, "Sorry, only sellers can create gigs."));
    }

    const title = (req.body.title || "").trim();
    const desc = (req.body.desc || req.body.description || "").trim();
    const price = Number(req.body.price);

    if (!title || !desc || !req.body.price) {
      return next(createError(400, "title, desc and price are required."));
    }

    if (!Number.isFinite(price) || price < 0) {
      return next(createError(400, "Price must be a valid non-negative number."));
    }

    const category = (req.body.category || req.body.cat || "").trim();
    const deliveryTime =
      req.body.deliveryTime !== undefined && req.body.deliveryTime !== ""
        ? Number(req.body.deliveryTime)
        : undefined;
    const revisionNumber =
      req.body.revisionNumber !== undefined && req.body.revisionNumber !== ""
        ? Number(req.body.revisionNumber)
        : undefined;

    if (
      deliveryTime !== undefined &&
      (!Number.isFinite(deliveryTime) || deliveryTime < 0)
    ) {
      return next(createError(400, "Delivery time must be a valid non-negative number."));
    }

    if (
      revisionNumber !== undefined &&
      (!Number.isFinite(revisionNumber) || revisionNumber < 0)
    ) {
      return next(createError(400, "Revision number must be a valid non-negative number."));
    }

    const newGig = new Gig({
      userId: req.userId,
      title,
      description: desc,
      desc,
      price,
      category: category || undefined,
      cat: category || undefined,
      shortTitle: (req.body.shortTitle || "").trim() || undefined,
      shortDesc: (req.body.shortDesc || "").trim() || undefined,
      deliveryTime,
      revisionNumber,
      cover: req.body.cover || undefined,
      images: Array.isArray(req.body.images) ? req.body.images : [],
      features: Array.isArray(req.body.features) ? req.body.features : [],
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(" ");
      return next(createError(400, message || "Invalid gig payload."));
    }

    if (error.name === "CastError") {
      return next(createError(400, "Invalid field format in gig payload."));
    }

    return next(createError(500, "Failed to create gig."));
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "Only you can delete your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.cat && { category: q.cat }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gte: Number(q.min) }),
          ...(q.max && { $lte: Number(q.max) }),
        },
      }),
    };

    const gigs = await Gig.find(filters)
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};

const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(404, ` This ID ${id} Not Found `));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const subcategory = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subcategory) {
      return next(ApiError(404, 'Subcategory not found'));
    }
    res.status(200).json({ data: subcategory });
  });

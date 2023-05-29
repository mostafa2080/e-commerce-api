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
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(404, 'Subcategory not found'));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(404, 'document not found'));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filterObject = {};
    if (req.filterObj) {
      filterObject = req.filterObj;
    }
    //prepare query
    const documentCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filterObject), req.query)
      .sort()
      .filter()
      .search(modelName)
      .limitFields()
      .paginate(documentCount);

    //execute the query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ Results: documents.length, paginationResult, Data: documents });
  });

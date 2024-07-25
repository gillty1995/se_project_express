const ClothingItem = require("../models/clothingItems");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    });
};

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }

      if (item.owner.toString() !== userId.toString()) {
        return res
          .status(ERROR_CODES.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN });
      }
      return item
        .remove()
        .then(() =>
          res.status(200).send({ message: "Item successfully deleted" })
        )
        .catch((err) => {
          console.error(err);
          return res
            .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res.json(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.BAD_REQUEST)
        .send({ message: ERROR_MESSAGES.BAD_REQUEST });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res.json(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.BAD_REQUEST)
        .send({ message: ERROR_MESSAGES.BAD_REQUEST });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};

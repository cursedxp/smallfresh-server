const express = require("express");
const router = express.Router();
const productSeed = require("../seed/products.json");

//Models
const Product = require("../models/Product.model");
const Address = require("../models/Address.model");
const User = require("../models/User.model");

// router.get("/seed", (req, res) => {
//   res.json("Hello");
//   Product.create(productSeed)
//     .then((result) => {
//       console.log("Collection has been seeded");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//Products
router.get("/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      return res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/products", (req, res, next) => {
  const {
    name,
    img,
    category,
    description,
    bio,
    piece,
    unit,
    brand,
    amount,
    price,
  } = req.body;

  Product.create({
    name: name,
    img: img,
    category: category,
    description: category,
    bio: bio,
    stock: {
      piece: piece,
      unit: unit,
      brand: brand,
      amount: amount,
      price: price,
    },
  })
    .then((result) => {
      return res.json(result);
      console.log("New product has been added");
    })
    .catch((err) => {
      console.log(err);
    });
});
//Addresses
router.post("/myaddresses", (req, res, next) => {
  const {
    addressType,
    street,
    city,
    state,
    zip,
    description,
    latitude,
    longitude,
    userId,
  } = req.body;

  Address.create({
    addressType: addressType,
    street: street,
    city: city,
    state: state,
    zip: zip,
    description: description,
    coordinates: {
      latitude,
      longitude,
    },
  })
    .then((address) => {
      return User.findByIdAndUpdate(
        { _id: userId },
        { $push: { addresses: address._id } },
        { new: true }
      );
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myaddresses", (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .populate("addresses")
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
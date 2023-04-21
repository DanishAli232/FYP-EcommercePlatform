import { Address } from "../Models/AddressModel.js";
import { validateAddressInput } from "../Validators/validateaddressinput.js";

export const postAddress = async (req, res) => {
  const { isValid, errors, values } = validateAddressInput(req.body);

  try {
    if (!isValid) {
      return res.status(400).send({ errors });
    }
    let user = req.body.userid;

    const address = new Address({
      user,
      addresslist: [
        {
          fullname: values.fullname,
          province: values.province,
          area: values.area,
          landmark: values.landmark,
          labelselect: values.labelselect,
          city: values.city,
          address: values.address,
          mobilenumber: values.number,
          isDefault: true,
        },
      ],
    });

    const addressDoc = await address.save();
    console.log(addressDoc);

    res.status(200).json({
      success: true,
      addressId: addressDoc.id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const postnewaddress = async (req, res) => {
  try {
    console.log(req.body);
    const values = req.body;
    const id = req.params.id;

    const data = await Address.findByIdAndUpdate(
      id,
      {
        $push: {
          addresslist: {
            fullname: values.fullname,
            province: values.province,
            area: values.area,
            landmark: values.landmark,
            labelselect: values.labelselect,
            city: values.city,
            address: values.address,
            mobilenumber: values.number,
            isDefault: false,
          },
        },
      },
      {
        new: true,
      }
    ).exec();
    if (data) {
      res.status(200).json({
        success: true,
        data,
      });
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const updateaddress = async (req, res) => {
  try {
    const values = req.body;
    const id = req.params.id;
    const addressid = req.params.addressid;
    const data = await Address.updateOne(
      { _id: addressid, "addresslist._id": id },
      {
        $set: {
          "addresslist.$.fullname": values.fullname,
          "addresslist.$.province": values.province,
          "addresslist.$.area": values.area,
          "addresslist.$.landmark": values.landmark,
          "addresslist.$.city": values.city,
          "addresslist.$.labelselect": values.labelselect,
          "addresslist.$.address": values.address,
          "addresslist.$.mobilenumber": values.mobilenumber,
        },
      },
      {
        new: true,
      }
    );
    if (data) {
      res.status(200).json({
        success: true,
        data,
      });
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const updatedefaultaddress = async (req, res) => {
  try {
    const id = req.params.id;
    const addressid = req.params.addressid;
    const data1 = await Address.updateMany(
      { _id: addressid },
      {
        $set: {
          "addresslist.$[].isDefault": false,
        },
      },
      {
        new: true,
      }
    );
    console.log(data1);
    const data = await Address.updateOne(
      { _id: addressid, "addresslist._id": id },
      {
        $set: {
          "addresslist.$.isDefault": true,
        },
      },
      {
        new: true,
      }
    );
    if (data) {
      res.status(200).json({
        success: true,
        data,
      });
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const getaddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.id });

    res.status(200).json(addresses);
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

export const getaddressesbyid = async (req, res) => {
  try {
    const addresses = await Address.find({ _id: req.params.id });
    res.status(200).json(addresses);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

// // Bring in Models & Helpers
// const Address = require('../../models/address');
// const auth = require('../../middleware/auth');

// // add address api
// router.post('/add', auth, async (req, res) => {
//   try {
//     const user = req.user;

//     const address = new Address({
//       ...req.body,
//       user: user._id
//     });
//     const addressDoc = await address.save();

//     res.status(200).json({
//       success: true,
//       message: `Address has been added successfully!`,
//       address: addressDoc
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// // fetch all addresses api
// router.get('/', auth, async (req, res) => {
//   try {
//     const addresses = await Address.find({ user: req.user._id });

//     res.status(200).json({
//       addresses
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const addressId = req.params.id;

//     const addressDoc = await Address.findOne({ _id: addressId });

//     if (!addressDoc) {
//       res.status(404).json({
//         message: `Cannot find Address with the id: ${addressId}.`
//       });
//     }

//     res.status(200).json({
//       address: addressDoc
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const addressId = req.params.id;
//     const update = req.body;
//     const query = { _id: addressId };

//     await Address.findOneAndUpdate(query, update, {
//       new: true
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Address has been updated successfully!'
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const address = await Address.deleteOne({ _id: req.params.id });

//     res.status(200).json({
//       success: true,
//       message: `Address has been deleted successfully!`,
//       address
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: 'Your request could not be processed. Please try again.'
//     });
//   }
// });

// module.exports = router;

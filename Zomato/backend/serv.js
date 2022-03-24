const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoDriver = require("mongodb").MongoClient;
const app = express();
const https = require("https");
var PaytmChecksum = require("./Paytm/checksum");

const databaseName = "assigment";
const collectionName = "resturantdata";
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;
// Connect MongoDB at default port 27017.
mongoDriver.connect(
  "mongodb://localhost:27017",
  {
    useNewUrlParser: true,
  },
  (err, database) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
      db = database.db(databaseName);
      app.listen(port, () =>
        console.log(`app listening on port http://localhost:${port}`)
      );
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.get("/", (req, res) =>
  db
    .collection(collectionName)
    .find()
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        res.send(docs);
      }
    })
);

app.post("/filter", (req, res) => {
  const { city_name, id } = req.body;
  console.log(city_name, id);
  if (id !== "0" && city_name !== "Select Location") {
    db.collection(collectionName)
      .find({ city_name: city_name })
      .sort({ cost: 1 })
      .toArray((err, docs) => {
        if (err) {
          console.log("Error in fetching data from database: " + err);
        } else {
          let ss = [];
          for (let i = 0; i < docs.length; i++) {
            for (let j = 0; j < docs[i].type.length; j++) {
              if (docs[i].type[j].mealtype === id) {
                ss[i] = docs[i];
              }
            }
          }
          ss = ss.filter((val) => {
            return val !== undefined;
          });
          res.send(ss);
        }
      });
  } else {
    db.collection(collectionName)
      .find()
      .sort({ cost: 1 })
      .toArray((err, docs) => {
        if (err) {
          console.log("Error in fetching data from database: " + err);
        } else {
          let ss = [];
          for (let i = 0; i < docs.length; i++) {
            for (let j = 0; j < docs[i].type.length; j++) {
              if (docs[i].type[j].mealtype === id) {
                ss[i] = docs[i];
              }
            }
          }
          ss = ss.filter((val) => {
            return val !== undefined;
          });
          res.send(ss);
        }
      });
  }
});

app.post("/restaurantdetail", (req, res) => {
  const { name1 } = req.body;
  db.collection(collectionName)
    .find({ name: name1 })
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        res.send(docs);
      }
    });
});

app.post("/imagegallery", (req, res) => {
  const { name } = req.body;
  db.collection(collectionName)
    .find({ name: name })
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        res.send(docs);
      }
    });
});

app.get("/card", (req, res) => {
  db.collection("mealtype")
    .find()
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        res.send(docs);
      }
    });
});

app.get("/fitermenu", (req, res) => {
  db.collection(collectionName)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
});

app.post("/filtermenuresult", function (req, res) {
  const { city_name, sort } = req.body;
  if (sort == "low") {
    db.collection(collectionName)
      .find({
        city_name: city_name,
      })
      .sort({ cost: 1 })
      .toArray((err, docs) => {
        if (err) {
          console.log("Error in fetching data from database: " + err);
        } else {
          res.send(docs);
        }
      });
  } else if (sort == "high") {
    db.collection(collectionName)
      .find({
        city_name: city_name,
      })
      .sort({ cost: -1 })
      .toArray((err, docs) => {
        if (err) {
          console.log("Error in fetching data from database: " + err);
        } else {
          res.send(docs);
        }
      });
  }
});

app.post("/order", function (req, res) {
  const { _id } = req.body;
  db.collection("menuItems")
    .find({ restaurantId: _id })
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        res.send(docs);
      }
    });
});

app.post("/signup", function (req, res) {
  const { name, email, password, phone, address } = req.body;
  if (
    name == "" ||
    email == "" ||
    password == "" ||
    phone == "" ||
    address == ""
  ) {
    res.send("Please fill all the fields");
  } else {
    db.collection("users")
      .find({ email: email })
      .toArray((err, docs) => {
        if (err) {
          console.log("Error in fetching data from database: " + err);
        } else {
          if (docs.length > 0) {
            res.send("Email already exists");
          } else {
            db.collection("users")
              .insertOne({
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: address,
              })
              .then((result) => res.send("Signup Successful"))
              .catch((err) => console.log(err));
          }
        }
      });
  }
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  db.collection("users")
    .find({ email: email, password: password })
    .toArray((err, docs) => {
      if (err) {
        console.log("Error in fetching data from database: " + err);
      } else {
        if (docs.length > 0) {
          res.send({ status: "Login Successful", data: docs });
        } else {
          res.send("Login Failed");
        }
      }
    });
});

app.post("/paynow", (req, res) => {
  const { item, cost, resturant } = req.body;

  var paytmParams = {};

  /* Generate Checksum via Array */

  /* initialize an array */
  paytmParams["MID"] = "oLEeYf71454465792524";
  paytmParams["ORDER_ID"] = "ORDER_" + Math.floor(Math.random() * 100000000);
  paytmParams["CUST_ID"] = "CUST_" + Math.floor(Math.random() * 100000000);
  paytmParams["TXN_AMOUNT"] = cost;
  paytmParams["CHANNEL_ID"] = "WEB";
  paytmParams["INDUSTRY_TYPE_ID"] = "retail";
  paytmParams["WEBSITE"] = "WEBSTAGING";
  paytmParams["CALLBACK_URL"] = "http://localhost:3001/callback";
  paytmParams["EMAIL"] = "abc@gmail.com";
  paytmParams["MOBILE_NO"] = "1234567890";

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    paytmParams,
    "#xCB2porE2WwJNU@"
  );
  paytmChecksum
    .then(function (result) {
      let paytmParam = {
        ...paytmParams,
        CHECKSUMHASH: result,
      };
      res.send(paytmParam);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/callback", (request, res) => {
  // console.log(req.body);

  let paytmChecksum = request.body.CHECKSUMHASH;
  delete request.body.CHECKSUMHASH;

  var isVerifySignature = PaytmChecksum.verifySignature(
    request.body,
    "#xCB2porE2WwJNU@",
    paytmChecksum
  );
  if (isVerifySignature) {
    console.log("Checksum Matched");

    var paytmParams = {};

    /* body parameters */
    paytmParams.body = {
      /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
      mid: `${request.body.MID}`,

      /* Enter your order id which needs to be check status for */
      orderId: `${request.body.ORDERID}`,
    };

    /**
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      "#xCB2porE2WwJNU@"
    ).then(function (checksum) {
      /* head parameters */
      paytmParams.head = {
        /* put generated checksum value here */
        signature: checksum,
      };

      /* prepare JSON string for request */
      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: "/v3/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          console.log(response);
          res.json(response);
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
  } else {
    console.log("Checksum Mismatched");
  }
});

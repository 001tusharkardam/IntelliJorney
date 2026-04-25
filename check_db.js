const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();

async function check() {
  await mongoose.connect(process.env.ATLASDB_URL);
  const latest = await Listing.find().sort({ _id: -1 }).limit(1);
  if (latest.length) {
    console.log("Latest listing title:", latest[0].title);
    console.log("Images count:", latest[0].images ? latest[0].images.length : 0);
    console.log("Images array:", latest[0].images);
  }
  process.exit(0);
}
check();

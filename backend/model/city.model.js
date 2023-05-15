const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true 
        },
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "user" 
        }
    }
);

const CityModel = model("city", citySchema);

module.exports = CityModel;
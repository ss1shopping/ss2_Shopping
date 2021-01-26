const mongoose = require('mongoose')
var bcrypt = require("bcryptjs")

const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
        minlength: 8,
        minlength: [8, 'Must be six characters long'],

    },
    email: {
        type: String,
        unique: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "shops"
    },
    userInvited: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    gender: {
        type: String,
        enum: ['male', 'female', "other"],
        default: "male"
    },
    dob: {
        type: Date,
        default: "2000-01-01"
    },
    phoneNumber: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN", "SHOPOWNER", "COLLABORATOR"],
        default: "CUSTOMER",
    },
    isBan: {
        type: Boolean,
        default: false,
        select: false
    },
    avatar: {
        type: String
    },
    addresses: [{
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String
        },
        state: {
            type: String
        },
        phoneNumber: {
            type: Number,
        }
    }],
    day: {
        type: Date,
        default: Date.now
    },

},
    {
        timestamps: true,
    },
    {
        collection: "User"
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


userSchema.pre("save", async function (next) {
    try {

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        //tao secretToken de gui verifi email

        //tao trang thai false (chua )

        this.password = passwordHash
        next()
    } catch (error) {
        console.log(error);

        next(error)
    }
})
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)                 //phair cos return
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('users', userSchema);
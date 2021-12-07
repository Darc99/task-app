const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

//to generate token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewmove')
   
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token;
}

//to display only necessary user detail
//toJSON makes this work on any router that returns user info
userSchema.methods.toJSON = function () {
    const user = this;
    
    //to return raw profile data
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    
    return userObject;
}
//to display only necessary user detail
// userSchema.methods.getPublicProfile = function () {
//     const user = this;

//     //to return raw profile data
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject;
// }

//to create new method for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user;
}

//Hash the plain text password before saving
userSchema.pre('save',async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete user tasks when user is remove
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({author: user._id})
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;

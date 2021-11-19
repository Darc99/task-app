const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
    // useCreateIndex:true
});

const User = mongoose.model('User', {
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
    }
});

// const me = new User({
//     name: 'Joe',
//     email: 'EMAIL@yahOO.COM   ',
//     password: '    wdmemmxss234   '
//     // age: -1
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((err) => {
//     console.log(err);
// })

const Task = mongoose.model('Task', {
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed : {
        type: Boolean,
        default: false
    }
});

const work = new Task({
    description: '  Buy food'
})

work.save().then(() => {
    console.log(work)
}).catch((err) => {
    console.log(err);
});

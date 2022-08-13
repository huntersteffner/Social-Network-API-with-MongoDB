const {Schema, model} = require('mongoose')


// From https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/
// const validateEmail = (email) => {
//     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
//   };

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // required: "Email address is required",
            // validate: [validateEmail, "Please fill a valid email address"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address", 
            ]
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
    // I don't know if this is correct, but I took from Act 23 from Unit 18
    toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
 });
const User = model('user', userSchema);

module.exports = User
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accounts: [
        {
            crypto: String,
            private_key: String,
            public_key: String,
            address: String
        }
    ]
});

UserSchema.pre('save', function(next) {
    let _this = <any>this;

    bcrypt.genSalt(10)
    .then((salt: string) => {
        bcrypt.hash(_this.password, salt)
        .then((hash: string) => {
            _this.password = hash;
            next();
        })
        .catch(err => {throw err});
    })
    .catch(err => {throw err})
});

export default mongoose.model('users', UserSchema);
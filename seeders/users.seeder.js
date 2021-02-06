import { Seeder } from 'mongoose-data-seed';
import User from '../models/user_model';
const bcrypt = require("bcryptjs");


const data = [
    {
        email: 'admin@admin.com',
        password: 'password',
        username: 'admin',
        role: '6017ac1c0d1e621ef92b656e',
    },
];

class UsersSeeder extends Seeder {
    async shouldRun() {
        const count = await User.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return User.create(data);
    }
}

export default UsersSeeder;

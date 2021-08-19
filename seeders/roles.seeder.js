import {Seeder} from 'mongoose-data-seed';
import Role from '../models/role_model';

const data = [
    {
        _id:'6017ac1c0d1e621ef92b656e',
        name: 'admin',
        accessibility: {
            "service": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "blog": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "blog-category": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "user": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "language": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "request": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "role": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "slider": {"get": true, "show": true, "post": true, "put": true, "delete": true},
            "upload": {"get": true, "show": true, "post": true, "put": true, "delete": true},
        }
    },


];

class RolesSeeder extends Seeder {
    async shouldRun() {
        const count = await Role.countDocuments().exec();

        return count === 0;
    }

    async run() {
        return Role.create(data);
    }
}

export default RolesSeeder;

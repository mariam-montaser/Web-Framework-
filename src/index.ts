import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
    return User.buildUser(json);
})

users.on('change', () => {
    const root = document.getElementById('root');
    if(root) {
        new UserList(root, users).render();
    } else {
        throw new Error("Root Element not found");
        
    }
});

users.fetch()

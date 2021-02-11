import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

export interface UserProps {
    id?: number;
    name?: string;
    age?: number
}

const rootUrl = 'http://localhost:3000/users';


export class User extends Model<UserProps> {

    static buildUser(attrs: UserProps): User {
        return new User(new Eventing(), new ApiSync<UserProps>(rootUrl), new Attributes<UserProps>(attrs))
    }

    static buildUserCollection(): Collection<User, UserProps>{
        return new Collection<User, UserProps>(rootUrl, (json: UserProps) => User.buildUser(json))
    }

    setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        console.log(age);
        
        this.set({age});
    }
    
}


// export class User {

//     events: Eventing = new Eventing();
//     sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
//     attributes: Attributes<UserProps>;

//     constructor(attrs: UserProps) {
//         this.attributes = new Attributes<UserProps>(attrs)
//     }

//     get on() {
//         return this.events.on;
//     }

//     get trigger() {
//         return this.events.trigger;
//     }

//     get get() {
//         return this.attributes.get;
//     }

//     set(update: UserProps) {
//         this.attributes.set(update);
//         this.events.trigger('change')
//     }

//     fetch(): void {
//         const id = this.get('id');
//         this.sync.fetch(id).then((response: AxiosResponse): void => {
//             this.set(response.data)
//         })
//     }

//     save(): void {
//         this.sync.save(this.attributes.getAll()).then((response: AxiosResponse) => {
//             this.events.trigger('save');
//         }).catch(() => {
//             this.events.trigger('error');
//         });
//     }
// }
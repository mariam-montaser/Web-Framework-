
import { AxiosPromise, AxiosResponse } from "axios";



type Callback = () => void;


export interface ModelAttributes<T> {
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
    set(update: T): void;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number
}

const rootUrl = 'http://localhost:3000/users';

export class Model<T extends HasId> {

    constructor(private events: Events, private sync: Sync<T>, private attributes: ModelAttributes<T>) {}

    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T) {
        this.attributes.set(update);
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.get('id');
        if(typeof id === 'number') {
            this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data)
        })
        }
        
    }

    save(): void {
        this.sync.save(this.attributes.getAll()).then((response: AxiosResponse) => {
            this.events.trigger('save');
        }).catch(() => {
            this.events.trigger('error');
        });
    }
}
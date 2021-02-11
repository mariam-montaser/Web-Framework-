import { Model } from "../models/Model";
import { User } from "../models/User";


export abstract class View<T extends Model<K>, K> {

    regions: {[key: string]: Element} = {};

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    abstract template(): string;

    regionsMap(): {[key: string]: string} {
        return {};
    }

    eventsMap(): {[key: string]: () => void} {
        return {};
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for(let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
        for(let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if(element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        console.log('START: ', this);
        
        this.parent.innerHTML = '';
        const templatElement = document.createElement('template');
        console.log(templatElement);
        console.log(this.template());
        
        templatElement.innerHTML = this.template();
        this.bindEvents(templatElement.content);
        this.mapRegions(templatElement.content);
        this.onRender();
        console.log('STEP: ', this);

        this.parent.append(templatElement.content);
        console.log('END: ', this);

    }
}
import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

    eventsMap():{[key: string]: () => void} {
        return {
        'click:.set-age': this.onSetAgeClick,
        'click:.update-name': this.onUpdateNameClick,
        'click:.save-model': this.onSaveModelClick
        }
    }

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}" />
                <button class="update-name">Update Name</button>
                <button class="set-age">Set Age</button>
                <button class="save-model">Save</button>
            </div>
        `;
    }

    onSetAgeClick = (): void => {
        console.log('Hi btn');
        this.model.setRandomAge();
    }

    onUpdateNameClick = (): void => {
        const input = this.parent.querySelector('input');
        if(input) {
            this.model.set({name: input.value})
        }
    }

    onSaveModelClick = (): void => {
        this.model.save()
    }

}
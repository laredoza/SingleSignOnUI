export class Option {
    value: string;
    text: string;
    selected: boolean;

    constructor(value:string, text: string, selected: boolean) {
        this.value = value;
        this.text = text;
        this.selected = selected;
    }
}

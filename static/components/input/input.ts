import {Block} from "../block.js";

export interface InputProps {
    nameField: string;
    type: string;
    nameInput: string;
    idError: string;
    validation: (value: string) => string | null[];
}

export class Input extends Block {
    constructor(props: InputProps) {
        super("app-input", props);
    }

    validate() {
        let arr: any[] = [];
        let input = document.querySelector<HTMLInputElement>('input[name=' + this.props.nameInput + ']');

        this.props.validation.forEach((item: any) => {
            if (input) {
                let error = item(input.value);
                if (error) {
                    arr.push(error)
                }
            }
        });

        let errorSpan = document.querySelector('#' + this.props.idError);
        if (errorSpan) {
            if (arr.length > 0) {

                errorSpan.classList.remove('invisible');
                errorSpan.innerHTML = arr[0];
                return false;
            } else {
                this.clearError();
                return true;
            }
        }
    }

    clearError() {
        let errorSpan = document.querySelector('#' + this.props.idError);
        if (errorSpan) {
            if (!errorSpan.classList.contains('invisible')) {
                errorSpan.classList.add('invisible');
                errorSpan.innerHTML = '';
            }
        }
    }

    componentDidRender() {
        if (this.props.validation) {
            let input = document.querySelector<HTMLInputElement>('input[name=' + this.props.nameInput + ']');
            if (input) {
                input.onblur = () => {
                    this.validate()
                };

                input.onfocus = () => {
                    this.clearError();
                }
            }
        }
    }

    render() {
        let template = Handlebars.compile(`<span class="name-field">{{nameField}}</span>
     <div class="input-field"><input type="{{type}}" name="{{nameInput}}" ></div>
    {{#if idError}}
    <span class="invisible" id="{{idError}}" ></span>
{{/if}}`);
        return template(this.props);
    }
}


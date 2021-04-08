import {Block} from "../block/block";
import {InputProps} from "./input.interface";

export class Input extends Block {
    constructor(props: InputProps) {
        super("app-input", props);
    }

    validate() {
        const arr: string[] = [];
        const input = document.querySelector<HTMLInputElement>('input[name=' + this.props.nameInput + ']');
        this.props.validation.forEach((item:(value: string) => string | null ) => {
            if (input) {
                const error = item(input.value);
                if (error) {
                    arr.push(error)
                }
            }
        });

        const errorSpan = document.querySelector('#' + this.props.idError);
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
        const errorSpan = document.querySelector('#' + this.props.idError);
        if (errorSpan) {
            if (!errorSpan.classList.contains('invisible')) {
                errorSpan.classList.add('invisible');
                errorSpan.innerHTML = '';
            }
        }
    }

    componentDidRender() {
        if (this.props.validation) {
            const input = document.querySelector<HTMLInputElement>('input[name=' + this.props.nameInput + ']');
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
        const template = Handlebars.compile(`<span class="input__name">{{nameField}}</span>
     <div class="input__field"><input type="{{type}}" name="{{nameInput}}" ></div>
    {{#if idError}}
    <span class="invisible input__error" id="{{idError}}" ></span>
{{/if}}`);
        return template(this.props);
    }
}


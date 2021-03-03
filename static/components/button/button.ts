import {Block} from "../block.js";

export interface ButtonProps {
    classButton: string;
    textButton: string;
    classImg?: string;
    inputs: Block[];
    link?: string;
    alert?: boolean;
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super("div", props);
    }

    componentDidRender() {
        const buttons = document.querySelectorAll<HTMLButtonElement>('button.data');

        buttons.forEach((element) => {
            element.onclick = () => {
                let uncorrect: boolean = false;
                for (let item of this.props.inputs) {
                    if (!item.validate()) {
                        uncorrect = true
                    }
                }
                if (uncorrect &&  !this.props.alert) {
                    return alert('ведите корректные данные');
                } else {
                    const user = Array.from(document.querySelectorAll('input'))
                        .reduce((acc:any, {name, value}) => {
                            acc[name] = value;
                            return acc;
                        }, {});

                    console.log(user);
                }
            }
        });
        const buttonslink = document.querySelectorAll<HTMLButtonElement>('button.link');

        buttonslink.forEach((element) => {
            element.onclick = () => {
                document.location.href = this.props.link;
            }
        })
    }

    render() {
        let template = Handlebars.compile(`
{{#if classImg}}
<button type="submit" class="{{classButton}} {{classImg}}"><img src="{{textButton}}" alt=""></button>
{{else}}
<button type="submit" class="{{classButton}}">{{textButton}}</button>
{{/if}}`);
        return template(this.props);
    }
}







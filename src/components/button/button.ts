import {Block} from '../block/block';
import {AppStore} from '../../store/store';

export interface ButtonProps {
  classButton: string;
  textButton: string;
  classImg?: string;
  inputs?: Block[];
  link?: string;
  alert?: boolean;
  onClick?: (user?: any) => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('div', props);
  }

  componentDidRender() {
    if (this.props.classButton === 'button__data') {
      const buttons = document.querySelectorAll<HTMLButtonElement>('button.button__data');
      buttons.forEach((element) => {
        element.onclick = () => {
          let uncorrect: boolean = false;
          if (this.props.inputs) {
            for (let item of this.props.inputs) {
              if (!item.validate()) {
                uncorrect = true
              }
            }
            if (uncorrect && !this.props.alert) {
              return alert('ведите корректные данные');
            } else {
              const formData = Array.from(document.querySelectorAll('input'))
                .reduce((acc: { [key: string]: string | File }, {name, value, files}) => {
                  // for input with files type
                  acc[name] = files ? files[0] : value;
                  return acc;
                }, {});
              console.log(formData);
              this.props.onClick(formData);
            }
          } else {
            if (this.props.onClick) {
              this.props.onClick();
            }
          }
        }
      });
    } else {
      const buttonsLink = document.querySelectorAll<HTMLButtonElement>('button.button__link');
      buttonsLink.forEach((element) => {
        element.onclick = () => {
          AppStore.router.go(this.props.link);
      }
      })
    }
  }

  render() {
    let template = Handlebars.compile(`
      {{#if classImg}}
      <button type="submit" class="{{classButton}} {{classImg}}"><img src="{{textButton}}" alt=""></button>
      {{else}}
      <button type="submit" class="{{classButton}}">{{textButton}}</button>
      {{/if}}`
    );
    return template(this.props);
  }
}







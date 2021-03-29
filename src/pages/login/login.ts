import {loginSigningTemplate} from '../../templates/form-template';
import {Input} from '../../components/input/input';
import {InputProps} from '../../components/input/input.interface';
import {Block} from '../../components/block/block';
import {Button} from '../../components/button/button';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';


export class LoginPage extends Block {
  private inputs: any;
  private button: Button;

  constructor() {
    super('login-page');
  }

  componentDidRender() {
    for (let item of this.inputs) {
      item.componentDidRender();
    }
    this.button.componentDidRender();

    const linkSingIn: HTMLElement = document.querySelector('#link-under-button') as HTMLElement;
    if (linkSingIn ){
      linkSingIn.onclick = () => {
        let link = linkSingIn.getAttribute('data-link');
        if (link) {
          AppStore.router.go(link);
        }
      }
    }
  }

  render(): string {
    let template = loginSigningTemplate(
      'login-form',
      'Вход',
      {
        link: '/signin',
        text: 'Нет аккаунта?'
      },
    );
    let arr: InputProps[] = [{
      nameField: 'Логин',
      type: 'text',
      nameInput: 'login',
      idError: 'login-error',
      validation: [
        (value: string) => {
          return !!value ? null : 'заполните поле';
        },
      ]
    },
      {
        nameField: 'Пароль',
        type: 'password',
        nameInput: 'password',
        idError: 'password-error',
        validation: [
          (value: string) => {
            return !!value ? null : 'заполните поле';
          },
        ]
      }];
    this.inputs = [];
    for (let item of arr) {
      let input = new Input({
        nameField: item.nameField,
        type: item.type,
        nameInput: item.nameInput,
        idError: item.idError,
        validation: item.validation,
      });

      this.inputs.push(input);
      template = template.replace('<app-input></app-input>', '<app-input>' + input.getContent().innerHTML + '</app-input><app-input></app-input>');
    }
    this.button = new Button({
      classButton: 'data',
      textButton: 'Авторизоваться',
      inputs: this.inputs,
      onClick: this.onEnterClick,
    });
    template = template.replace('<div class="button"></div>', '<div class="button">' + this.button.getContent().innerHTML + '</div>');
    return template;
  }

  onEnterClick(formData: any) {
    chatsApi.signIn(formData)
     .then(() => AppStore.router.go('/chat-select'))
      .catch(() => {
        console.log('ошибка входа');
      })
  }
}
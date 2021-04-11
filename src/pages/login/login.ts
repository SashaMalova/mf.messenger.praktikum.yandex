import {loginSigningTemplate} from '../../templates/form-template';
import {Input} from '../../components/input/input';
import {InputProps} from '../../components/input/input.interface';
import {Block} from '../../components/block/block';
import {Button} from '../../components/button/button';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';
import {cloneDeep} from '../../utilities/clon-deep';

export class LoginPage extends Block {
  private inputs: any;
  private button: Button;

  constructor() {
    super('login-page');
  }

  componentDidRender() {
    for (const item of this.inputs) {
      item.componentDidRender();
    }
    this.button.componentDidRender();

    const linkSingIn: HTMLElement = document.querySelector('.button__link-under-button') as HTMLElement;
    if (linkSingIn ){
      linkSingIn.onclick = () => {
        const link = linkSingIn.getAttribute('data-link');
        if (link) {
          AppStore.router.go(link);
        }
      }
    }
  }

  render(): string {

    chatsApi.getUserInfo()
      .then((result) => {
        AppStore.user = cloneDeep(result.response);
        AppStore.activeUserId = Number(AppStore.user.id);
        AppStore.router.go('/chat-select')
      });

    let template = loginSigningTemplate(
      'form form__login',
      'Вход',
      {
        link: '/signin',
        text: 'Нет аккаунта?'
      },
    );
    const arr: InputProps[] = [{
      nameField: 'Логин',
      type: 'text',
      nameInput: 'login',
      idError: 'login-error',
      validation: [
        (value: string) => {
          return value ? null : 'заполните поле';
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
            return value ? null : 'заполните поле';
          },
        ]
      }];
    this.inputs = [];
    for (const item of arr) {
      const input = new Input({
        nameField: item.nameField,
        type: item.type,
        nameInput: item.nameInput,
        idError: item.idError,
        validation: item.validation,
      });

      this.inputs.push(input);
      template = template.replace('<app-input class="container"></app-input>', '<app-input class="container">' + input.getContent().innerHTML + '</app-input><app-input class="container"></app-input>');
    }
    this.button = new Button({
      classButton: 'button__data',
      textButton: 'Авторизоваться',
      inputs: this.inputs,
      onClick: this.onEnterClick,
    });
    template = template.replace('<div class="button"></div>', '<div class="button">' + this.button.getContent().innerHTML + '</div>');
    return template;
  }

  onEnterClick(formData: any) {
    chatsApi.signIn(formData)
     .then((result) => {
       AppStore.user = cloneDeep(result.response);
       AppStore.activeUserId = Number(AppStore.user.id);
       AppStore.router.go('/chat-select');
     })
      .catch(() => {
        console.log('ошибка входа');
      })
  }
}

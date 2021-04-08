import {loginSigningTemplate} from '../../templates/form-template';
import {Button} from '../../components/button/button';
import {Input} from '../../components/input/input';
import {Block} from '../../components/block/block';
import {InputProps} from '../../components/input/input.interface';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';

export class SigninPage extends Block {
    private inputs: any;
    private button: Button;

    constructor() {
        super('signin-page');
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
        let template = loginSigningTemplate(
          'form form__signin',
          'Регистрация',
          {
              link: '/login',
              text: 'Войти'
          },
        );
        const arr: InputProps[] = [{
            nameField: 'Почта',
            type: 'text',
            nameInput: 'email',
            idError: 'email-error',
            validation: [
                (value: string) => {
                    return value ? null : "заполните поле";
                },
                (value: string) => {
                    return (value.includes('@') && value.includes('.')) ? null : "некорректный email";
                }
            ]
        },
            {
                nameField: 'Логин',
                type: 'text',
                nameInput: 'login',
                idError: 'login-error',
                validation: [
                    (value: string) => {
                        return value ? null : "заполните поле"
                    }
                ]
            }, {
                nameField: 'Имя',
                type: 'text',
                nameInput: 'first_name',
                idError: 'first_name-error',
                validation: [
                    (value: string) => {
                        return value ? null : "заполните поле"
                    }
                ]
            }, {
                nameField: 'Фамилия',
                type: 'text',
                nameInput: 'last_name',
                idError: 'last_name-error',
                validation: [
                    (value: string) => {
                        return value ? null : "заполните поле"
                    }
                ]
            }, {
                nameField: 'Телефон',
                type: 'text',
                nameInput: 'phone',
                idError: 'phone-error',
                validation: [
                    (value: string) => {
                        return value ? null : "заполните поле"
                    },
                    (value: string) => {
                        return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm).test(value) ? null : "некорректный номер"
                    }
                ]
            }, {
                nameField: 'Пароль',
                type: 'password',
                nameInput: 'newPassword',
                idError: 'newPassword-error',
                validation: [
                    (value: string) => {
                        return value ? null : "заполните поле"
                    },
                    (value: string) => {
                        return (/^.*(?=.{6,})(?=..*[0-9])(?=..*[a-z]|[A-Z]|[а-я]|[А-Я]).*$/gm).test(value) ? null : "Пароль должен содержать 6 символов, хотябы 1 букву и 1 цифру"
                    }
                ]
            }, {
                nameField: 'Пароль (ещё раз)',
                type: 'password',
                nameInput: 'newPasswordControl',
                idError: 'newPasswordControl-error',
                validation: [
                    (value: string) => {
                        const password = document.querySelector<HTMLInputElement>('input[name=newPassword]');
                        return (password && value === password.value) ? null : "Пароли не совпадают"
                    }
                ]
            }
        ];

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
            textButton: 'Зарегистрироваться',
            inputs: this.inputs,
            onClick: this.onEnterClick,
        });
        template = template.replace('<div class="button"></div>', '<div class="button">' + this.button.getContent().innerHTML + '</div>');
        return template;
    }

    onEnterClick(formData :any) {
        chatsApi.signUp(formData)
          .then(()=>AppStore.router.go('/chat-select'))
          .catch(() => {
              console.log(formData);
          });
    }
}


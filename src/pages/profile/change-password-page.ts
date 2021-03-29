import '../../templates/global-partials';
import {Button} from '../../components/button/button';
import {InputProfile} from '../../components/input/input-profile';
import {arrInputsForm} from '../../components/input/arr-inputs-form';
import {Input} from '../../components/input/input';
import {Profile} from '../../components/profile/profile';
import {Block} from '../../components/block/block';
import {chatsApi} from '../../services/chats-api';

export interface ChangePasswordPageProps {
  user: { [key: string]: string }
}

export class ChangePasswordPage extends Block {
  private profile: Profile;
  private arrInputs: Input[];
  private button: Button;

  constructor(props: ChangePasswordPageProps) {
    super('change-password-page', props);
  }

  componentDidRender() {
    this.profile.componentDidRender();
    for (let item of this.arrInputs) {
        item.componentDidRender();
    }
    this.button.componentDidRender();
  }

  render(): string {
    let arr = [{
      nameField: 'Старый пароль',
      type: 'password',
      nameInput: 'oldPassword',
      profileData: '',
      idError: 'password-error',
      validation: [
        (value: string) => {
          return !!value ? null : "заполните поле";
        },
      ]
    }, {
      nameField: 'Новый пароль',
      type: 'password',
      nameInput: 'newPassword',
      profileData: '',
      idError: 'newPassword-error',
      validation: [
        (value: string) => {
          return !!value ? null : "заполните поле"
        },
        (value: string) => {
          return (/^.*(?=.{6,})(?=..*[0-9])(?=..*[a-z]|[A-Z]|[а-я]|[А-Я]).*$/gm).test(value) ? null : "Пароль должен содержать 6 символов, хотябы 1 букву и 1 цифру"
        }
      ]
    }, {
      nameField: 'Повторите новый пароль',
      type: 'password',
      nameInput: 'newPasswordControl',
      profileData: '',
      idError: 'newPasswordControl-error',
      validation: [
        (value: string) => {
          let password = document.querySelector<HTMLInputElement>('input[name=newPassword]');
          return (password && value === password.value) ? null : "Пароли не совпадают"
        }
      ]
    },
    ];

    this.arrInputs = arrInputsForm(arr, InputProfile, true);

    this.button = new Button({
      classButton: 'data',
      textButton: 'Сохранить',
      inputs: this.arrInputs,
      onClick: this.onEnterClick,
    });

    this.profile = new Profile({
      user: this.props.user,
      inputs: this.arrInputs,
      button: this.button,
      firstNameVisible: 'invisible',
    });
    return this.profile.getContent().innerHTML;
  }

  onEnterClick(formData :any) {
    chatsApi.changePasswordRequest(formData)
      .catch(() => {
        console.log(formData);
      });
  }
}


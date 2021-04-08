import '../../templates/global-partials';
import {Button} from '../../components/button/button';
import {InputProfile} from '../../components/input/input-profile';
import {arrInputsForm} from '../../components/input/arr-inputs-form';
import {Profile} from '../../components/profile/profile';
import {Input} from '../../components/input/input';
import {Block} from '../../components/block/block';
import {cloneDeep} from '../../utilities/clon-deep';
import {chatsApi} from '../../services/chats-api';

export interface ChangeDataPageProps {
  user: { [key: string]: string }
}

export class ChangeDataPage extends Block {
  private profile: Profile;
  private arrInputs: Input[];
  private button: Button;

  constructor(props: ChangeDataPageProps) {
    super('change-data-page', props);

    this.props.user = {};
    chatsApi.getUserInfo()
      .catch(() => {
        alert('error');
      })
      .then((result: PlainObject) => {
        this.props.user = cloneDeep(result.response);
      });
  }

  componentDidRender() {
    this.profile.componentDidRender();
    for (const item of this.arrInputs) {
      item.componentDidRender();
    }
    this.button.componentDidRender();
  }

  render(): string {

    const arr = [
      {
        nameField: 'Почта',
        type: 'text',
        nameInput: 'email',
        profileData: this.props.user?.email,
        idError: 'email-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле';
          },
          (value: string) => {
            return (value.includes('@') && value.includes('.')) ? null : 'некорректный email';
          }
        ]
      }, {
        nameField: 'Логин',
        type: 'text',
        nameInput: 'login',
        profileData: this.props.user?.login,
        idError: 'login-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле'
          }
        ]
      }, {
        nameField: 'Имя',
        type: 'text',
        nameInput: 'first_name',
        profileData: this.props.user?.first_name,
        idError: 'first_name-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле'
          }
        ],
      }, {
        nameField: 'Фамилия',
        type: 'text',
        nameInput: 'second_name',
        profileData: this.props.user?.second_name,
        idError: 'last_name-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле'
          }
        ],
      }, {
        nameField: 'Имя в чате',
        type: 'text',
        nameInput: 'display_name',
        profileData: this.props.user?.display_name,
        idError: 'display_name-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле'
          }
        ]
      }, {
        nameField: 'Телефон',
        type: 'text',
        nameInput: 'phone',
        profileData: this.props.user?.phone,
        idError: 'phone-error',
        validation: [
          (value: string) => {
            return value ? null : 'заполните поле'
          },
          (value: string) => {
            return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm).test(value) ? null : 'некорректный номер'
          }
        ],
      },
    ];

      this.arrInputs = arrInputsForm(arr, InputProfile, true);

    if (!this.profile) {
      this.button = new Button({
        classButton: 'button__data',
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
    } else {
      this.profile.props.user = this.props.user;
      this.profile.props.inputs = this.arrInputs;
      this.button.props.inputs = this.arrInputs;
      this.profile.props.button = this.button;
    }
    return this.profile.getContent().innerHTML;
  }

  onEnterClick(formData :any) {
   chatsApi.changeUserProfile(formData)
      .catch(() => {
        console.log(formData);
      });
  }
}



import '../../templates/global-partials';
import {Block} from '../../components/block/block';
import {Profile} from '../../components/profile/profile';
import {cloneDeep} from '../../utilities/clon-deep';
import {Button} from '../../components/button/button';
import {ModalWindow} from '../../components/modal-window/modal-window';
import {render as globalRender} from '../../components/render';
import {InputAvatar} from '../../components/input/input-avatar';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';

export interface ProfilePageProps {
  user: { [key: string]: string }
}

export class ProfilePage extends Block {
  private profile: Profile;
  private profileProps: any;
  private buttonsBlock: Block[];
  private inputBlock: Block;
  private input: { nameField: string; idError: string; type: string; nameInput: string; validation: ((value: string) => (string | null))[] };
  private button: { textButton: string; onClick: (formData: any) => void; alert: boolean; inputs: Block[]; classButton: string }[];
  private form: any;


  constructor(props: ProfilePageProps) {
    super('profile-page', props);

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
    const avatarGrey = <HTMLElement>document.querySelector('.avatar-profile > span.grey-avatar');
    const avatarRed = <HTMLElement>document.querySelector('.avatar-profile > span.red-avatar');
    avatarGrey ? avatarGrey.onmouseenter = () => {
      if (!avatarGrey.classList.contains('hidden')) {
        avatarGrey.classList.add('hidden');
        avatarRed.classList.remove('hidden');
      }
    } : '';
    avatarRed ? avatarRed.onmouseleave = () => {
      if (avatarGrey.classList.contains('hidden')) {
        avatarGrey.classList.remove('hidden');
        avatarRed.classList.add('hidden');
      }
    } : '';

    if (avatarRed) {
      avatarRed.onclick = () => {
        this.buttonsBlock = [];
        this.input = {
          nameField: '',
          type: 'file',
          nameInput: 'avatar',
          idError: 'avatar-error',
          validation: [
            (value: string): null | string => {
              return value ? null : 'Нужно выбрать файл';
            },
          ]
        };

        this.inputBlock = new InputAvatar(this.input);

        this.button = [{
          classButton: 'button__data',
          textButton: 'Поменять',
          inputs: [this.inputBlock],
          alert: true,
          onClick: this.onEnterClick,
        }];
        for (const item of this.button) {
          this.buttonsBlock.push(new Button(
            {...item, inputs: [this.inputBlock]}));
        }

        const modalWindow = new ModalWindow({
          classForm: 'form form__add-user modal-window__form',
          head: 'Загрузите файл',
          input: this.inputBlock,
          buttons: this.buttonsBlock,
        });
        globalRender('body', modalWindow);
      }
    }
    const profileEdit: HTMLElement = document.querySelector('#profile-edit') as HTMLElement;
    if (profileEdit){
      profileEdit.onclick = () => {
        AppStore.router.go('/profile-edit');
      }
    }

    const profilePassword: HTMLElement = document.querySelector('#profile-password') as HTMLElement;
    if (profilePassword){
      profilePassword.onclick = () => {
        AppStore.router.go('/profile-password');
      }
    }

    const exitButton: HTMLElement = document.querySelector('#exit') as HTMLElement;
    if (exitButton) {
      exitButton.onclick = () => {
        chatsApi.logout()
          .then(() => {
            AppStore.router.go('/login');
          })
          .catch(() => {
            console.log('Ошибка выхода')
          });
      };
    }


  }

  render(): string {

    const arrBlack = [{
      nameField: 'Почта',
      profileData: this.props.user?.email,
    }, {
      nameField: 'Логин',
      profileData: this.props.user?.login,
    }, {
      nameField: 'Имя',
      profileData: this.props.user?.first_name,
    }, {
      nameField: 'Фамилия',
      profileData: this.props.user?.second_name,
    }, {
      nameField: 'Имя в чате',
      profileData: this.props.user?.display_name,
    }, {
      nameField: 'Телефон',
      profileData: this.props.user?.phone,
    },
    ];
    if (!this.profile) {
      const arrYellow = [{
        text: 'Изменить данные',
        id: 'profile-edit',
      }, {
        text: 'Изменить пароль',
        id: 'profile-password',
      }, {
        text: 'Выйти',
        id: 'exit',
      }];

      this.profileProps = {
        user: this.props.user,
        arrBlack: arrBlack,
        arrYellow: arrYellow,
        firstNameVisible: '',
      };

      this.profile = new Profile(this.profileProps);
    } else {
      this.profile.props.user = this.props.user;
      this.profile.props.arrBlack = arrBlack;
    }
    return this.profile.getContent().innerHTML;
  }

  onEnterClick(formData: any) {
    if (document.getElementById('my-user-form')) {
      this.form = new FormData();
      this.form.append('avatar', formData.avatar)
    }
    chatsApi.changeUserAvatar(this.form)
      .catch(() => {
        console.log(formData);
      });
  }
}



import {InputMessage} from '../input/input-message';
import {Button, ButtonProps} from '../button/button';
import {Block} from '../block/block';
import {Input} from '../input/input';
import {ModalWindow} from '../modal-window/modal-window';
import {render as globalRender} from '../render';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';
import {contact} from '../../templates/global-partials';

export interface ChatProps {
  contact: any;
  input: InputMessage;
  button: Button;
}

export class Chat extends Block {
  private buttonsBlock: Block[];
  private input: { nameField: string; idError: string; type: string; nameInput: string; validation: ((value: string) => null | string)[] };
  private button: ButtonProps[];
  private inputBlock: Block;


  constructor(props: ChatProps) {
    super('chat', props);
  }

  componentDidRender() {
    this.props.button.componentDidRender();
    this.props.input.componentDidRender();

    const clip = document.querySelector<HTMLElement>('.clip');
    const clipMenu = document.querySelector<HTMLElement>('.function-clip');
    if (clip) {
      clip.onclick = () => {
        if (clipMenu) {
          clipMenu.classList.contains('invisible') ? clipMenu.classList.remove('invisible') : clipMenu.classList.add('invisible');
        }
      }
    }

    const threePoint = document.querySelector<HTMLElement>('.three-point');
    const threePointMenu = document.querySelector<HTMLElement>('.function-three-point');
    if (threePoint) {
      threePoint.onclick = () => {
        if (threePointMenu) {
          threePointMenu.classList.contains('invisible') ? threePointMenu.classList.remove('invisible') : threePointMenu.classList.add('invisible');
        }
      }
    }

    const addUser = document.querySelector<HTMLElement>('.add-user');
    if (addUser) {
      addUser.onclick = () => {
        this.buttonsBlock = [];
        this.input = {
          nameField: 'Логин',
          type: 'text',
          nameInput: 'login',
          idError: 'login-error',
          validation: [
            (value: string) => {
              return value ? null : 'заполните поле';
            }],
        };
        this.inputBlock = new Input(this.input);

        this.button = [{
          classButton: 'button__data',
          textButton: 'Добавить',
          onClick: this.onEnterClickAddUser,
        }];
        for (const item of this.button) {
          this.buttonsBlock.push(new Button({...item, inputs: [this.inputBlock]}));
        }

        const modalWindow = new ModalWindow({
          classForm: 'form form__add-user modal-window__form',
          head: 'Добавить пользователя',
          input: this.inputBlock,
          buttons: this.buttonsBlock,
        });
        globalRender('body', modalWindow);
      }
    }

    const deleteUser = document.querySelector<HTMLElement>('.delete-user');
    if (deleteUser) {
      deleteUser.onclick = () => {
        this.buttonsBlock = [];
        this.input = {
          nameField: 'Логин',
          type: 'text',
          nameInput: 'login',
          idError: 'login-error',
          validation: [
            (value: string) => {
              return value ? null : 'заполните поле';
            }],
        };
        this.inputBlock = new Input(this.input);

        this.button = [{
          classButton: 'button__data',
          textButton: 'Удалить',
          onClick: this.onEnterClickDeleteUser,
        }];
        for (const item of this.button) {
          this.buttonsBlock.push(new Button({...item, inputs: [this.inputBlock]}));
        }

        const modalWindow = new ModalWindow({
          classForm: 'form form__delete-user modal-window__form',
          head: 'Удалить пользователя',
          input: this.inputBlock,
          buttons: this.buttonsBlock,
        });
        globalRender('body', modalWindow);
      }
    }

    const deleteChat = document.querySelector<HTMLElement>('.delete-chat');
    if (deleteChat) {

      deleteChat.onclick = () => {
        this.buttonsBlock = [];
        this.button = [
          {
            classButton: 'button__data',
            textButton: 'Удалить',
            onClick: this.onEnterClickDeleteChat,
          },
          {
            classButton: 'button__link',
            textButton: 'Отмена',
            link: '/chat-write',
          }
        ];
        for (const item of this.button) {
          this.buttonsBlock.push(new Button(item));
        }
        const modalWindow = new ModalWindow({
          classForm: 'form form__delete-chat modal-window__form',
          head: 'Удалить Чат',
          buttons: this.buttonsBlock,
        });
        globalRender('body', modalWindow);
      }
    }
  }

  render(): string {
    this.props.contact.chat.array = [];
    let idChat = 0;
     if (AppStore.activeChatId){
       idChat = AppStore.activeChatId;
     }
     if (!contact.chat.messages[idChat]){
       contact.chat.messages[idChat] = [];
     }
    for(const item of contact.chat.messages[idChat]){
      this.props.contact.chat.array.push(item);
  }
    for(const item of this.props.contact.chat.array){
      if (item.time.length > 5){
        item.time = item.time.substr(11,5);
      }
    }
    console.log(this.props.contact.chat.array);
    const template = Handlebars.compile(`
 <div class="top-menu">
        <div>
            <span class="avatar"></span>
            <span class="contact"> {{nameContact}} </span>
        </div>
        <div>
            <div class="not-margin delete-chat"><img src="../../images/trash.png" alt=""></div>
            <span class="three-point">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
    </div>
    <span class="line"></span>
    <div class="chat">
       
        {{#each contact.chat.array}}
                {{#if (isNotIdUser user_id)}}
                   <p class="contacts-message">{{content}}
                    <time class="time-message ">{{time}}</time>
                </p>
                {{/if}}
                {{#if file}}
                    <div class="contacts-media">
                    <img src="{{message}}" alt="">
                    <time class="time-message ">{{time}}</time>
                </div>
                {{/if}}
                {{#if (isIdUser user_id)}}
                    <p class="your-message">
                    <span>{{content}}</span>
                    <span><img src="../../images/check-marks.png" alt="">
                        <time class="time-message ">{{time}}</time></span>
                </p>
                {{/if}}
        {{/each}}
        <div class="function-clip invisible">
            <div>
                <img src="../../images/media.png" alt="">
                <span>Фото или видео</span>
            </div>
            <div>
                <img src="../../images/file.png" alt="">
                <span>Файл</span>
            </div>
            <div>
                <img src="../../images/location.png" alt="">
                <span>Локация</span>
            </div>
        </div>
        <div class="function-three-point invisible">
            <div><div class="add-user without-changes">
                <img src="../../images/add-user.png" alt="">
                <span>Добавить пользователя</span></div>
            </div>
            <div><div class="delete-user without-changes">
                <img src="../../images/delete-user.png" alt="">
                <span>Удалить пользователя</span></div>
            </div>
        </div>
    </div>
    <span class="line"></span>
    <div class="footer">
        <div class='clip'><img src="../../images/clip.png" alt=""></div>
        <div class="message-div"></div>
        <div class="button__img"></div> 
      
    </div>  `);


    return template(this.props).replace('<div class="message-div"></div>', '<div class="message-div"><app-input>' + this.props.input.getContent().innerHTML + '</app-input></div>')
      .replace('<div class="button__img"></div>', '<div class="button__img"><div class="button__container">' + this.props.button.getContent().innerHTML + '</div></div>');
  }

  onEnterClickAddUser(formData: any) {
    chatsApi.findUserRequest(formData)
      .catch(() => {
        console.log(alert('пользователь не найден'));
      }).then((result: any) => {
        for (const item of result.response) {
          if (item.login === formData.login) {
            chatsApi.addUsersToChat(item.id)
          }
        }
      }
    ).then(() => {
        AppStore.router.go('/chat-write');
    }
    );
  }


  onEnterClickDeleteUser(formData: any) {
    chatsApi.findUserRequest(formData)
      .catch(() => {
        console.log(alert('пользователь не найден'));
      }).then((result: any) => {
        for (const item of result.response) {
          if (item.login === formData.login) {
            chatsApi.deleteUsersFromChat(item.id)

          }
        }
      }
    ).catch(() => {
      console.log(Error);
    }).then(() => {
        AppStore.router.go('/chat-write');
      }
    );
  }


  onEnterClickDeleteChat() {
    chatsApi.deleteChat()
      .catch(() => {
        console.log(Error);
      }).then(() => {
        AppStore.activeChatId = undefined;
        AppStore.router.go('/chat-select');
      }
    );
  }
}


import {InputMessage} from '../input/input-message';
import {Button} from '../button/button';
import {Block} from '../block/block';
import {Input} from '../input/input';
import {ModalWindow} from '../modal-window/modal-window';
import {render as globalRender} from '../render';
import {InputProps} from '../input/input.interface';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';

export interface SidebarChatProps {
  arr:  any[];
  input?: InputMessage;
  button?: Button;
  content: Block | string;
  activeIdChat?: number;
}

export class SidebarChat extends Block {
  private buttonsBlock: Block[];
  private input: InputProps;
  private inputBlock: Block;
  private button: {
    textButton: string;
    onClick: any;
    alert: boolean;
    inputs: Block[];
    classButton: string
  }[];
  constructor(props: SidebarChatProps) {
    super('sidebar-chat', props);
  }

  componentDidRender() {
    const newChat: HTMLElement = <HTMLElement>document.querySelector('#new-chat');
    if (newChat) {
      newChat.onclick = () => {
        this.buttonsBlock = [];
        this.input = {
          nameField: '',
          type: 'text',
          nameInput: 'title',
          idError: 'new-chat-error',
          validation: [
            (value: string):null|string => {
              return value ? null : "заполните поле";
            },
          ]
        };

        this.inputBlock = new Input(this.input);

          this.button = [{
            classButton: 'button__data',
            textButton: 'Создать чат',
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
          head: 'Введите название чата',
          input: this.inputBlock,
          buttons: this.buttonsBlock,
        });
        globalRender('body', modalWindow);
      }
    }
    if (typeof this.props.content !== 'string'){
      this.props.content.componentDidRender();
    }

    const profileView: HTMLElement = document.querySelector('#profile-view') as HTMLElement;
    if (profileView){
      profileView.onclick = () => {
        AppStore.router.go('/profile-view');
      }
    }
  }

  render(): string {

    let content:string;
    if (typeof this.props.content === 'string'){
      content = this.props.content;
    } else {
      content = this.props.content.getContent().innerHTML;
    }

    const template = Handlebars.compile(`<aside class="sidebar">
   <div class = 'new-chat-and-profile'>
        <img id='new-chat' src="../../images/new-chat.png">
        <div id="profile-view" class="profile">Профиль ></div>
   </div>
    <span class="search"><img src="../../images/search.png" alt=""><span>Поиск</span></span>
    <ul>
    {{#each arr}}
           {{> chat-list  titleChat = title time = time message = message unread = unread id = id activeClass = activeClass}} 
    {{/each}}
    </ul>
    </aside>
    <div class="main-view">
    ${content}
    </div>`);

    return template(this.props);
  }

  onEnterClick (formData :any){
    chatsApi.createChat(formData)
      .catch(() => {
        console.log(Error);
      }).then((result:{response: {id:number}})=> {
          AppStore.activeChatId = result.response.id;
          AppStore.router.go('/chat-write');
    });
  }
}

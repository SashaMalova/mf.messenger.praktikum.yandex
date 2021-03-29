import '../../templates/global-partials';
import {contact} from '../../templates/global-partials';
import {Chat} from '../../components/chat/chat';
import {SidebarChat} from '../../components/sidebar/sidebar';
import {InputMessage} from '../../components/input/input-message';
import {Button} from '../../components/button/button';
import {Block} from '../../components/block/block';
import {AppStore} from '../../store/store';
import {cloneDeep} from '../../utilities/clon-deep';
import {chatsApi} from '../../services/chats-api';

export interface ChatPageProps {
  chats: {
    title: string,
    id: number,
    avatar: any,
    created_by: number,
  }[],
  activeIdChat: number,
}

export class ChatPage extends Block {
  private sidebarChat: SidebarChat;
  public arr: {
    title: string,
    id: number,
    avatar: any,
    time: string,
    message: string,
    unread: string,
    activeClass: string,
  }[];
  public content: Block;
  constructor(props: ChatPageProps) {
    super('chat-page', props);

    chatsApi.getChats()
      .catch(() => {
        console.log('error');
      })
      .then((result: PlainObject) => {
        this.props.chats = cloneDeep(result.response);
      });
  }

  componentDidRender() {
    this.sidebarChat.componentDidRender();

    let sidebarChatItems: HTMLElement[];
    sidebarChatItems = Array.from(document.querySelectorAll('.sidebar-chat-item'));
    for (let item of sidebarChatItems) {
      item.onclick = ()=>{
        AppStore.activeChatId = Number(item.attributes.getNamedItem('data-id')?.value)
        this.props.activeIdChat = AppStore.activeChatId;
      }
    }
  }

  render(): string {

    const messageInput = new InputMessage({
      nameField: '',
      type: 'text',
      nameInput: 'message',
      idError: 'message-error',
      validation: [
        (value: string) => {
          return !!value ? null : 'заполните поле';
        },
      ],
    });

    const buttonSend = new Button({
      classButton: 'data',
      textButton: `../../images/arrow.png`,
      classImg: 'button-send',
      inputs: [messageInput],
      alert: true,
    });

    this.content = new Chat({contact: contact, input: messageInput, button: buttonSend});

    this.arr = [];
    if (this.props.chats){
      console.log(AppStore.activeChatId);
      for (let item of  Object.keys(this.props.chats) ){
        this.arr.push({
          title: this.props.chats[item].title,
          id: this.props.chats[item].id,
          avatar: this.props.chats[item].avatar,
          activeClass: (AppStore.activeChatId === this.props.chats[item].id) ? 'select-chat' : '',
          time: '10:49',
          message: 'Изображение',
          unread: '2',
        });
      }
    }
    this.sidebarChat = new SidebarChat({
      arr: this.arr,
      content: this.content,
    });

    return this.sidebarChat.getContent().innerHTML;
  }
}













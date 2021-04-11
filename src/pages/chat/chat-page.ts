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
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
      user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string
      },
      time: string,
      content: string
    }
  }[],
  activeIdChat: number,
  content: Block;
}

let socket: WebSocket;

export class ChatPage extends Block {

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
  private count = 0;
  private sidebarChat: SidebarChat;
  private token: string;
  private buttonSend: Button;
  private messageInput: InputMessage;

  constructor(props: ChatPageProps) {
    super('chat-page', props);
    chatsApi.getUserInfo()
      .catch(() => AppStore.router.go('/login'))
      .then((result) => {
        AppStore.user = cloneDeep(result.response);
        AppStore.activeUserId = Number(AppStore.user.id);
      });

    this.fetchChatsList();
  }

  componentDidRender() {
    this.onChat();
    this.content.componentDidRender();
    const messageSend = document.querySelector<HTMLElement>('.button-send');
    if (messageSend) {
      messageSend.onclick = () => {
        let uncorrect = false;
        if (this.messageInput) {

          if (!this.messageInput.validate()) {
            uncorrect = true
          }

          if (uncorrect) {
            return;
          } else {
            const formData = Array.from(document.querySelectorAll('input'))
              .reduce((acc: { [key: string]: string | File }, {name, value, files}) => {
                acc[name] = files ? files[0] : value;
                return acc;
              }, {});

            const input = document.querySelector('input');
            if (input) {
              input.value = '';
            }

            socket.send(JSON.stringify({
              content: formData.message,
              type: 'message',
            }));
          }
        }
      }
    }
    const sidebarChatItems: HTMLElement[] = Array.from(document.querySelectorAll('.sidebar-chat-item'));
    for (const item of sidebarChatItems) {
      item.onclick = () => {
        AppStore.activeChatId = Number(item.attributes.getNamedItem('data-id')?.value);
        if (!contact.chat.messages[AppStore.activeChatId]) {
          contact.chat.messages[AppStore.activeChatId] = [];
        }
        if (this.props.activeIdChat !== AppStore.activeChatId) {
          this.props.activeIdChat = AppStore.activeChatId;
        }
      }
    }
    this.sidebarChat.componentDidRender();

    const block = document.querySelector('.chat');
    if (block) {
      block.scrollTop = block.scrollHeight;
    }
  }

  render(): string {


    this.messageInput = new InputMessage({
      nameField: '',
      type: 'text',
      nameInput: 'message',
      idError: 'message-error',
      validation: [
        (value: string) => {
          return value ? null : 'заполните поле';
        },
      ],
    });

    this.buttonSend = new Button({
      classButton: 'button__data',
      textButton: `../../images/arrow.png`,
      classImg: 'button-send',
      inputs: [this.messageInput],
      alert: true,
    });

    this.content = new Chat({contact: contact, input: this.messageInput, button: this.buttonSend});

    this.arr = [];
    if (this.props.chats) {
      for (const item of this.props.chats) {
        this.arr.push({
          title: item.title,
          id: item.id,
          avatar: item.avatar,
          activeClass: (AppStore.activeChatId === item.id) ? 'select-chat' : '',
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

  onChat() {
    let idChat = 0;
    if (AppStore.activeChatId) {
      idChat = AppStore.activeChatId;
    }
    if (!socket || (socket.url.indexOf('/' + AppStore.activeChatId + '/') === -1)) {
      chatsApi.connectToChat()
        .then((result: PlainObject) => {
          this.token = result.response.token;

          socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' + AppStore.activeUserId + '/' + AppStore.activeChatId + '/' + this.token);

          socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            if (this.count === 0) {
              socket.send(JSON.stringify({
                content: this.count.toString(),
                type: 'get old',
              }));
              this.count = this.count + 20;
            }

            setInterval(() => {
              socket.send('');
            }, 10000);
          });

          socket.addEventListener('close', event => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
            if (event.code === 1006) {
              this.onChat();
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });

          socket.addEventListener('message', event => {
            console.log('Данные получены', event.data);
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              const length = contact.chat.messages[idChat].length;
              for (const item of data) {
                let flag = true;
                for (const i of contact.chat.messages[idChat]) {
                  if (i.id === item.id) {
                    flag = false;
                  }
                }
                if (flag) {
                  contact.chat.messages[idChat].push(item);
                }
              }
              if (length !== contact.chat.messages[idChat].length) {
                socket.send(JSON.stringify({
                  content: this.count.toString(),
                  type: 'get old',
                }));
                this.count = this.count + 20;
                AppStore.router.go('/chat-write');
              }
            } else {
              if (data.type === 'message') {
                contact.chat.messages[idChat].push(data);
                AppStore.router.go('/chat-write');
              }
            }
          });

          socket.addEventListener('error', event => {
            console.log('Ошибка', event);
          });

        })
    }


  }

  private fetchChatsList() {
    chatsApi.getChats()
      .catch(() => {
        AppStore.router.go('/login');
      })
      .then((result: PlainObject) => {
        this.props.chats = cloneDeep(result.response);
        for (const item of this.props.chats) {
          if (!contact.chat.messages[item.id]) {
            contact.chat.messages[item.id] = [];
          }
        }
      })


  }
}

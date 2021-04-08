import '../../templates/global-partials';
import {SidebarChat} from '../../components/sidebar/sidebar';
import {Block} from '../../components/block/block';
import {cloneDeep} from '../../utilities/clon-deep';
import {AppStore} from '../../store/store';
import {chatsApi} from '../../services/chats-api';

export interface SelectChatPageProps {
  chats: {
    title: string,
    id: number,
   avatar: any,
    created_by: number,
      }[],
}

export class SelectChatPage extends Block {
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


  constructor(props: SelectChatPageProps) {
    super('select-chat-page', props);

    this.props.user = {};
    this.fetchChatsList();
  }

  private fetchChatsList() {
    chatsApi.getChats()
      .catch(() => {
        alert('error');
      })
      .then((result: PlainObject) => {
        this.props.chats = cloneDeep(result.response);
      });
  }

  componentDidRender() {
    this.sidebarChat.componentDidRender();
    const sidebarChatItems: HTMLElement[] = Array.from(document.querySelectorAll('.sidebar-chat-item'));
    for (const item of sidebarChatItems) {
      item.onclick = ()=>{
        AppStore.activeChatId = Number(item.attributes.getNamedItem('data-id')?.value)
        AppStore.router.go('/chat-write');
      }
    }
  }

  render(): string {
    this.arr = [];
    // this.fetchChatsList();

    if (this.props.chats){
      for (const item of  Object.keys(this.props.chats) ){
        this.arr.push({
          title: this.props.chats[item].title,
          id: this.props.chats[item].id,
          avatar: this.props.chats[item].avatar,
          activeClass: '',
          // activeClass: (AppStore.activeChatId === this.props.chats[item].id) ? 'select-chat' : '',
          time: '10:49',
          message: 'Изображение',
          unread: '2',
        });
      }
    }

    this.sidebarChat = new SidebarChat({
      arr: this.arr,
      content: '<p>Выберите чат чтобы отправить сообщение</p>',
    });

    return this.sidebarChat.getContent().innerHTML;
  }



}



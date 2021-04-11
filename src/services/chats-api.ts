import {AppStore} from '../store/store';
import {HTTPTransport} from '../components/http-transport';

export class ChatsApi {
  private appFetch: HTTPTransport;
  private apiHost:{[key:string]:string};
  constructor(httpTransport?: HTTPTransport) {
    this.appFetch = httpTransport ? httpTransport : new HTTPTransport('https://ya-praktikum.tech/api/v2/');
    this.apiHost = {
      signUp: 'auth/signup',
      signIn: 'auth/signin',
      getUserInfo: 'auth/user',
      logout: 'auth/logout',
      getChats: 'chats',
      createChat: 'chats',
      deleteChat: 'chats',
      addUsersToChat: 'chats/users',
      deleteUsersFromChat: 'chats/users',
      changeUserProfile: 'user/profile',
      changeUserAvatar: 'user/profile/avatar',
      changePasswordRequest: 'user/password',
      findUserRequest: 'user/search',
      connectToChat: 'chats/token/',
      unreadCount: 'chats/new/',
    }
  }
  signUp(formData: Data): Promise<any> {
    return this.appFetch.post(this.apiHost.signUp, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        data: {
          first_name: formData.first_name,
          second_name: formData.last_name,
          login: formData.login,
          email: formData.email,
          password: formData.newPassword,
          phone: formData.phone
        }
      }
    )
  }

  signIn(formData: Data): Promise<any> {
    return this.appFetch.post(this.apiHost.signIn, {
      headers: {'Content-Type': 'application/json'},
      data: {
        login: formData.login,
        password: formData.password,
      }
    },)
  }

  getUserInfo(): Promise<any> {
    return this.appFetch.get( this.apiHost.getUserInfo, {
      headers: {
        'accept': 'application/json'
      },
    })
  }

  logout(): Promise<any> {
    return this.appFetch.post(this.apiHost.logout, {
      headers: {
        'accept': 'application/json'
      }
    })
  }

  getChats(): Promise<any> {
    return this.appFetch.get(this.apiHost.getChats, {
      headers: {
        'accept': 'application/json'
      },
    })
  }

  createChat(formData: Data): Promise<any> {
    return this.appFetch.post(this.apiHost.createChat, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        title: formData.title,
      }},)
  }

  deleteChat(): Promise<any> {
    return this.appFetch.delete(this.apiHost.deleteChat, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        chatId: AppStore.activeChatId,
      }},)
  }

  addUsersToChat(id:number):Promise<any> {
    return this.appFetch.put(this.apiHost.addUsersToChat, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        users: [id],
        chatId: AppStore.activeChatId,
      }
    },)
  }

  deleteUsersFromChat(id:number):Promise<any> {
    return this.appFetch.delete(this.apiHost.deleteUsersFromChat, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        users: [id],
        chatId: AppStore.activeChatId,
      }
    },)
  }

  changeUserProfile(formData: Data): Promise<any> {
   return this.appFetch.put(this.apiHost.changeUserProfile, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        first_name: formData.first_name,
        second_name: formData.second_name,
        display_name: formData.display_name,
        login: formData.login,
        email: formData.email,
        phone: formData.phone
      }},)
  }

  changeUserAvatar(form:FormData):Promise<any> {
    return this.appFetch.put(this.apiHost.changeUserAvatar, {
      headers: {
        "accept": "application/json",
      },
      data: form
    },)
  }

  changePasswordRequest(formData: Data): Promise<any> {
   return this.appFetch.put(this.apiHost.changePasswordRequest, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }},)
  }

  findUserRequest(formData: Data):Promise<any> {
    return this.appFetch.post(this.apiHost.findUserRequest, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        login: formData.login,
      }
    },)
  }

  connectToChat():Promise<any> {
      return this.appFetch.post(this.apiHost.connectToChat + AppStore.activeChatId, {
      headers: {
      },
      data: {
      }
    },)
  }

  unreadCount(id:number):Promise<any> {
    return this.appFetch.post(this.apiHost.connectToChat + id, {
      headers: {
        "accept": "application/json",
      },
      data: {
      }
    },)
  }

}

export const chatsApi = new ChatsApi();
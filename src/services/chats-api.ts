
import {AppStore} from '../store/store';
import {HTTPTransport} from '../components/http-transport';

export class ChatsApi {
  private appFetch: HTTPTransport;

  constructor(httpTransport?: HTTPTransport) {
    this.appFetch = httpTransport ? httpTransport : new HTTPTransport();
  }

  signUp(formData: any): Promise<any> {
    return this.appFetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {
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

  signIn(formData: any): Promise<any> {
    return this.appFetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
      headers: {'Content-Type': 'application/json'},
      data: {
        login: formData.login,
        password: formData.password,
      }
    },)
  }

  getUserInfo() {
    return this.appFetch.get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        'accept': 'application/json'
      },
    })
  }

  logout(): Promise<any> {
    return this.appFetch.post('https://ya-praktikum.tech/api/v2/auth/logout', {
      headers: {
        'accept': 'application/json'
      }
    })
  }

  getChats(): Promise<any> {
    return this.appFetch.get('https://ya-praktikum.tech/api/v2/chats', {
      headers: {
        'accept': 'application/json'
      },
    })
  }

  createChat(formData: any): Promise<any> {
    return this.appFetch.post('https://ya-praktikum.tech/api/v2/chats', {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        title: formData.title,
      }},)
  }

  deleteChat(): Promise<any> {
    return this.appFetch.delete('https://ya-praktikum.tech/api/v2/chats', {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        chatId: AppStore.activeChatId,
      }},)
  }

  addUsersToChat(id:number):Promise<any> {
    return this.appFetch.put('https://ya-praktikum.tech/api/v2/chats/users', {
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
    return this.appFetch.delete('https://ya-praktikum.tech/api/v2/chats/users', {
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

  changeUserProfile(formData: any): Promise<any> {
   return this.appFetch.put('https://ya-praktikum.tech/api/v2/user/profile', {
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
    return this.appFetch.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      headers: {
        "accept": "application/json",
      },
      data: form
    },)
  }

  changePasswordRequest(formData: any): Promise<any> {
   return this.appFetch.put('https://ya-praktikum.tech/api/v2/user/password', {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }},)
  }

  findUserRequest(formData:any):Promise<any> {
    return this.appFetch.post('https://ya-praktikum.tech/api/v2/user/search', {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      data: {
        login: formData.login,
      }
    },)
  }

}

export const chatsApi = new ChatsApi();
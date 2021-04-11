import {Router} from '../components/router';

export class AppStore {

  static get activeChatId() {
    return Number(sessionStorage.getItem('activeChatId'));
  }

  static set activeChatId(id: number | undefined) {
    if (id) {
      sessionStorage.setItem('activeChatId', id.toString());
    } else {
      sessionStorage.removeItem('activeChatId');
    }
  }

  static get activeUserId() {
    return Number(sessionStorage.getItem('activeUserId'));
  }

  static set activeUserId(id: number | undefined) {
    if (id){
      sessionStorage.setItem('activeUserId', id.toString());
    }else {
      sessionStorage.removeItem('activeUserId');
    }
  }

  public static socket:WebSocket;
  public static user:{ [key: string]: string }|undefined;
  public static router: Router;

}


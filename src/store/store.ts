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
  public static router: Router;
}


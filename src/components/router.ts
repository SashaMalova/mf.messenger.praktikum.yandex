import {Route} from './route';
import {Block} from './block/block';
import {EventBus} from './event-bus';
import {AppStore} from '../store/store';

export class Router {

  static EVENTS = {
    ROUTE_CHANGE: 'router:route-change',
  };
  eventBus!: EventBus;
  routes: Route[];

  // window.history
  history: any;

  _currentRoute: null|Route;
  _rootQuery: string;

  static __instance: Router;

  constructor(rootQuery:string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;

    this.eventBus = new EventBus();
  }

  /**
   * создает пару - компонент + путь и регистрирует их
   * @param pathname путь страницы
   * @param block конструктор компонента связанного со страницей
   */
  use(pathname:string, block: new () => Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this
  }

  /**
   * регистрация слушателя события смены адреса страницы
   */
  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if ((<Window>event?.currentTarget)?.location?.pathname){
        this._onRoute((<Window>event.currentTarget).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  /**
   * перейти на новую страницу
   * @param pathname
   */
  go(pathname:string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  /**
   * если в истории есть предидущая страница - перейти на нее
   */
  back() {
    if (this.history.back){
      this._onRoute(this.history.back())
    }

  }

  /**
   * перейти на след страницу в истории (если есть)
   */
  forward() {
    if (this.history.forward){
      this._onRoute(this.history.forward())
    }
  }

  /**
   * вернуть роут связанный с url
   * @param pathname url
   */
  getRoute(pathname:string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  /**
   * отправляет события leave (если есть текущий роут) или render
   * в объект Route связанный с pathname
   * @param pathname новый путь страницы
   * @private
   */
  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
     return AppStore.router.go('/404');
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();

    // для модального окна - закрыть
    this.eventBus.emit(Router.EVENTS.ROUTE_CHANGE);
  }

}


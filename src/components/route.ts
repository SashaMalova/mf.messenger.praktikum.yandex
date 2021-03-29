import {render} from './render';
import {Block} from './block/block';
import {isEqual} from '../utilities/is-equal';

export class Route {
 _pathname : string;
 _blockClass: new() => Block;
 _block:  Block|null;
 _props:any;

  /**
   * @param pathname путь связанный с роутом
   * @param view ф-я конструктор для будущего привязанного компонента
   * @param props rootQuery - куда прикрепить компонент view в html
   */
  constructor(pathname:string, view: new() => any, props: {rootQuery: string}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  /**
   * Если переданный путь соответствует текущему Route, вызывает функцию отрисовки
   * @param pathname
   */
  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  /**
   * скрывает компонент
   */
  leave() {
    if (this._block) {
      this._block.getContent().remove();
    }
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }

  /**
   * функция отрисофки компонента, связаного с этим Route
   */
  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}

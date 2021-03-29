import {Block} from './block/block';
import {AppStore} from '../store/store';

export class ReDirect extends Block {

  constructor() {
    super('redirect');
  }

componentDidRender() {
  AppStore.router.go('/login');
}
}

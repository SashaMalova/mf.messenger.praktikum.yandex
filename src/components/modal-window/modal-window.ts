import {Block} from '../block/block';
import {loginSigningTemplate} from '../../templates/form-template';
import {AppStore} from '../../store/store';
import {Router} from '../router';

export interface ModalWindowProps {
  classForm: string;
  head: string;
  input?: Block;
  buttons?: Block[];
}

export class ModalWindow extends Block {

  constructor(props: ModalWindowProps) {
    super('app-modal-window', props);
  }

  componentDidRender() {
    for (let item of this.props.buttons) {
      item.componentDidRender();
    }
    if (this.props.input) {
      this.props.input.componentDidRender();
    }
    const blackout = document.querySelector<HTMLElement>('.modal-window__blackout');
    const appModalWindow = document.querySelector<HTMLElement>('app-modal-window')
    if (blackout) {
      blackout.onclick = () => {
        if (appModalWindow) {
          appModalWindow.remove();
        }
      };
      window.addEventListener('popstate', () => {
        if (appModalWindow) {
          appModalWindow.remove();
        }
      });

      AppStore.router.eventBus.on(Router.EVENTS.ROUTE_CHANGE, () => {
        if (appModalWindow) {
          appModalWindow.remove();
        }
      })
    }
  }

  render() {
    let template = loginSigningTemplate(
      this.props.classForm,
      this.props.head,
    );

    let result = '<div class="modal-window__blackout"></div>' + template;
    if (this.props.input) {
      result = result.replace('<div class="input-div"><app-input class="container"></app-input></div>', '<div class="input-div"><app-input class="container">' + this.props.input.getContent().innerHTML + '</app-input></div>');
    }

    if (this.props.buttons) {
      for (let item of this.props.buttons) {
        result =  result.replace('<div class="button"></div>','<div class="button"><div class="button__container">' + item.getContent().innerHTML + '</div></div><div class="button"></div>');
      }
    }
    return result;
  }
}

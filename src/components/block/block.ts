import {EventBus} from '../event-bus';

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };
  eventBus: () => EventBus;
  props: {[key: string]: any};
  _meta: { tagName: string, props?: any } | null = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   * @returns {void}
   */
  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _element: null | HTMLElement = null;

  get element() {
    return this._element;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    if (this._meta) {
      const {tagName} = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }


  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  _render() {
    const block: string = this.render();
    if (this._element) {
      this._element.innerHTML = block;
    }
    this.componentDidRender();
  }

  render(): string {
    return '';
  }

  componentDidRender() {
    return;
  }

  componentDidMount() {
    return;
  }

  getContent(): HTMLElement {
    return this.element || {} as HTMLElement;
  }

  _makePropsProxy(props: any) {
    return new Proxy(props, {
      set: (target, prop, value) => {
        const oldProps = {...props};
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  validate() {
    return;
  }

  clearError() {
    return;
  }

  show() {
    if (this._element) {
      this._element.classList.remove('hidden');
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add('hidden');
    }
  }
}
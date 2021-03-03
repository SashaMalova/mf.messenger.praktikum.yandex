import { EventBus } from "./event-bus.js";
export class Block {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        this._meta = null;
        this._element = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
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
    get element() {
        return this._element;
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    }
    _render() {
        const block = this.render();
        if (this._element) {
            this._element.innerHTML = block;
        }
    }
    render() {
        return '';
    }
    componentDidRender() {
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        let self = this;
        return new Proxy(props, {
            set(target, prop, value) {
                let oldProps = Object.assign({}, props);
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            }
        });
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    validate() {
    }
    clearError() {
    }
    show() {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }
    hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
};
//# sourceMappingURL=block.js.map
import {expect} from 'chai';
import {Block} from './block';
import {EventBus} from '../event-bus';

describe('Router tests', () => {

  let block: Block;
  beforeEach(() => {
    block = new Block('block')
  });

  it('should compile', () => {
    expect(block).not.eq(null);
  });

  it('check that the block _registerEvents triggers the eventbus.on event 4 times', () => {
    let onEventBusCounter = 0;
    let eventbus = new EventBus();
    eventbus.on = () => (onEventBusCounter++);

     expect(block._registerEvents(eventbus)).eq(undefined);
    expect(onEventBusCounter).eq(4);
  });

    it('check that if meta equal null, that block_createResources() undefined', () => {
        block._meta = null;
                expect(block._createResources()).eq(undefined);
    });

    it('check that the block init triggers the eventbus.emit event 1 times', () => {
        let onEventBusCounter = 0;
        EventBus.prototype.emit = () => {onEventBusCounter++};
        expect(block.init()).eq(undefined);
        expect(onEventBusCounter).eq(1);
    });

    it('check that the block init triggers the _createResources event 1 times', () => {
        let oncreateResourcesCounter = 0;
        block._createResources = () => {oncreateResourcesCounter++};
        expect(block.init()).eq(undefined);
        expect(oncreateResourcesCounter).eq(1);
    });

    it('check that the block _componentDidMount triggers the eventbus.emit event 1 times', () => {
        let onEventBusCounter = 0;
        EventBus.prototype.emit = () => {onEventBusCounter++};
        expect(block._componentDidMount()).eq(undefined);
        expect(onEventBusCounter).eq(1);
    });

    it('check that if new props not equal old props the block componentDidUpdate return true', () => {
        expect(block.componentDidUpdate('112','234')).eq(true);
    });

    it('check that if new props equal old props the block componentDidUpdate return false', () => {
        expect(block.componentDidUpdate('112','112')).eq(false);
    });

    it('check that if new props not equal old props the block _componentDidUpdate triggers the eventbus.emit event 1 times', () => {
        let onEventBusCounter = 0;
        EventBus.prototype.emit = () => {onEventBusCounter++};
        expect(block._componentDidUpdate('123','321')).eq(undefined);
        expect(onEventBusCounter).eq(1);
    });

    it('if nextProps is null then setProps is undefined', () => {
        expect(block.setProps(null)).eq(undefined);
    });

    it('block setProps should copy nextProps to this.props ', () => {
        const nextProps = {a:1,b:2};
        block.setProps(nextProps);
        expect(block.props).deep.eq(nextProps);
    });

    it('if block.element is null then block _render is undefined', () => {
        block._element = null;
        expect(block._render()).eq(undefined);
    });

       it('check that  _makePropsProxy return Proxy', () => {
           expect(block._makePropsProxy({a:1,b:2})).deep.eq({a:1,b:2});
    });
});


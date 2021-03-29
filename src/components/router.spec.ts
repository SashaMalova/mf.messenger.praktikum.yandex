import {expect} from 'chai';
import {Router} from './router';
import {Block} from './block/block';
import {Route} from './route';
import {LoginPage} from '../pages/login/login';

describe('Router tests', () => {

  let router: Router;
  beforeEach(() => {
    router = new Router('body')
  });
  it('should compile', () => {
    expect(router).not.eq(null);
  });

  it('router use should returns object with Router type', () => {
    expect(router.use('/name', Block) instanceof Router).eq(true);
  });

  it('check that the router starts on the popstate event triggers the onRoute event', () => {
    let onRouteCounter = 0;
    router._onRoute = () => {
      onRouteCounter++
    };
    expect(router.start()).eq(undefined);
    expect(onRouteCounter).eq(1);
  });

  it('check that the router getRoute return route', () => {
    router.use('/login', LoginPage).start();
    expect(router.getRoute('/login') instanceof Route).eq(true);
    expect(router.getRoute('/signin')).eq(undefined);
  });

  it('check that the router getRoute return route', () => {
    router.use('/login', LoginPage).start();
    expect(router.getRoute('/login') instanceof Route).eq(true);
    expect(router.getRoute('/signin')).eq(undefined);
  });

});
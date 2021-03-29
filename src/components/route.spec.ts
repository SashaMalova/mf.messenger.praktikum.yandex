import { expect } from "chai";
import {Route} from './route';
import {Block} from './block/block';

describe("Single route tests", () => {

  it("should compile", () => {
    const route = new Route('/test-name', Block, {rootQuery: 'body'});
    expect(route).not.eq(null);
  });

  it("should match route by path name", () => {
    const route = new Route('/test-name', Block, {rootQuery: 'body'});
    expect(route.match('/test-name')).eq(true);
    expect(route.match('bad-name')).eq(false);
  });

});
import {expect} from 'chai';
import {ChatsApi} from './chats-api';

describe('Chats Api tests', () => {

  let chatsApi: ChatsApi;
  beforeEach(() => {
    chatsApi = new ChatsApi()
  });

  it('should compile', () => {
    expect(chatsApi).not.eq(null);
  });

  it('get chats', (done) => {
    chatsApi = new ChatsApi(
      {
        get: () => Promise.resolve({response: []})
      } as any
    );
    chatsApi.getChats().then((xhr: XMLHttpRequest) => {
      expect(xhr.response).deep.eq([]);
      done();
    })
  });

});
import {Router} from './components/router';
import {Page404} from './pages/404/404';
import {Page500} from './pages/500/500';
import {ChangeDataPage} from './pages/profile/change-data-page';
import {ChangePasswordPage} from './pages/profile/change-password-page';
import {ProfilePage} from './pages/profile/profile-page';
import {ChatPage} from './pages/chat/chat-page';
import {SigninPage} from './pages/signin/signin';
import {SelectChatPage} from './pages/chat/select-chat-page';
import {LoginPage} from './pages/login/login';
import {AppStore} from './store/store';
import {ReDirect} from './components/re-direct';
import './styles/index.less';

AppStore.router = new Router('body');

const props={};

AppStore.router.use('/500', Page500)
  .use('/404',Page404)
  .use('/login', LoginPage)
  .use('/signin', SigninPage)
  .use('/chat-select', SelectChatPage.bind(props))
  .use('/chat-write',ChatPage.bind(props))
  .use('/profile-view', ProfilePage.bind(props))
  .use('/profile-edit', ChangeDataPage.bind(props))
  .use('/profile-password', ChangePasswordPage.bind(props))
  .use('',ReDirect)
  .use('/',ReDirect)
  .start();





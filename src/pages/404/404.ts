import {errorHtml} from '../../templates/error-template';
import {Block} from '../../components/block/block';
import {AppStore} from '../../store/store';

export class Page404 extends Block {

    constructor() {
        super('page-404');
    }
    componentDidRender() {
        const errorBack = <HTMLElement>document.querySelector('.error__back');
        if (errorBack){
            errorBack.onclick = () => {
                AppStore.router.go('/chat-select');
            }
        }
    }

    render(): string {
        return errorHtml('404', 'Не туда попали');
    }
}



import {errorHtml} from '../../templates/error-template';
import {Block} from '../../components/block/block';
import {AppStore} from '../../store/store';

export class Page500 extends Block {

    constructor() {
        super('page-500');
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
        return errorHtml('500', 'Не туда попали');
    }
}

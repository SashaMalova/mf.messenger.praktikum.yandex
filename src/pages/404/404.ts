import {errorHtml} from '../../templates/error-template';
import {Block} from '../../components/block/block';

export class Page404 extends Block {

    constructor() {
        super('page-404');
    }

    render(): string {
        return errorHtml('404', 'Не туда попали');
    }
}



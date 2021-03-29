import {errorHtml} from '../../templates/error-template';
import {Block} from '../../components/block/block';

export class Page500 extends Block {

    constructor() {
        super('page-500');
    }

    render(): string {
        return errorHtml('500', 'Не туда попали');
    }
}

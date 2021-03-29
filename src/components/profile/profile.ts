import {Button} from '../button/button';
import {Block} from '../block/block';
import {Input} from '../input/input';
import {AppStore} from '../../store/store';

export interface ProfileProps {
  user: { [key: string]: string };
  arrBlack?: { [key: string]: string }[];
  arrYellow?: { [key: string]: string }[];
  firstNameVisible: string;
  inputs?: Input[];
  button?: Button;
}

export class Profile extends Block {

  constructor(props: ProfileProps) {
    super('profile', props);
  }

  componentDidRender() {
    const backButton: HTMLElement = document.querySelector('.back') as HTMLElement;
    if (backButton){
      backButton.onclick = () => {
        AppStore.router.back();
      }
    }
  }

  render(): string {
    let contentBlack = ``;
    let contentYellow = ``;
    if (this.props.arrBlack && this.props.arrYellow) {
      contentBlack = `{{#each arrBlack}} {{> black-line  nameField = nameField profileDate = profileDate}} {{/each}}`;
      contentYellow = `{{#each arrYellow}}  {{> yellow-line text = text id = id }}  {{/each}}`;
    } else {
      if (this.props.inputs) {
        for (let item of this.props.inputs) {
          contentBlack = contentBlack + `<div class="input-div"><app-input>` + item.getContent().innerHTML + `</app-input></div>`;
        }
      }
      contentYellow = `<div class="button"><div>` + this.props.button.getContent().innerHTML + `</div></div>`;
    }
    let template = Handlebars.compile(`
        <div  class="back"><span><img src="../../images/arrow-back.png" alt=""></span></div>
        <div class="profile-main">
            <div class="avatar-profile">
                <span class="grey-avatar">
                    <img  src="{{profile.avatar}}" alt="">
                </span>
                <span class="red-avatar hidden">
                    <span class="change-avatar">
                     <img src="{{profile.avatar}}" alt="">Поменять<br> аватар</span>
                </span>
                    <h3 class = "{{firstNameVisible}}">
                       {{profile.first_name}}
                    </h3>
            </div>
            <div>
               ${contentBlack}               
            </div>
            <div class="end">
               ${contentYellow}           
            </div>
        </div>
    `);

    return template(this.props);
  }
}
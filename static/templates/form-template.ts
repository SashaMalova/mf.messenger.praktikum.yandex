

declare var Handlebars: any;
import './global-partials.js';


export function loginSigningTemplate(classForm: string, head: string, link: any) {
    let template = Handlebars.compile(`<div class="{{classForm}} content-form">
        <div class="content-form">
            <h2 class="center">{{head}}</h2> 
             
           <div class="input-div"></div>
            
        </div>
        <div class="content-form"> 
        <div class="button"></div>
        {{#if link}}
        {{> link  class = link.class link = link.link text = link.text}} 
        {{/if}}
        </div>
        </div>
     `);
    return template({
        classForm: classForm,
        head: head,
        link: link,
    })
}




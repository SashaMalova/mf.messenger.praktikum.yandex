import './global-partials';


export function loginSigningTemplate(classForm: string, head: string, link?: {[key:string]:string}) {
    let template = Handlebars.compile(`<div class="{{classForm}} content-form">
        <div class="content-form">
            <h2 class="center">{{head}}</h2> 
             
           <div class="input-div"><app-input></app-input></div>
            
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




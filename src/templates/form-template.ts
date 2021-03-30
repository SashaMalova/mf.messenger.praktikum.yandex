import './global-partials';


export function loginSigningTemplate(classForm: string, head: string, link?: {[key:string]:string}) {
    let template = Handlebars.compile(`<div class="{{classForm}}">
        <div class="container">
            <h2 class="form__header">{{head}}</h2> 
             
           <div class="input-div"><app-input class="container"></app-input></div>
            
        </div>
        <div class="container"> 
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




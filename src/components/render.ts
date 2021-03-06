import {Block} from "./block.js";

export function render(query:string, block: Block) {
    const root = document.querySelector(query);
    let element = block.getContent();
    if (root && element){root.appendChild(element);
        block.componentDidRender();}
        return root;
}
import {Block} from "./block.js";

export function render(query:any, block: Block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    block.componentDidRender();
    return root;
}
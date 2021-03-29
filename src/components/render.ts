import {Block} from './block/block';

export function render(query: string, block: Block, del:boolean = false) {
  const root = document.querySelector(query);
  if (root && del) {
    root.innerHTML = '';
  }

  let element = block.getContent();
  if (root && element) {
    root.appendChild(element);
    block.componentDidRender();
  }
  return root;
}
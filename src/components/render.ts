import {Block} from './block/block';

export function render(query: string, block: Block, del = false) {
  const root = document.querySelector(query);
  if (root && del) {
    root.innerHTML = '';
  }

  const element = block.getContent();
  if (root && element) {
    root.appendChild(element);
    block.componentDidRender();
  }
  return root;
}
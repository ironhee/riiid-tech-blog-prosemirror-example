export class ImageView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.dom = document.createElement('img');
    this.dom.setAttribute('src', node.attrs.src);
    this.dom.addEventListener('click', this.handleClick);
  }

  destroy() {
    this.dom.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const src = prompt('Image url: ');
    if (!src) return;

    this.view.dispatch(
      this.view.state.tr.setNodeMarkup(this.getPos(), undefined, { src })
    );
    this.view.focus();
  };
}
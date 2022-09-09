export default class Section {
  constructor(selector) {
    
    this._container = document.querySelector(selector);
  }

  renderItems({items, renderer}) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(elem) {
    this._container.append(elem);
  }

  addNewItem(elem) {
    this._container.prepend(elem)
  }
}

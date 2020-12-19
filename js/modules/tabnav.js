import debounce from './debounce.js';

export default class TabNav {
  constructor(menu, content) {
    this.tabMenu = document.querySelectorAll(menu);
    this.tabContent = document.querySelectorAll(content);
    this.activeClass = 'ativo';
    this.windowQuarto = window.innerHeight * 0.5;
    this.checkDistance = debounce(this.checkDistance.bind(this), 25);
  }

  // Ativa a tab de acordo com o index da mesma
  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
  }

  getDistance() {
    this.distance = [...this.tabMenu].map((image) => {
      const offset = image.getBoundingClientRect().top;
      return {
        element: image,
        offset,
      };
    });
  }

  checkDistance() {
    this.getDistance();
    this.distance.forEach((item, index) => {
      if (item.offset < this.windowQuarto) this.activeTab(index);
    });
  }

  // Adiciona os eventos nas tabs
  addTabNavEvent() {
    this.tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => this.activeTab(index));
    });
    document.querySelector('.animais-lista').addEventListener('scroll', this.checkDistance);
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      // ativar primeiro item
      this.activeTab(0);
      this.addTabNavEvent();
    }
    return this;
  }
}

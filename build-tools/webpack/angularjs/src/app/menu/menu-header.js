import './menu-header.css';

const template  = require('./menu-header.html').default;

class MenuHeader {
  static $inject = [
    '$document',
  ];

  title = 'Menu Header Title';

  constructor($document) {
    this.$document = $document;
  }

  $onInit() {
    this.$document
      .find('body')
      .addClass(`menufied`);
  }

  editUrl() {
    return `/apps/uie-tech-summit/master-class/tables/content?hello=world`;
  }

  onClick() {
    console.log('clicked user settings link');
  }
}

export const menuHeader = {
  bindings: {},
  controller: MenuHeader,
  template
};

import { AngularI18nNotesPage } from './app.po';

describe('angular-i18n-notes App', () => {
  let page: AngularI18nNotesPage;

  beforeEach(() => {
    page = new AngularI18nNotesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

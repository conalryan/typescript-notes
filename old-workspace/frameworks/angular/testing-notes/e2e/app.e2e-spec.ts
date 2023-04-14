import { AngularTestingNotesPage } from './app.po';

describe('angular-testing-notes App', () => {
  let page: AngularTestingNotesPage;

  beforeEach(() => {
    page = new AngularTestingNotesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

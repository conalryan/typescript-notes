import { AngularMultiPackagePage } from './app.po';

describe('angular-multi-package App', () => {
  let page: AngularMultiPackagePage;

  beforeEach(() => {
    page = new AngularMultiPackagePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

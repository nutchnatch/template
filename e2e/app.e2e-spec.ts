import { TspNgTemplatePage } from './app.po';

describe('tsp-ng-template App', () => {
  let page: TspNgTemplatePage;

  beforeEach(() => {
    page = new TspNgTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

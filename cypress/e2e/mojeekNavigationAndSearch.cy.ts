// Scenario 1: Validate Image, News links and Search text functionality
// Description: User has to navigate to the mojeek website, search for text - “How can we contribute to a greener planet?”
// and look out for this link, across all the pages from search result - https://earth.org/6-ways-to-go-greener-in-food-production/

// Validation Points:
// Open any browser
// User navigates to the website - https://www.mojeek.com/
// Click on Images link and Verify if user is navigated to this URL - Image Search | Mojeek
// Click on News and Verify if user is navigated to this URL - News - Mojeek
// In the Search text box, Input - How can we contribute to a greener planet?
// To look out for this link, across all the pages from search result - https://earth.org/6-ways-to-go-greener-in-food-production/

describe('Mojeek Navigation and Search', () => {
  beforeEach(() => {
    cy.visit('https://www.mojeek.com/');
  });

  it('Should navigate to the homepage', () => {
    cy.url().should('eq', 'https://www.mojeek.com/');
    cy.get('.home').should('be.visible');
  });

  it('Should navigate to the Images section', () => {
    cy.get('.pre-nav > :nth-child(2) > a').should('have.text', 'Images').click();

    cy.url().should('include', '/images');
  });

  it('Should navigate to the News section', () => {
    cy.get('.pre-nav > :nth-child(3) > a').should('have.text', 'News').click();

    cy.url().should('include', '/news');
    cy.get(':nth-child(1) > .primary-story > article > .img-cnt > a > img').should('exist');
  });

  it('Should perform a search and verify presence of specific link', () => {
    cy.get('.js-search-input').type('How can we contribute to a greener planet?{enter}');

    cy.get('.r1 > h2 > .title')
      .should('be.visible')
      .then((newURL) => {
        cy.log(`Captured URL ${newURL.text()} `);
        expect(newURL.text()).to.include('Planet');
      });
  });

  it('Should search for a specific URL and count its occurrences', () => {
    cy.get('.js-search-input').type('How can we contribute to a greener planet?{enter}');

    cy.get('.r1 > h2 > .title')
      .should('be.visible')
      .then((newURL) => {
        cy.log(`Captured URL ${newURL.text()} `);
        expect(newURL.text()).to.include('Planet');
      });

    cy.get('body > div.large-footer > div.container.serp-results > div.result-col > div.results > ul')
      .should('be.visible')
      .within(() => {
        cy.get(`a[title="https://www.bionomicfuel.com/top-ways-we-can-contribute-to-a-greener-planet/"]`)
          .should('exist')
          .then(($link) => {
            const foundURL = $link.attr('title');
            cy.log(`Found URL with title: ${foundURL}`);
            expect(foundURL).to.equal('https://www.bionomicfuel.com/top-ways-we-can-contribute-to-a-greener-planet/');
          });
      });
  });
});

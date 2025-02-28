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
require('@cypress/xpath');
describe('Mojeek Navigation and Search', () => {
  it('Should navigate to the homepage', () => {
        cy.visit("https://www.mojeek.com/")

        cy.get("ul[class='pre-nav']>li:nth-child(2)>a").should('be.visible').click();

        cy.url().should('eq','https://www.mojeek.com/images')

        cy.get("ul[class='pre-nav']>li:nth-child(3)>a").should('be.visible').click()
        cy.url().should('eq','https://www.mojeek.com/news')

        cy.get("form[name='sf1']>input[name='q']").should('be.visible').type('How can we contribute to a greener planet?')
        cy.get(".serp-grid left-aligned").within(() => {
          cy.get("a").each(page => {
          let URL  = page.prop('href')
                if(URL==='https://earth.org/6-ways-to-go-greener-in-food-production/')
                {
                    expect(URL).to.be.equal('https://earth.org/6-ways-to-go-greener-in-food-production/')
                }
            })
          });
  });

 
});

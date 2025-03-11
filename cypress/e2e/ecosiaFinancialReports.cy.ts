// Scenario 2:
// Visit the Ecosia blogs webpage and navigate to the "Countries" section. Retrieve the amounts listed next to each country,
// calculate their total sum, and compare it with the "Paid out to projects" value displayed on the website.

// Validation Steps:
// 1. Open the website: https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/).
// 2. Locate the "Countries" section.
// 3. Extract the amounts associated with each country.
// 4. Compute the total sum of these amounts.
// 5. Compare the computed total with the "Paid out to projects" value displayed on the website.

describe('Ecosia Financial Reports Validation', () => {
  it('should validate country donation amounts match the total paid out to projects', () => {
    // Visit the Ecosia financial reports page
    cy.visit('https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/');

    cy.get('.v-country__header', { timeout: 15000 }).should('be.visible');

    let countryAmounts = [];

    cy.get('.v-country__header')
      .each(($el) => {
        const text = $el.text();
        const amountMatch = text.match(/€([0-9,]+)/);

        if (amountMatch && amountMatch[1]) {
          const amountStr = amountMatch[1].replace(/,/g, '');
          const countryAmount = parseFloat(amountStr);

          if (!isNaN(countryAmount)) {
            countryAmounts.push(countryAmount);
            cy.log(`Found country amount: €${countryAmount}`);
          }
        }
      })
      .then(() => {
        const totalAmount = countryAmounts.reduce((sum, amount) => sum + amount, 0);
        cy.log(`Total Computed Amount: €${totalAmount}`);
        cy.get(':nth-child(3) > b > span')
          .invoke('text')
          .then((totalText) => {
            const displayedTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));
            cy.log(`Displayed Total Amount: €${displayedTotal}`);
            expect(totalAmount).to.equal(displayedTotal);
          });
      });
  });
});

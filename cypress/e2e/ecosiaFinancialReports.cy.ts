// Scenario 2:
// Visit the Ecosia blogs webpage and navigate to the "Countries" section. Retrieve the amounts listed next to each country,
// calculate their total sum, and compare it with the "Paid out to projects" value displayed on the website.

// Validation Steps:
// 1. Open the website: https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/).
// 2. Locate the "Countries" section.
// 3. Extract the amounts associated with each country.
// 4. Compute the total sum of these amounts.
// 5. Compare the computed total with the "Paid out to projects" value displayed on the website.

describe('suite', () => {
    it('testcase', () => {

        cy.visit("https://blog.ecosia.org/ecosia-financial-reports-tree-planting-receipts/")
        cy.get('.v-country__header__amount',{timeout:5000}).should('be.visible');

        cy.get('.v-country__header__amount',{timeout:5000}).each(($price)=>
        {
              let amount= $price.text()

               console.log(amount)

              let Str= amount.replace(/[^0-9]/g, "");
              let number= parseInt(Str);
              
             var sumofEachcountry=sumofEachcountry+number;
            
        })
        cy.contains('Paid out to projects').should('be.visible');
        cy.contains('Paid out to projects').invoke('text').then((amount)=>
        {
              let  projectamount=  amount.text()
              let PAmount= projectamount.replace(/[^0-9]/g, "");

              var Projectpaidamount= parseInt(PAmount);              
        })

        expect(sumofEachcountry).to.be.equal(Projectpaidamount)  
    });
});

describe('Dashboard tests', ()=>{

    //cy.get('',()=>{

    // })
    

    // it('should be able to click on "my waitlist"', ()=>{
    //     cy.visit('http://junkyard.devmtn-projects.com/#/dashboard')
    //     cy.get('button').contains('MY WAITLIST')
    //     .click()

    // })

    it('should be able to log in', ()=>{
        cy.visit('http://junkyard.devmtn-projects.com/#/')
        cy.get('button')
        .click()
        cy.get('div').contains('Log in with Google')
        .click()
    })

      it('should be able to click on "my waitlist"', ()=>{
        cy.visit('http://junkyard.devmtn-projects.com/#/dashboard')
        cy.get('p').contains('MY WAITLIST')
        .click()

    })

    // it('should be able to click on "search"', ()=>{
    //     cy.visit('http://localhost:3000/#/dashboard')
    //     cy.get('a').contains('Search')
    //     .click()

    // })


})
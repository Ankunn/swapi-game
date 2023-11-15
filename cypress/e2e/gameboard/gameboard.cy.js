describe('Gameboard Form', () => {
  beforeEach(() => {
    cy.visit('/gameboard');
  });

  it('selects a resource and attribute, then starts the game', () => {
    cy.get('[data-cy=resource-select]').should('not.be.disabled').click();
    cy.get('[data-cy=resource-option]').contains('People').click();
    cy.get('[data-cy=attribute-select]').should('not.be.disabled').click();
    cy.get('[data-cy=attribute-option]').contains('Mass').click();
    cy.get('[data-cy=submit]').should('not.be.disabled').click();

    cy.wait(700);

    // cy.intercept('GET', 'https://www.swapi.tech/api/people/').as('gameStart');
    // cy.wait('@gameStart');
    // cy.get('[data-cy="player-info"]', { timeout: 10000 }).should('be.visible');
  });

  it('resets the score', () => {
    cy.get('[data-cy=reset]').click();
    cy.get('.mat-badge-content').should('contain', '0');
  });

  it('does not allow starting the battle without selecting both resource and attribute', () => {
    cy.get('[data-cy=submit]').should('be.disabled');
    cy.get('[data-cy=resource-select]').should('not.be.disabled').click();
    cy.get('mat-option').contains('People').click();
    cy.get('[data-cy=submit]').should('be.disabled');
  });

  // it('displays an error when trying to submit the form without a required field', () => {
  //   cy.get('[data-cy=submit]').click();
  //   cy.contains('Resource is required.').should('be.visible');
  //   cy.contains('Attribute is required.').should('be.visible');
  // });

  // it('ensures dynamic loading state controls button availability', () => {
  //   cy.intercept('GET', '/api/resource', req => {
  //     req.on('response', res => {
  //       res.setDelay(500);
  //     });
  //   });

  //   cy.get('[data-cy=submit]').should('be.disabled');
  //   cy.get('[data-cy=reset]').should('be.disabled');

  //   cy.wait(500);
  //   cy.get('[data-cy=submit]').should('not.be.disabled');
  //   cy.get('[data-cy=reset]').should('not.be.disabled');
  // });

  // it('verifies error message visibility on invalid form submission', () => {
  //   cy.get('[data-cy=submit]').click();

  //   cy.get('form').within(() => {
  //     cy.get('mat-error').should('have.length', 2);
  //   });
  // });

  it('clears the form when the reset button is clicked', () => {
    cy.get('[data-cy=resource-select]').click();
    cy.get('[data-cy=resource-option]').contains('People').click();
    cy.get('[data-cy=attribute-select]').click();
    cy.get('[data-cy=attribute-option]').contains('Mass').click();
    cy.get('[data-cy=resource-select]').find('.mat-mdc-select-value-text').should('contain', 'People');
    cy.get('[data-cy=attribute-select]').find('.mat-mdc-select-value-text').should('contain', 'Mass');
    cy.get('[data-cy=reset]').click();
    cy.get('[data-cy=resource-select]').find('.mat-mdc-select-value-text').should('not.exist');
    cy.get('[data-cy=attribute-select]').find('.mat-mdc-select-value-text').should('not.exist');
  });


  it('loads with the correct initial state', () => {
    cy.get('[data-cy=resource-select]').should('be.visible').and('be.enabled');
    cy.get('[data-cy=attribute-select]').should('be.visible').and('be.enabled');
    cy.get('[data-cy=submit]').should('be.visible').and('be.disabled');
    cy.get('[data-cy=reset]').should('be.visible').and('be.enabled');
  });

  it('allows selecting options and submitting a valid form', () => {
    // Selecting a resource
    cy.get('[data-cy=resource-select]').click();
    cy.get('[data-cy=resource-option]').contains('People').click();

    // Selecting an attribute
    cy.get('[data-cy=attribute-select]').click();
    cy.get('[data-cy=attribute-option]').contains('Mass').click();

    // Assert submit button is enabled after form is valid
    cy.get('[data-cy=submit]').should('not.be.disabled');
  });

  it('does not allow submission when the form is invalid', () => {
    // Attempt to submit the form without filling it out to ensure it's invalid
    cy.get('[data-cy=submit]').should('be.disabled');

    // Only select a resource but not an attribute to keep the form invalid
    cy.get('[data-cy=resource-select]').click();
    cy.get('[data-cy=resource-option]').contains('Your Resource Option').click();
    // Form should still be invalid since attribute is not selected
    cy.get('[data-cy=submit]').should('be.disabled');

    // Now select an attribute without a resource selected to maintain an invalid state
    cy.get('[data-cy=attribute-select]').click();
    cy.get('[data-cy=attribute-option]').contains('Your Attribute Option').click();
    // Form should still be invalid since now resource is unselected
    cy.get('[data-cy=submit]').should('be.disabled');

    // Fill in both selections but then clear one to simulate user changing their mind
    cy.get('[data-cy=resource-select]').click();
    cy.get('[data-cy=resource-option]').contains('Your Resource Option').click();
    cy.get('[data-cy=attribute-select]').click();
    cy.get('[data-cy=attribute-option]').contains('Your Attribute Option').click();

    // Simulate user clearing a selection, if your UI supports such an action
    // Replace 'Clear Option' with the actual option or method to deselect/clear the option
    cy.get('[data-cy=resource-select]').click();
    cy.get('[data-cy=resource-option]').contains('Clear Option').click(); // or perform a 'clear' action if available

    // Check if the submit button is disabled after clearing a selection
    cy.get('[data-cy=submit]').should('be.disabled');
  });
});

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
});

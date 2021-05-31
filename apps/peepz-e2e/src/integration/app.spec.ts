describe('peepz', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('should have a menu button', () => {
      cy.get('.mat-toolbar > :nth-child(1) > .mat-button-wrapper > .mat-icon')
        .should('be.visible')
        .contains('menu');
    });
    it('should have a lock open button', () => {
      cy.get(':nth-child(4) > .mat-button-wrapper > .mat-icon')
        .should('be.visible')
        .contains('lock_open');
    });
    describe('menu', () => {
      it('should not show menu by default', () => {
        cy.get('.mat-drawer-inner-container').should('be.hidden');
      });
      it('should open the menu on menu button press', () => {
        cy.get(
          '.mat-toolbar > :nth-child(1) > .mat-button-wrapper > .mat-icon'
        ).click();
        cy.get('.mat-drawer-inner-container').should('be.visible');
      });
      describe('opened', () => {
        beforeEach(() => {
          cy.get(
            '.mat-toolbar > :nth-child(1) > .mat-button-wrapper > .mat-icon'
          ).click();
        });
        describe('Peepz', () => {
          it('should be visible', () => {
            cy.get('#Peepz > .mat-list-item-content').should('be.visible');
          });
          it('should say Peepz', () => {
            cy.get(
              '#Peepz > .mat-list-item-content > .mat-list-text > .mat-line'
            ).contains('Peepz');
          });
          it('should have the Group Icon', () => {
            cy.get('#Peepz > .mat-list-item-content > .mat-icon').contains(
              'group'
            );
          });
        });
        describe('User', () => {
          it('should be visible', () => {
            cy.get('#User > .mat-list-item-content').should('be.visible');
          });
          it('should say User', () => {
            cy.get(
              '#User > .mat-list-item-content > .mat-list-text > .mat-line'
            ).contains('User');
          });
          it('should have the Account Circle Icon', () => {
            cy.get('#User > .mat-list-item-content > .mat-icon').contains(
              'account_circle'
            );
          });
        });
      });
    });
  });
  describe('not logged in', () => {
    it('peepz should redirect to login', () => {
      cy.visit('/peepz');
      cy.url().should('include', '/user/login');
    });
    it('user should redirect to login', () => {
      cy.visit('/user');
      cy.url().should('include', '/user/login');
    });
    it('anything should redirect to login', () => {
      const random = Math.random().toString(36).substring(2, 10);
      cy.visit(`/${random}`);
      cy.url().should('include', '/user/login');
    });
    it('login should go to login', () => {
      cy.visit('/user/login');
      cy.url().should('include', '/user/login');
    });
    it('register should go to register', () => {
      cy.visit('/user/register');
      cy.url().should('include', '/user/register');
    });
  });
  describe('logged in', () => {
    beforeEach(() => {
      cy.visit('/user/login');
      cy.get('#login-form-username > .mat-form-field-wrapper').type('testuser');
      cy.get('#login-form-password > .mat-form-field-wrapper').type(
        'testpassword'
      );
      cy.get('#login-button-login').click();
    });

    it('should redirect to user', () => {
      cy.url().should('include', '/user');
    });
  });
});

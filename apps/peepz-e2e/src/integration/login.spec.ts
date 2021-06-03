describe('login', () => {
  beforeEach(() => {
    cy.visit('localhost/user/login');
  });
  it('should contain the Login Image', () => {
    cy.get('#login-greeting').should('be.visible');
  });
  describe('Username Field', () => {
    it('should be visible', () => {
      cy.get('#login-form-username > .mat-form-field-wrapper').should(
        'be.visible'
      );
    });
    it('should say Username', () => {
      cy.get('#login-form-username > .mat-form-field-wrapper').contains(
        'Username'
      );
    });
  });
  describe('Password Field', () => {
    it('should be visible', () => {
      cy.get('#login-form-password > .mat-form-field-wrapper').should(
        'be.visible'
      );
    });
    it('should say Password', () => {
      cy.get('#login-form-password > .mat-form-field-wrapper').contains(
        'Password'
      );
    });
    describe('Hide Button', () => {
      it('should be visible', () => {
        cy.get('#login-button-password-toggle').should('be.visible');
      });
      it('should have the visibility_off icon', () => {
        cy.get('#login-button-password-toggle').contains('visibility_off');
      });
      it('should have the visibility icon after being clicked', () => {
        cy.get('#login-button-password-toggle').click();
        cy.get('#login-button-password-toggle').contains('visibility');
      });
    });
  });
  describe('Login Button', () => {
    it('should be visible', () => {
      cy.get('#login-button-login').should('be.visible');
    });
    it('should not be enabled by default', () => {
      cy.get('#login-button-login').should('be.disabled');
    });
    it('should be enabled when username and password are filled', () => {
      const randomUser = Math.random().toString(36).substring(2, 10);
      const randomPassword = Math.random().toString(36).substring(2, 10);
      cy.get('#login-form-username > .mat-form-field-wrapper').type(randomUser);
      cy.get('#login-form-password > .mat-form-field-wrapper').type(
        randomPassword
      );
      cy.get('#login-button-login').should('not.be.disabled');
    });
    it('should say Login', () => {
      cy.get('#login-button-login').contains('Login');
    });
  });
  describe('Register Button', () => {
    it('should be visible', () => {
      cy.get('#login-button-register').should('be.visible');
    });
    it('should say Register', () => {
      cy.get('#login-button-register').contains('Register');
    });
    it('should direct to Register', () => {
      cy.get('#login-button-register').click();
      cy.url().should('contain', '/user/register');
    });
  });
  describe('Login Procedure', () => {
    it('should fail with random credentials', () => {
      const randomUser = Math.random().toString(36).substring(2, 10);
      const randomPassword = Math.random().toString(36).substring(2, 10);
      cy.get('#login-form-username > .mat-form-field-wrapper').type(randomUser);
      cy.get('#login-form-password > .mat-form-field-wrapper').type(
        randomPassword
      );
      cy.get('#login-button-login').click();
      cy.url().should('contain', '/user/login');
      cy.get('.mat-snack-bar-container').should('be.visible');
      cy.get('.mat-snack-bar-container').should('contain', 'Error');
      cy.get('.mat-snack-bar-container').should('contain', 'Unauthorized');
    });
    it('should succeed with correct credentials', () => {
      cy.get('#login-form-username > .mat-form-field-wrapper').type('testuser');
      cy.get('#login-form-password > .mat-form-field-wrapper').type(
        'testpassword'
      );
      cy.get('#login-button-login').click();
      cy.url().should('contain', '/user');
      cy.get('.mat-snack-bar-container').should('not.exist');
    });
    it('should forward you to /peepz after successful Login, when coming from /peepz', () => {
      cy.visit('localhost/peepz');
      cy.url().should('contain', '/user/login');
      cy.get('#login-form-username > .mat-form-field-wrapper').type('testuser');
      cy.get('#login-form-password > .mat-form-field-wrapper').type(
        'testpassword'
      );
      cy.get('#login-button-login').click();
      cy.url().should('contain', '/peepz');
    });
  });
});

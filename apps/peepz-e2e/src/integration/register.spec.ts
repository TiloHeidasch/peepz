describe('register', () => {
  beforeEach(() => {
    cy.visit('/user/register');
  });
  it('should contain the Welcome Image', () => {
    cy.get('#register-greeting').should('be.visible');
  });
  describe('Username Field', () => {
    it('should be visible', () => {
      cy.get('#register-form-username > .mat-form-field-wrapper').should(
        'be.visible'
      );
    });
    it('should say Username', () => {
      cy.get('#register-form-username > .mat-form-field-wrapper').contains(
        'Username'
      );
    });
  });
  describe('Password Field', () => {
    it('should be visible', () => {
      cy.get('#register-form-password > .mat-form-field-wrapper').should(
        'be.visible'
      );
    });
    it('should say Password', () => {
      cy.get('#register-form-password > .mat-form-field-wrapper').contains(
        'Password'
      );
    });
    describe('Hide Button', () => {
      it('should be visible', () => {
        cy.get('#register-button-password-toggle').should('be.visible');
      });
      it('should have the visibility_off icon', () => {
        cy.get('#register-button-password-toggle').contains('visibility_off');
      });
      it('should have the visibility icon after being clicked', () => {
        cy.get('#register-button-password-toggle').click();
        cy.get('#register-button-password-toggle').contains('visibility');
      });
    });
  });
  describe('Register Button', () => {
    it('should be visible', () => {
      cy.get('#register-button-register').should('be.visible');
    });
    it('should not be enabled by default', () => {
      cy.get('#register-button-register').should('be.disabled');
    });
    it('should say Register', () => {
      cy.get('#register-button-register').contains('Register');
    });
  });
  describe('Login Button', () => {
    it('should be visible', () => {
      cy.get('#register-button-login').should('be.visible');
    });
    it('should say Login', () => {
      cy.get('#register-button-login').contains('Login');
    });
    it('should direct to Login', () => {
      cy.get('#register-button-login').click();
      cy.url().should('contain', '/user/login');
    });
  });
  describe('Captcha Field', () => {
    it('should be visible', () => {
      cy.get('#register-form-captcha').should('be.visible');
    });
  });
  describe('Register Procedure', () => {
    it('should not allow without captcha and random credentials', () => {
      const randomUser = Math.random().toString(36).substring(2, 10);
      const randomPassword = Math.random().toString(36).substring(2, 10);
      cy.get('#register-form-username > .mat-form-field-wrapper').type(
        randomUser
      );
      cy.get('#register-form-password > .mat-form-field-wrapper').type(
        randomPassword
      );
      cy.get('#register-button-register').should('be.disabled');
    });
  });
});

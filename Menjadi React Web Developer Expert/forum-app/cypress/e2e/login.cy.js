describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign-in');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/sign-in');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="m@example.com"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="m@example.com"]').type('emailtest@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="m@example.com"]').type('emailtest@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="m@example.com"]').type('afifmemyself22@gmail');

    // mengisi password
    cy.get('input[placeholder="password"]').type('password');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.location('pathname').should('eq', '/');
  });
});

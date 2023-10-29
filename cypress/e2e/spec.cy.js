

const url=`http://localhost:3000`



describe('Routers with assigned endpoints should be reached correctly ', () => {
  it('/ route render correctly ',()=>{
    cy.visit(`${url}/`);
    cy.url().should('eq', 'http://localhost:3000/');
  })
 it('/add route render correctly ',()=>{
    cy.visit(`${url}/add`);
    cy.url().should('eq', 'http://localhost:3000/add');
  })
  it('/edit route render correctly ',()=>{
    cy.visit(`${url}/edit/0`);
    cy.url().should('eq', 'http://localhost:3000/edit/0');
  })
})

describe('Contact Book App', () => {

  // Initial content
  it('should display the initial content correctly', () => {
    cy.visit(`${url}/`);
    cy.contains('React Redux Contact Book');
    cy.contains('Add Contact');
    cy.contains('Coding Ninja');
  });

  // Routing
  it('should navigate to Add Contact page when "Add Contact" button is clicked', () => {
    cy.visit(`${url}/`);
    cy.contains('Add Contact').click();
    cy.url().should('include', '/add');
    cy.contains('Add Post');
  });

  it('should navigate to Edit Contact page when "Edit" button is clicked', () => {
    cy.visit(`${url}/`);
    cy.contains('Edit').click();
    cy.url().should('include', '/edit/');
    cy.contains('Update Contact');
  });

  // Add Contact
  it('should add a new contact', () => {
    cy.visit(`${url}/add`);
    cy.get('input[placeholder="Full name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@example.com');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[type="submit"]').click();
    cy.contains('Contact added successfully!!');
    cy.contains('John Doe');
  });

  it('should display warning when fields are empty', () => {
    cy.visit(`${url}/add`);
    cy.get('input[type="submit"]').click();
    cy.contains('Please fill in all fields!!');
  });

  // Edit Contact
  it('should edit an existing contact', () => {
    cy.visit(`${url}/edit/0`);
    cy.get('input[placeholder="Name"]').clear().type('Updated Ninja');
    cy.get('input[placeholder="Email"]').clear().type('updated@codingninjas.com');
    cy.get('input[placeholder="Phone"]').clear().type('9876543210');
    cy.contains('Update Contact').click();
    cy.contains('Contact updated successfully!!');
    cy.contains('Updated Ninja');
  });

  it('should cancel editing and navigate back', () => {
    cy.visit(`${url}/edit/0`);
    cy.contains('cancel').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  // Delete Contact
  it('should delete a contact', () => {
    cy.visit(`${url}/`);
    cy.contains('Delete').click();
    cy.contains('Coding Ninja').should('not.exist');
  });

  // Additional test cases for comprehensive coverage
  it('should not add contact with existing email', () => {
    cy.visit(`${url}/add`);
    cy.get('input[placeholder="Full name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('codingninjas@codingninjas.com');
    cy.get('input[placeholder="Phone"]').type('1234567890');
    cy.get('input[type="submit"]').click();
    cy.contains('This email already exists!!');
  });

  it('should not add contact with existing phone', () => {
    cy.visit(`${url}/add`);
    cy.get('input[placeholder="Full name"]').type('John Doe');
    cy.get('input[placeholder="Email"]').type('john.doe@example.com');
    cy.get('input[placeholder="Phone"]').type('98725161833');
    cy.get('input[type="submit"]').click();
    cy.contains('This phone number already exists!!');
  });

  it('should not edit contact with existing email', () => {
    cy.visit(`${url}/add`);
    cy.get('input[placeholder="Full name"]').type('John Dke');
    cy.get('input[placeholder="Email"]').type('john.dke@example.com');
    cy.get('input[placeholder="Phone"]').type('09583945732');
    cy.get('input[type="submit"]').click();
    cy.contains('john.dke@example.com').parent().contains(/edit/i).click();

    cy.get('input[placeholder="Email"]').clear().type('codingninjas@codingninjas.com');
    cy.contains('Update Contact').click();
    cy.contains('This email already exists!!');
  });

  it('should not edit contact with existing phone', () => {
    cy.visit(`${url}/add`);
    cy.get('input[placeholder="Full name"]').type('John Dhar');
    cy.get('input[placeholder="Email"]').type('john.dhar@example.com');
    cy.get('input[placeholder="Phone"]').type('0958394933');
    cy.get('input[type="submit"]').click();
    cy.contains('john.dhar@example.com').parent().contains(/edit/i).click();

    cy.get('input[placeholder="Phone"]').clear().type('98725161833');
    cy.contains('Update Contact').click();
    cy.contains('This phone number already exists!!');
  });



});


describe('Redux Store', () => {
  beforeEach(() => {
    cy.visit(`${url}/`);
  });

  it('should have Redux store initialized', () => {
    cy.window().its('store').should('exist');
  });
 it('should handle ADD_CONTACT action', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'ADD_CONTACT',
      payload: {
        id: 1,
        name: 'Test User',
        email: 'testuser@example.com',
        phone: '1234567890'
      }
    });
  });

  it('should handle DELETE_CONTACT action', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'DELETE_CONTACT',
      payload: 0
    });

  });

  it('should handle UPDATE_CONTACT action', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_CONTACT',
      payload: {
        id: 0,
        name: 'Updated Ninja',
        email: 'updatedninja@codingninjas.com',
        phone: '9876543210'
      }
    });
  });

  it('should handle RESET_CONTACT action', () => {
    cy.window().its('store').invoke('dispatch', {
      type: 'RESET_CONTACT'
    });

  });


  
 

});


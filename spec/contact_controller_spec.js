const ContactController = require( "../controllers/ContactController.js" );
const sequelize = require( "../db/models/index.js" ).sequelize;

describe( "ContactController", () => {

  beforeEach( ( done ) => {
    this.book = new ContactController();
    sequelize.sync( { force: true } )
      .then( ( res ) => { done(); } )
      .catch( ( err ) => { done(); } );
  } );

  it( "should be defined", () => {
    expect( ContactController ).toBeDefined();
  } );

  describe( "#addContact()", () => {

    it( "should add a single contact into the book", ( done ) => {
      this.book.addContact(
        "Alice",
        "001-101-1010",
        "alice@wonderland.com"
        )
        .then( ( contact ) => {
          expect( contact.name ).toBe( "Alice" );
          expect( contact.phone ).toBe( "001-101-1010" );
          expect( contact.email ).toBe( "alice@wonderland.com" );
          done();
        } )
        .catch( ( err ) => { done(); } );
    } );

  } );

  describe( "#getContacts()", () => {

    it( "should return an empty array when no contacts are available",
      ( done ) => {
        this.book.getContacts()
        .then( ( contacts ) => {
          expect( contacts.length ).toBe( 0 );
          done();
        } )
        .catch( ( err ) => {
          console.log( err );
          done();
        } );
      }
    );

    it( "should return an array of contacts when contacts are available",
      ( done ) => {
        this.book.addContact(
          "Alice",
          "001-101-1010",
          "alice@wonderland.com"
        )
        .then( () => {
          this.book.getContacts()
          .then( ( contacts ) => {
            expect( contacts.length ).toBe( 1 );
            done();
          } );
        } )
        .catch( ( err ) => {
          console.log( err );
          done();
        } );
      }
    );

  } );

} );

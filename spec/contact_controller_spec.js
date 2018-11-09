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


  /* ===== ContactController.[ search methods ] ===== */

  describe( "#[ search methods ]", () => {

    /* test values */
    const zelda = ["Zelda Smith", "000-100-111", "zelda@nintendo.com"];
    const snake = ["Solid Snake", "100-100-100", "snake@konami.com"];
    const magus = ["Magus Johnson", "101-010-101", "magus@squaresoft.com"];
    const alloy = ["Alloy Rodriguez", "111-111-111", "allow@guerrilla-games.com"];


    /* ===== ContactController.iterativeSearch() ===== */

    describe( "#iterativeSearch()", () => {

      it( "should return null when called with an empty array",
        () => {
          expect( this.book.iterativeSearch( [], alloy[ 0 ] ) ).toBeNull();
        }
      );

      it( "should return null when contact is not found",
        ( done ) => {
          this.book.addContact( ...zelda )
          .then( () => {
            this.book.getContacts()
            .then( ( contacts ) => {
              expect( this.book.iterativeSearch( contacts, alloy[ 0 ] )
              ).toBeNull();
              done();
            } )
            .catch( ( err ) => {
              console.log( err );
              done();
            } );
          } );
        }
      );

      it( "should return the contact if found",
        ( done ) => {
          this.book.addContact( ...alloy ).then( () => {
            this.book.addContact( ...magus ).then( () => {
              this.book.getContacts()
              .then( ( contacts ) => {
                let contact = this.book.iterativeSearch( contacts, magus[ 0 ] );
                expect( contact.name ).toBe( magus[ 0 ] );
                expect( contact.phone ).toBe( magus[ 1 ] );
                expect( contact.email ).toBe( magus[ 2 ] );
                done();
              } )
              .catch( ( err ) => {
                console.log( err );
                done();
              } );
            } );
          } );
        }
      );

    } );
    /* ----- ContactController.iterativeSearch() ----- */


    /* ===== ContactController.binarySearch() ===== */

    describe( "#binarySearch()", () => {

      /* helper function */
      function sort( contacts ) {
        return contacts.sort( ( a, b ) => {
          nameA = a.name.toLowerCase();
          nameB = b.name.toLowerCase();
          if ( nameA > nameB ) { return 1; }
          else if ( nameA < nameB ) { return -1; }
          else { return 0; }
        } );
      }

      it( "should return null when called with an empty array",
        () => {
          expect( this.book.binarySearch( [], alloy[ 0 ] ) ).toBeNull();
        }
      );

      it( "should return null when contact is not found",
        ( done ) => {
          this.book.addContact( ...zelda )
          .then( () => {
            this.book.getContacts()
            .then( ( contacts ) => {
              expect( this.book.binarySearch( sort( contacts ), alloy[ 0 ] )
              ).toBeNull();
              done();
            } )
            .catch( ( err ) => {
              console.log( err );
              done();
            } );
          } );
        }
      );

      it( "should return the contact if found",
        ( done ) => {
          this.book.addContact( ...alloy ).then( () => {
            this.book.addContact( ...magus ).then( () => {
              this.book.addContact( ...zelda ).then( () => {
                this.book.addContact( ...snake ).then( () => {
                  this.book.getContacts()
                  .then( ( contacts ) => {
                    let contact = this.book.binarySearch(
                      sort( contacts ), magus[ 0 ]
                    );
                    expect( contact.name ).toBe( magus[ 0 ] );
                    expect( contact.phone ).toBe( magus[ 1 ] );
                    expect( contact.email ).toBe( magus[ 2 ] );
                    done();
                  } )
                  .catch( ( err ) => {
                    console.log( err );
                    done();
                  } );
                } );
              } );
            } );
          } );
        }
      );

    } );
    /* ----- ContactController.binarySearch() ----- */


    /* ===== ContactController.search() using ORM ===== */

    describe( "#search() using ORM", () => {

      it( "should return null when a contact was not found",
        ( done ) => {
          this.book.addContact( ...zelda )
          .then( () => {
            this.book.search( snake[ 0 ] )
            .then( ( contact ) => {
              expect( contact ).toBeNull();
              done();
            } )
            .catch( ( err ) => {
              console.log( err );
              done();
            } );
          } );
        }
      );

      it( "should return the contact when found",
        ( done ) => {
          this.book.addContact( ...snake )
          .then( () => {
            this.book.search( snake[ 0 ] )
            .then( ( contact ) => {
              expect( contact ).not.toBeNull();
              expect( contact.name ).toBe( snake[ 0 ] );
              expect( contact.phone ).toBe( snake[ 1 ] );
              expect( contact.email ).toBe( snake[ 2 ] );
              done();
            } )
            .catch( ( err ) => {
              console.log( err );
              done();
            } );
          } );
        }
      );

    } );
    /* ----- ContactController.search() using ORM ----- */

  } );
  /* ----- ContactController.[ search methods ] ----- */

} );

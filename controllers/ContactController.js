const Contact = require( "../db/models" ).Contact;

class ContactController {
  constructor() {
    this.addContactQuestions = [
      {
        type: "input",
        name: "name",
        message: "Contact's name - ",
        validate( val ) {
          return ( val !== "" );
        }
      },
      {
        type: "input",
        name: "phone",
        message: "Contact's phone number - ",
        validate( val ) {
          return ( val !== "" );
        }
      },
      {
        type: "input",
        name: "email",
        message: "Contact's email address - ",
        validate( val ) {
          return ( val !== "" );
        }
      }
    ];
    this.contacts = [];
  }

  addContact( name, phone, email ) {
    return Contact.create( { name, phone, email } );
  }

  getContacts() {
    return Contact.findAll();
  }

  iterativeSearch( contacts, target ) {
    for ( let contact of contacts ) {
      if ( contact.name.toLowerCase() === target.toLowerCase() ) {
        return contact;
      }
    }
    return null;
  }

  binarySearch( contacts, target ) {
    let min = 0;
    let max = contacts.length - 1;
    let mid, contact, name;
    const targetName = target.toLowerCase();

    while ( min <= max ) {
      mid = Math.floor( ( min + max ) / 2 );
      contact = contacts[ mid ];
      name = contact.name.toLowerCase();
      if ( name > targetName ) { max = mid - 1; }
      else if ( name < targetName ) { min = mid + 1; }
      else { return contact; }
    }
    return null;
  }

}

module.exports = ContactController;

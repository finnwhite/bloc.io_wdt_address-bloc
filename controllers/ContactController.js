//const inquirer = require( "inquirer" );
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
}

module.exports = ContactController;

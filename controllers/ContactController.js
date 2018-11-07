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
      }
    ];
    this.contacts = [];
  }

  addContact( name, phone ) {
    return Contact.create( { name, phone } );
  }
}

module.exports = ContactController;

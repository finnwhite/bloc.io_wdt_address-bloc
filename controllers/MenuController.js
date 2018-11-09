const inquirer = require( "inquirer" );
const ContactController = require( "./ContactController.js" );

class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from the options below: ",
        choices: [
          "Add new contact",
          "View all contacts",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  clear() {
    console.log( "\x1Bc" );
  }

  main() {
    console.log( "Welcome to AddressBloc!" );

    inquirer.prompt( this.mainMenuQuestions )
      .then( ( response ) => {
        switch ( response.mainMenuChoice ) {
          case "Add new contact":
            this.addContact();
            break;
          case "View all contacts":
            this.getContacts();
            break;
          case "Exit":
            this.exit();
            break;
          default:
            console.log( "Invalid input" );
            this.main();
        }
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  }

  addContact() {
    this.clear();
    inquirer.prompt( this.book.addContactQuestions )
      .then( ( response ) => {
        this.book.addContact(
          response.name,
          response.phone,
          response.email
          )
          .then( ( contact ) => {
            console.log( `Contact [${ contact.name }] added successfully!\n` );
            this.main();
          } );
      } )
      .catch( ( err ) => {
        console.log( err );
        this.main();
      } );
  }

  getContacts() {
    this.clear();
    this.book.getContacts()
    .then( ( contacts ) => {
      for ( let contact of contacts ) {
        console.log(
          `  name: ${ contact.name }\n` +
          `  phone number: ${ contact.phone }\n` +
          `  email: ${ contact.email }\n` +
          `  ---------------\n`
        );
      }
      this.main();
    } )
    .catch( ( err ) => {
      console.log( err );
      this.main();
    } );
  }

  exit() {
    console.log( "Thank you for using AddressBloc!\n" );
    process.exit();
  }
}

module.exports = MenuController;

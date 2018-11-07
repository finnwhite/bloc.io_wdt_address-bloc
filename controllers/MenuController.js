const inquirer = require( "inquirer" );

class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from the options below: ",
        choices: [
          "Add new contact",
          "Exit"
        ]
      }
    ];
    this.contacts = [];
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
    console.log( "Contact added" );
    this.main();
  }

  exit() {
    console.log( "Thank you for using AddressBloc!" );
    process.exit();
  }

  getContactCount() {
    return this.contacts.length;
  }

  remindMe() {
    //return "Learning is a life-long pursuit";
    return "Remember: Learning is a life-long pursuit";
  }
}

module.exports = MenuController;

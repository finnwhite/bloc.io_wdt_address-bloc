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
          "Get current date and time",
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
          case "Get current date and time":
            this.getDate();
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

  getDate() {
    this.clear();
    const now = new Date();
    console.log( now.toLocaleString() );
    this.main();
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
}

module.exports = MenuController;

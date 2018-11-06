const inquirer = require( "inquirer" );

const questions = [
  {
    type: "list",
    name: "status",
    message: "Are you hungry?: ",
    choices: [ "Yes", "No" ]
  }
];

inquirer.prompt( questions )
  .then( ( answers ) => {
    if ( answers.status === "Yes" ) {
      console.log( "Then get up and eat!" );
    } else {
      console.log( "Then get back to work!" );
    }
  } )
  .catch( ( err ) => {
    console.log( err );
  } );

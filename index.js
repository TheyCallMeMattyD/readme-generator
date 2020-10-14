const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            message: "Enter your project title:",
            name: "Title"
        },
        {
            type: "input",
            message: "Enter a brief project description:",
            name: "Description"
        },
        {
            type: "input",
            message: "Enter the installation instructions:",
            name: "Installation"
        },
        // {
        //     type: "input",
        //     message: "Enter usage information:",
        //     name: "Usage"
        // },
        {
            type: "input",
            message: "Enter contribution guidelines:",
            name: "Contributing"
        },
        {
            type: "input",
            message: "Enter testing instructions:",
            name: "Tests"
        },
        {
            type: "list",
            message: "Choose a license for your application:",
            name: "License",
            choices: [
                "GPLv3",
                "MIT",
                "Apache2.0"
            ]
        },
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "GitHub"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "Email"
        }
    ]);
}

function generateReadMe(answers) {

    return `
[![GitHub issues](https://img.shields.io/github/issues/TheyCallMeMattyD/readme-generator?style=for-the-badge)](https://github.com/TheyCallMeMattyD/readme-generator/issues) &nbsp;
[![GitHub stars](https://img.shields.io/github/stars/TheyCallMeMattyD/readme-generator?style=for-the-badge)](https://github.com/TheyCallMeMattyD/readme-generator/stargazers) &nbsp;
![GitHub last commit](https://img.shields.io/github/last-commit/theycallmemattyd/readme-generator?style=for-the-badge)


# ${answers.Title}
## Description
>${answers.Description}
  
## Table of Contents
>1. [Title](#Title)
2. [Description](#Description)
3. [Installation](#Installation)
4. [Usage](#Usage)
5. [License](#License)
6. [Contributing](#Contributing)
7. [Tests](#Tests)
8. [Questions?](#Questions?)
  
## Installation
>${answers.Installation}
  
## Usage
>Simply answer each question as they appear and press 'Enter' to proceed to the next question.
![Usage Screenshot](img/generator1.png)
  
## License [![License: ${answers.License}](https://img.shields.io/badge/License-${answers.License}-blue.svg)](https://opensource.org/licenses/${answers.License})
>This application is covered under the [${answers.License} License](https://opensource.org/licenses/${answers.License})
  
## Contributing
>${answers.Contributing}

## Tests
>${answers.Tests}
  
## Questions?
>Please direct all questions to:
${answers.Email}<br/>
Check out my [GitHub Profile]<br/>(https://github.com/${answers.GitHub}) 
    `;
}

promptUser()
    .then(function(answers) {
        const readMe = generateReadMe(answers);

        return writeFileAsync("generated-README.md", readMe);
    })
    .then(function() {
        console.log("Successfully created generated-README.md");
    })
    .catch(function(err) {
        console.log(err)
    });
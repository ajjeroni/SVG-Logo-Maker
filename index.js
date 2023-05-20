const inquirer = require("inquirer");

inquirer
    .prompt ([
        {
            name: "text",
            type: "input",
            message: "Choose 3 characters for your text",
        },
        {
            name: "textColor",
            type: "input",
            message: "Choose color for text (color keyword or hex number)",
        },
        {
            name: "shape",
            type: "list",
            choice: ["Triangle", "Square", "Circle"],
            message: "Choose shape of logo",
        },
        {
            name: "shapeColor",
            type: "input",
            message: "Choose color for shape (color keyword or hex number)",
        }
    ])
   
   
    .then((answer) => {
        if (answer.text.length > 3) {
            console.log("Must enter 3 characters");
            promptUser();
        } else {
            writeToFile("logo.svg", answers);
        }
    });
const inquirer = require("inquirer");
const fs = require("fs");
const {Triangle, Square, Circle, Shape} = require("./lib/shapes");

function writeToFile(fileName, answers) {
    let svgString = "";
    svgString = '<svg version="1.1" width="300" height="200" xmlns="https://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${answers.shape}`;

    let shapeChoice; 
    if (answers.shape === "Triangle") {
        shapechoice = new Triangle();
        shapeChoice.setColor("black");
        svgString += shapeChoice.render();
    } else if (answers.shape === "Square") {
      // shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      // shapeChoice = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}
function promptUser() {
    inquirer
      .prompt([
        {
          type: "input",
          message:
            "Text For Logo (Enter three characters)",
          name: "text",
        },
        {
          type: "input",
          message:
            "Text Color (color keyword OR a hexadecimal number)",
          name: "textColor",
        },
        {
          type: "list",
          message: "Logo Shape",
          choices: ["Triangle", "Square", "Circle"],
          name: "shape",
        },
        {
          type: "input",
          message:
            "Shape Color (color keyword OR a hexadecimal number)",
          name: "shapeBackgroundColor",
        },
      ])
      .then((answers) => {
        if (answers.text.length > 3) {
          console.log("Must enter a value of no more than 3 characters");
          promptUser();
        } else {
          writeToFile("logo.svg", answers);
        }
      });
  }

    promptUser(); 
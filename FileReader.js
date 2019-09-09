var fs = require("fs");

module.exports = class FileReader {
  static init(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const contentToArray = fileContent.split("\n");
    const sizeX = contentToArray.shift();
    const sizeY = contentToArray.shift();

    return [sizeX, sizeY, contentToArray];
  }
};

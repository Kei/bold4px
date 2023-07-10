/**
 * Increase the font size of bold text within a Google Doc by a specified amount.
 */
function increaseBoldTextSize() {
  // Get the active Google Document and its body
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  // Get all paragraphs within the document
  var paragraphs = body.getParagraphs();

  // Prompt the user to enter the desired font size
  var newSize = parseInt(prompt("Enter the desired font size:"));

  // Validate the input to ensure it is a numeric value
  if (isNaN(newSize)) {
    Logger.log("Invalid font size. Please enter a numeric value.");
    return;
  }

  // Iterate through each paragraph
  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs[i];

    // Get the text content of the paragraph
    var text = paragraph.getText();

    // Iterate through each child element within the paragraph
    for (var j = 0; j < paragraph.getNumChildren(); j++) {
      var element = paragraph.getChild(j);

      // Check if the child element is a text element
      if (element.getType() === DocumentApp.ElementType.TEXT) {
        var textItem = element.asText();

        // Iterate through the text attribute indices
        for (var k = 0; k < textItem.getTextAttributeIndices().length; k++) {
          var startIndex = textItem.getTextAttributeIndices()[k];
          var endIndex = k === textItem.getTextAttributeIndices().length - 1 ? text.length : textItem.getTextAttributeIndices()[k + 1];

          // Check if the text at the current index is bold
          if (textItem.isBold(startIndex)) {
            // Get the current font size and increase it by the specified amount
            var currentFontSize = textItem.getFontSize(startIndex);
            var newFontSize = currentFontSize + newSize;

            // Set the new font size for the bold text range
            textItem.setFontSize(startIndex, endIndex - 1, newFontSize);
          }
        }
      }
    }
  }
}

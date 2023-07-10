/**
 * Set the font size of bold text within a Google Doc to a specified value.
 */
function setBoldTextSize() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var paragraphs = body.getParagraphs();

  var ui = DocumentApp.getUi();
  var response = ui.prompt('Font Size Input', 'Enter the desired font size:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  var newSize = parseInt(response.getResponseText());

  if (isNaN(newSize)) {
    Logger.log('Invalid font size. Please enter a numeric value.');
    return;
  }

  // Iterate through each paragraph
  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs[i];
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
            // Set the new font size for the bold text range
            textItem.setFontSize(startIndex, endIndex - 1, newSize);
          }
        }
      }
    }
  }
}

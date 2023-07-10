function increaseBoldTextSize() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var paragraphs = body.getParagraphs();

  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs[i];
    var text = paragraph.getText();

    for (var j = 0; j < paragraph.getNumChildren(); j++) {
      var element = paragraph.getChild(j);

      if (element.getType() === DocumentApp.ElementType.TEXT) {
        var textItem = element.asText();

        for (var k = 0; k < textItem.getTextAttributeIndices().length; k++) {
          var startIndex = textItem.getTextAttributeIndices()[k];
          var endIndex = k === textItem.getTextAttributeIndices().length - 1 ? text.length : textItem.getTextAttributeIndices()[k + 1];

          if (textItem.isBold(startIndex)) {
            textItem.setFontSize(startIndex, endIndex - 1, textItem.getFontSize() + 4);
          }
        }
      }
    }
  }
}



export const download =(filename: string, textInput: string) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    'data:application/xml,<?xml version="1.0" encoding="UTF-8"?>' + encodeURIComponent(textInput)
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
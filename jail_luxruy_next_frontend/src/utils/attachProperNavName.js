export default function removeWhiteSpaceFromMiddle(text) {
    if (text === null || text === undefined || typeof text!== 'string') {
      return ""; // Or handle it differently, like throwing an error: throw new Error("Invalid input: text must be a string.");
    }
  
    const trimmedText = text.trim().toLocaleLowerCase();
  
    if (trimmedText === "") {
      return ""; // Handle the case where the input string contains only whitespace.
    }
  
    return trimmedText.replace(/\s+/g, "_");
  }
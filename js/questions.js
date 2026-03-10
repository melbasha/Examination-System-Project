
class Question {
  constructor(text, choices, correctIndex) {
    this.text = text;                 
    this.choices = choices;           
    this.correctIndex = correctIndex; 
  }
}

const questions = [
  new Question(
    "What does HTML stand for?",
    ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    0
  ),
  new Question(
    "Which CSS property is used to change the text color?",
    ["text-color", "font-color", "color", "text-style"],
    2
  ),
  new Question(
    "Which keyword declares a variable in JavaScript that cannot be reassigned?",
    ["var", "let", "const", "static"],
    2
  ),
  new Question(
    "What does DOM stand for?",
    ["Document Object Model", "Data Object Management", "Document Oriented Module", "Dynamic Object Model"],
    0
  ),
  new Question(
    "Which HTML tag is used to link an external CSS file?",
    ["<style>", "<script>", "<link>", "<css>"],
    2
  ),
];

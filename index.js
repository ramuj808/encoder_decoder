const encoderInput = document.getElementById("encoderInput");
const encodedText = document.getElementById("encodedText");
const encoderMessageOutput = document.getElementById("encodedMessageOutput");

const decoderInput = document.getElementById("decoderInput");
const decodedText = document.getElementById("decodedText");
const decoderMessageOutput = document.getElementById("encodedMessageOutput");

const secretCipher = (str, amount = 0) => {
  if (amount < 0) {
    return cipher(str, amount + 26);
  }
  let output = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char.match(/[a-z]/i)) {
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += char;
  }
};

const symbolsCipher = (str) => {
  const symbols = {
    i: "!",
    "!": "i",
    l: "1",
    1: "l",
    s: "$",
    $: "s",
    o: "0",
    0: "o",
    a: "@",
    "@": "a",
    e: "3",
    3: "e",
    b: "6",
    6: "b",
  };

  let output = "";
  for (let i = 0; i < str.length; i++) {
    let char = str.toLowerCase()[i];

    if (symbols[char]) {
      output += symbols[char];
    } else {
      output += char;
    }
  }
  return output;
};

const reverseCipher = (sentence) => {
  let words = String(sentence);
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].split("").reverse().join("");
  }
  return words.join(" ");
};

let randNum = 22;

const encodeMessage = (str) => {
  const firstEncode = secretCipher(str, randNum);
  const secondEncode = reverseCipher(firstEncode);
  const lastEncode = symbolsCipher(secondEncode);

  return lastEncode;
};

const decodedMessage = (str) => {
  const firstEncode = symbolsCipher(str);
  const secondEncode = reverseCipher(firstEncode);
  const lastEncode = secretCipher(secondEncode, -randNum);

  return lastEncode;
};

const userEncodeInput = (userInput) => {
  const str = userInput.toString().trim();
  let output = encodeMessage(str);
};

const userDecodeInput = (userInput) => {
  const str = userInput.toString().trim();
  let output = decodedMessage(str);
};

encoderInput.addEventListener("click", () => {
  decoderInput.value = "";
  encoderMessageOutput.textContent = "";
  decoderMessageOutput.textContent = "";
  decodedText.textContent = "Enter your message to decode.";
  decodedText.textContent = "";
  let inputText = encoderInput.value;
  userEncodeInput(inputText);
});

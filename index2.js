const encodeInput = document.getElementById("encoder");
encodeInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("encodeMessage").click();
  }
});

const decodeInput = document.getElementById("decoder");
decodeInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("decodeMessage").click();
  }
});

const resetForm = () => {
  location.reload();
};

function encode() {
  const message = document.getElementById("encodedInput").value;
  const output = document.getElementById("encoderOutputBox");
  const firstEncode = messageCipher(message, randNum);
  const secondEncode = reverseCipher(firstEncode);
  const lastEncode = symbolCipher(secondEncode);
  output.innerHTML = lastEncode;
  console.log(message);

  if (!message) {
    alert("Please enter a secret message!");
  }
}

function decode() {
  const message = document.getElementById("decodedInput").value;
  const output = document.getElementById("decoderOutputBox");
  const firstEncode = symbolCipher(message);
  const secondEncode = reverseCipher(firstEncode);
  const lastEncode = messageCipher(secondEncode, -randNum);

  output.innerText = lastEncode;

  console.log(message);

  if (!message) {
    alert("Please enter a message to decode!");
  }
}

const messageCipher = (str, amount = 0) => {
  if (amount < 0) {
    return messageCipher(str, amount + 26);
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
  return output;
};

let randNum = 36;

const symbolCipher = (str) => {
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
  let words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].split("").reverse().join("");
  }
  return words.join(" ");
};

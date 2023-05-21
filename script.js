const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGeneratorForm");
const includeUpperCaseElement = document.getElementById("includeUpperCase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");

const LOWER_CHAR_CODE = arrayFromHighToLow(97, 122);
const UPPER_CHAR_CODE = arrayFromHighToLow(65, 90);
const NUMBER_CHAR_CODE = arrayFromHighToLow(48, 57);
const SYMBOL_CHAR_CODE = arrayFromHighToLow(33, 47)
  .concat(arrayFromHighToLow(58, 64))
  .concat(arrayFromHighToLow(91, 96))
  .concat(arrayFromHighToLow(123, 126));

characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const includeUpperCase = includeUpperCaseElement.checked;
  const includeNumber = includeNumbersElement.checked;
  const includeSymbol = includeSymbolsElement.checked;
  const characterAmount = characterAmountNumber.value;
  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    includeNumber,
    includeSymbol
  );
  passwordDisplay.innerText = password;
});

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

function generatePassword(
  characterAmount,
  includeUpperCase,
  includeNumber,
  includeSymbol
) {
  let charCodes = LOWER_CHAR_CODE;
  if (includeUpperCase) charCodes = charCodes.concat(UPPER_CHAR_CODE);
  if (includeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODE);
  if (includeSymbol) charCodes = charCodes.concat(SYMBOL_CHAR_CODE);

  const passwordCharacters = [];

  for (let i = 0; i < characterAmount; i++) {
    const character = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }

  return passwordCharacters.join("");
}

function arrayFromHighToLow(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

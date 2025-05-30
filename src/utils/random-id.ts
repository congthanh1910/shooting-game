export function randomId(length = 6) {
  let characters = '';
  characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  characters += 'abcdefghijklmnopqrstuvwxyz';
  characters += '0123456789';

  let result = '';
  for (let i = 0; i < length; i += 1)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}

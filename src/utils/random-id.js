export default function randomId(prefix = '', length = 5) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let id = '';
  
  for (let i = 0; i < length; i++) { // eslint-disable-line no-plusplus
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  return `${prefix ? `${prefix}-` : ''}${Date.now()}-${id}`;
}

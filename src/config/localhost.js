const { NODE_ENV } = process.env;
const localhost = NODE_ENV === 'development' ?
  'http://localhost'
  :
  'https://adventurecompanion.app';

export default localhost;

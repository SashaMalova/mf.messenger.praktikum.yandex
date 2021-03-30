type PlainObject<T = any> = {
  [k in string]: T;
};

interface Data {
  first_name?: 'string',
  last_name?: 'string',
  login?: 'string',
  email?: 'string',
  newPassword?: 'string',
  phone?: 'string',
  password?: 'string',
  title?: 'string',
  display_name?: 'string',
  oldPassword?: 'string',
  second_name?: 'string',
}
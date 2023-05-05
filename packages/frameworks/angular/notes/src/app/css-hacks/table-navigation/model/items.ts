export class Item {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}


export const items: Item[] = [{
  id: 423,
  firstName: 'Bob',
  lastName: 'Smith',
  email: 'bobsmith@this.com'
}, {
  id: 22,
  firstName: 'John',
  lastName: 'Doe',
  email: 'jd@that.com'
}, {
  id: 516,
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jnd@other.com'
}, {
  id: 1,
  firstName: 'Johnathan',
  lastName: 'Somereallylongname',
  email: 'johnathan.somereallylongname@somereallylongemail.com'
}];

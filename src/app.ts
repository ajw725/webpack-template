import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

const p1 = new Product('Book', 12.99);
// console.log(p1.getInformation());

// what if this were untyped JSON returned from an API call?
const products = [
  { title: 'Carpet', price: 29.99 },
  { title: 'Book', price: 10.99 },
];

// we could do it manually, like...
const typedProducts = products.map((p) => new Product(p.title, p.price));
// typedProducts.forEach((p) => console.log(p.getInformation()));

// or we could use the class-transformer package (works for TS or vanilla JS)
const transformed = plainToClass(Product, products);
transformed.forEach((p) => console.log(p.getInformation()));

// validating with class-validator
const newProduct = new Product('', -5.99);
validate(newProduct).then((errors) => {
  if (errors.length > 0) {
    console.log('ERRORS DETECTED');
    console.log(errors);
  }
});
console.log(newProduct.getInformation());

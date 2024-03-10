const filterDuplicates = (products) => {
 const uniqueProducts = {};
 products.forEach(product => {
   if (!uniqueProducts[product.id]) {
     uniqueProducts[product.id] = product;
   }
 });
 return Object.values(uniqueProducts);
};

export { filterDuplicates };
const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '../src/data/menu.json');
let menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

// The mapping based on the Python script output
const imageMapping = {
  "belgian-chocolate-pastry.jpg": "Belgian Chocolate",
  "white-frosted-bento-cake.jpg": "Bento",
  "chocolate-cake-happy-birthday.jpg": "Chocolate",
  "chocolate-bento-cake.jpg": "Signature Belgian Chocolate",
  "basic-vanilla-cupcake.jpg": "Basic Vanilla", // cupcake
  "brownie-fudge-cheesecake-jar.jpg": "Brownie Fudge", // cheesecake
  "lotus-biscoff-pastry.jpg": "Lotus Biscoff Topped", // pastry
  "chocolate-baked-cheesecake-jar.jpg": "Chocolate", // baked cheesecake
  "red-velvet-cupcake.jpg": "Red Velvet", // cupcake
  "lotus-biscoff-cupcake.jpg": "Lotus Biscoff", // cupcake
  "box-of-8-assorted-brownies.jpg": "Assorted Box", // brownie
  "lotus-biscoff-tub.jpg": "Lotus Biscoff Tub",
  "blueberry-cupcake.jpg": "Strawberry/Blueberry", // cupcake
  "classic-pineapple-pastry.jpg": "Old School Pineapple", // pastry
  "blueberry-cheesecake-jar.jpg": "Blueberry", // cheesecake
  "chocolate-truffle-pastry.jpg": "Truffle", // pastry
  "nutella-hazelnut-pastry.jpg": "Nutella Hazelnut Topped", // pastry
  "classic-walnut-brownie.jpg": "Walnut Brownie",
  "lotus-biscoff-brownie.jpg": "Lotus Biscoff", // brownie
};

// We will iterate through menu and assign
for (let item of menu) {
  let matchedImg = null;
  
  if (item.category === 'pastries') {
    if (item.name === 'Belgian Chocolate') matchedImg = 'belgian-chocolate-pastry.jpg';
    if (item.name === 'Old School Pineapple') matchedImg = 'classic-pineapple-pastry.jpg';
    if (item.name === 'Lotus Biscoff Topped') matchedImg = 'lotus-biscoff-pastry.jpg';
    if (item.name === 'Nutella Hazelnut Topped') matchedImg = 'nutella-hazelnut-pastry.jpg';
  }
  
  if (item.category === 'cupcakes') {
    if (item.name === 'Basic Vanilla') matchedImg = 'basic-vanilla-cupcake.jpg';
    if (item.name === 'Strawberry/Blueberry') matchedImg = 'blueberry-cupcake.jpg';
    if (item.name === 'Lotus Biscoff') matchedImg = 'lotus-biscoff-cupcake.jpg';
    if (item.name === 'Red Velvet') matchedImg = 'red-velvet-cupcake.jpg';
  }
  
  if (item.category === 'cheesecakes-jar') {
    if (item.name === 'Brownie Fudge') matchedImg = 'brownie-fudge-cheesecake-jar.jpg';
    if (item.name === 'Blueberry') matchedImg = 'blueberry-cheesecake-jar.jpg';
  }
  
  if (item.category === 'cheesecakes-baked') {
    if (item.name === 'Chocolate') matchedImg = 'chocolate-baked-cheesecake-jar.jpg';
  }
  
  if (item.category === 'desserts') {
    if (item.name === 'Lotus Biscoff Tub') matchedImg = 'lotus-biscoff-tub.jpg';
  }
  
  if (item.category === 'brownies-box' || item.category === 'brownies') {
    if (item.name === 'Assorted Box') matchedImg = 'box-of-8-assorted-brownies.jpg';
    if (item.name === 'Walnut Brownie') matchedImg = 'classic-walnut-brownie.jpg';
    if (item.name === 'Lotus Biscoff') matchedImg = 'lotus-biscoff-brownie.jpg';
  }
  
  if (item.category === 'bento-cakes') {
    if (item.name === 'Signature Belgian Chocolate') matchedImg = 'chocolate-bento-cake.jpg';
    if (item.name === 'Classic Pineapple') matchedImg = 'white-frosted-bento-cake.jpg'; // best guess
  }

  if (matchedImg) {
    item.image = `/images/${matchedImg}`;
  }
}

fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
console.log('Linked images successfully.');

const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../patisserie22_full_menu.md');
const outPath = path.join(__dirname, '../src/data/menu.json');

const mdContent = fs.readFileSync(mdPath, 'utf-8');
const lines = mdContent.split('\n');

const menuItems = [];
let currentCategory = '';
let currentCatId = '';
let idCounter = 1;

const getCatId = (catName) => {
  const name = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (name.includes('cheesecake') && name.includes('jar')) return 'cheesecakes-jar';
  if (name.includes('cheesecake') && name.includes('baked')) return 'cheesecakes-baked';
  if (name.includes('cupcakes') && name.includes('eggless')) return 'cupcakes-box';
  if (name.includes('cupcakes')) return 'cupcakes';
  if (name.includes('bento')) return 'bento-cakes';
  if (name === 'brownies') return 'brownies-box';
  if (name === 'brownie') return 'brownies';
  if (name === 'drinks') return 'drinks';
  if (name === 'cakes') return 'cakes';
  if (name === 'fruit-cakes') return 'fruit-cakes';
  if (name === 'premium-cakes') return 'premium-cakes';
  if (name === 'pastries') return 'pastries';
  if (name === 'desserts') return 'desserts';
  if (name === 'muffins') return 'muffins';
  if (name === 'hampers') return 'hampers';
  if (name === 'kids-cakes') return 'kids-cakes';
  return name;
};

let parsingTable = false;
let tableType = 'single'; // single price vs variants

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('## ') || line.startsWith('# ')) {
    currentCategory = line.replace(/#+\s+/, '').trim();
    currentCatId = getCatId(currentCategory);
    parsingTable = false;
    continue;
  }
  
  if (line.startsWith('Item') && line.includes('Price')) {
    parsingTable = true;
    tableType = 'single';
    i++; // skip dashes
    continue;
  }
  
  if (line.startsWith('Item') && (line.includes('1/2 Kg') || line.includes('Box of 4'))) {
    parsingTable = true;
    if (line.includes('1/2 Kg')) tableType = 'cake-weights';
    if (line.includes('Box of 4')) tableType = 'box-sizes';
    i++; // skip dashes
    continue;
  }
  
  if (line === '' || line.startsWith('---') || line.startsWith('>')) {
    parsingTable = false;
    continue;
  }
  
  if (parsingTable && line) {
    if (currentCatId === 'hampers' || currentCatId === 'kids-cakes' || line.includes('To be filled')) {
      continue;
    }
    
    // Parse the row
    // It's mostly separated by multiple spaces or single space with ₹
    const parts = line.split(/ {2,}|\t/).filter(p => p.trim());
    if (parts.length === 0) continue;
    
    // If not separated by multiple spaces, try finding ₹
    let name = '';
    let prices = [];
    
    if (parts.length === 1 && line.includes('₹')) {
       const splitIdx = line.indexOf('₹');
       name = line.substring(0, splitIdx).trim();
       prices = [line.substring(splitIdx).trim()];
    } else {
       name = parts[0].trim();
       prices = parts.slice(1).map(p => p.trim());
    }
    
    if (!name || prices.length === 0) continue;
    
    const cleanPrice = (pStr) => {
      const p = parseInt(pStr.replace(/[^0-9]/g, ''), 10);
      return isNaN(p) ? 0 : p;
    };
    
    const idPrefix = currentCatId.substring(0, 3);
    const id = `${idPrefix}-${String(idCounter++).padStart(3, '0')}`;
    
    const item = {
      id,
      name,
      category: currentCatId,
      description: `Delicious ${name.toLowerCase()} freshly prepared.`,
      dietary: 'eggless',
      availability: 'in_stock',
      image: `/placeholders/${currentCatId}.svg`,
      featured: false
    };
    
    if (tableType === 'single') {
      item.price = cleanPrice(prices[0]);
    } else if (tableType === 'cake-weights') {
      item.price = cleanPrice(prices[0]); // Base price is 1/2 kg
      item.variants = [];
      if (prices[0] && prices[0] !== '---') {
         item.variants.push({ id: `${id}-v1`, name: '1/2 Kg', price: cleanPrice(prices[0]) });
      }
      if (prices[1] && prices[1] !== '---') {
         item.variants.push({ id: `${id}-v2`, name: '1 Kg', price: cleanPrice(prices[1]) });
      }
    } else if (tableType === 'box-sizes') {
      item.price = cleanPrice(prices[0]); // Base price is Box of 4
      item.variants = [];
      if (prices[0] && prices[0] !== '---') {
         item.variants.push({ id: `${id}-v1`, name: 'Box of 4', price: cleanPrice(prices[0]) });
      }
      if (prices[1] && prices[1] !== '---') {
         item.variants.push({ id: `${id}-v2`, name: 'Box of 6', price: cleanPrice(prices[1]) });
      }
    }
    
    menuItems.push(item);
  }
}

fs.writeFileSync(outPath, JSON.stringify(menuItems, null, 2));
console.log(`Successfully wrote ${menuItems.length} items to menu.json`);

// Google Sheets API configuration
const SPREADSHEET_IDs = '1pa867STSHr6_OWc8kNbXxQ_qtVdeKZRgHt58BC7ogXM';
const SHEET_NAMEs = 'Sheet1';
const API_KEYs = 'AIzaSyA3J4k-eK1isbWkdaxDTqEX9Gn12f0ZqM8'; // You'll need to replace this with your actual API key

// Function to fetch products from Google Sheets
async function fetchProducts() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_IDs}/values/${SHEET_NAMEs}!A2:D?key=${API_KEYs}`
        );
        const data = await response.json();
        return processProductData(data.values);
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Process the raw data from sheets into a usable format
function processProductData(rows) {
    if (!rows) return [];
    
    return rows.filter(row => row[0] && row[2]) // Filter out empty rows
              .map(row => ({
                  name: row[0],
                  imageUrl: row[1],
                  price: row[2],
                  shopeeLink: row[3] || null
              }));
}

// Function to render products in the collection section
function renderProducts(products) {
    const collectionContainer = document.querySelector('.collection-filter-item');
    if (!collectionContainer) return;

    collectionContainer.innerHTML = products.map(product => `
        <div class="new-collection-list-item">
            <div class="new-collection-list-item-image">
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>
            <div class="new-collection-list-item-info">
                <div class="new-collection-list-item-info-heading roboto-mono">
                    ${product.name}
                </div>
                <div class="new-collection-list-item-info-price roboto-mono roboto-mono-light">
                    Rp. ${product.price}
                </div>
            </div>
        </div>
    `).join('');
}

// Function to render best seller products
function renderBestSellers(products) {
    const bestSellerContainer = document.querySelector('.best-seller-grid');
    if (!bestSellerContainer) return;

    // Take first 4 products for best sellers section
    const bestSellers = products.slice(0, 4);
    
    bestSellerContainer.innerHTML = bestSellers.map(product => `
        <div class="new-collection-list-item">
            <div class="new-collection-list-item-image">
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>
            <div class="new-collection-list-item-info">
                <div class="new-collection-list-item-info-heading roboto-mono">
                    ${product.name}
                </div>
                <div class="new-collection-list-item-info-price roboto-mono roboto-mono-light">
                    Rp. ${product.price}
                </div>
            </div>
        </div>
    `).join('');
}

function handleProductClick() {
    
    console.log('rendered go');
  // if this element clicked new-collection-list-item
  const newCollectionList = document.querySelectorAll('.new-collection-list-item');
  newCollectionList.forEach(function(item) {
    item.addEventListener('click', function() {
      console.log('clicked');
      // get the name .new-collection-list-item-info-heading roboto-mono
      const name = item.querySelector('.new-collection-list-item-info-heading').textContent;
      // get the price .new-collection-list-item-info-price
      const price = item.querySelector('.new-collection-list-item-info-price').textContent;
    //  goto wa me link
    window.open('https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20' + name + '%20dengan%20harga%20' + price, '_blank');

    
    });
  });
}

// Initialize products when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products);
    renderBestSellers(products);
    handleProductClick();
}); 
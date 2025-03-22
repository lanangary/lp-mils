const SPREADSHEET_ID = '1pa867STSHr6_OWc8kNbXxQ_qtVdeKZRgHt58BC7ogXM';
const SHEET_NAME = 'Sheet1';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

async function appendPreloadLinksFromSheets() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:D?key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const products = data.values
            .filter(row => row[0] && row[2])
            .map(row => ({
                name: row[0],
                imageUrl: row[1],
                price: row[2],
                shopeeLink: row[3] || null
            }));

        const head = document.head;
        products.forEach(product => {
            if (product.imageUrl) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = product.imageUrl;
                link.as = 'image';
                link.type = 'image/jpeg'; // Adjust type based on your images (e.g., 'image/png', 'image/avif')
                head.appendChild(link);
                console.log(`Preload link appended for: ${product.imageUrl}`);
            }
        });

        // Optionally store products globally
        window.preloadedProducts = products;
    } catch (error) {
        console.error('Error appending preload links:', error);
    }
}

// Run immediately
appendPreloadLinksFromSheets();
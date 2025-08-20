// Demo podaci o proizvodima
const products = [
    { id: 1, name: "Laptop", price: 45000, category: "Elektronika" },
    { id: 2, name: "Miš", price: 1200, category: "Elektronika" },
    { id: 3, name: "Tastatura", price: 2500, category: "Elektronika" },
    { id: 4, name: "Monitor", price: 15000, category: "Elektronika" },
    { id: 5, name: "Knjiga", price: 800, category: "Obrazovanje" },
    { id: 6, name: "Tablet", price: 15000, category: "Elektronika" },
    { id: 7, name: "Ranac", price: 3000, category: "Obrazovanje" },
    { id: 8, name: "Kafa", price: 200, category: "Hrana" },
    { id: 9, name: "Burek", price: 300, category: "Hrana" },
    { id: 10, name: "Voda", price: 80, category: "Hrana" }
];

// 1. LAMBDA EXPRESSIONS (Arrow Functions)
const konzolaLog = (poruka) => {
    const konzolaDivProzor = document.getElementById('konzolaDivProzor');
    konzolaDivProzor.textContent += poruka + '\n';
    konzolaDivProzor.scrollTop = konzolaDivProzor.scrollHeight;
};

// 2. PURE FUNCTIONS
const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0);

const calculateAverage = (items) => items.length > 0 ? calculateTotal(items) / items.length : 0;

const formatPrice = (price) => `${price.toLocaleString()} din`;

// 3. SELF-INVOKING FUNCTION (IIFE)
const initializeApp = (() => {
    konzolaLog('Aplikacija pokrenuta - Self-invoking funkcijom');
})();

// 4. LAMBDA EXPRESSIONS WITH CONTROL STRUCTURES
const filterByPrice = (items, minPrice, maxPrice) => 
    items.filter(item => item.price >= minPrice && item.price <= maxPrice);

const sortProducts = (items, sortBy) => {
    return items.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') return a.price - b.price;
        return 0;
    });
};

// 4.1 ADVANCED LAMBDA EXPRESSIONS WITH CONTROL STRUCTURES
// Lambda sa ternarnim operatorom
const getPriceCategory = (price) => 
    price < 1000 ? 'Jeftino' : 
    price < 10000 ? 'Srednje' : 
    price < 50000 ? 'Skupo' : 'Luksuzno';

// Lambda sa switch strukturom
const getShippingCost = (region) => 
    (() => {
        switch (region.toLowerCase()) {
            case 'beograd':
                return 300;
            case 'novi sad':
                return 400;
            case 'nis':
                return 500;
            case 'kragujevac':
                return 450;
            default:
                return 600;
        }
    })();




// 5. RECURSION
// Rekurzivna funkcija za računanje ukupne vrednosti proizvoda
const calculateTotalRecursive = (items, index = 0) => {
    if (index >= items.length) return 0;
    return items[index].price + calculateTotalRecursive(items, index + 1);
};



// Rekurzivna funkcija za brojanje proizvoda po kategoriji
const countByCategoryRecursive = (items, category, index = 0) => {
    if (index >= items.length) return 0;
    
    const currentCount = items[index].category === category ? 1 : 0;
    return currentCount + countByCategoryRecursive(items, category, index + 1);
};

// 6. HIGHER-ORDER FUNCTIONS
// forEach
const displayProducts = (items) => {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    items.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-category">${product.category}</div>
        `;
        productsList.appendChild(productCard);
    });
};

// map
const getProductNames = (items) => items.map(item => item.name);

const getceneSaPDV = (items, taxRate = 0.18) => 
    items.map(item => ({ ...item, priceWithTax: item.price * (1 + taxRate) }));

// filter
const getExpensiveProducts = (items, threshold = 10000) => 
    items.filter(item => item.price > threshold);

const getCheapProducts = (items, threshold = 500) => 
    items.filter(item => item.price < threshold);

const getProductsByCategory = (items, category) => 
    items.filter(item => item.category === category);

// sort
const sortByName = (items) => sortProducts(items, 'name');
const sortByPrice = (items) => sortProducts(items, 'price');

// reduce
const getCategories = (items) => 
    items.reduce((categories, item) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
        return categories;
    }, []);

const getCategoryStats = (items) => 
    items.reduce((stats, item) => {
        if (!stats[item.category]) {
            stats[item.category] = { count: 0, total: 0 };
        }
        stats[item.category].count++;
        stats[item.category].total += item.price;
        return stats;
    }, {});

// 7. HIGHER-ORDER FUNCTION (custom)
const withLogging = (fn, operationName) => {
    return (...args) => {
        konzolaLog(`Izvršavam: ${operationName}`);
        const result = fn(...args);
        konzolaLog(`Rezultat: ${JSON.stringify(result, null, 2)}`);
        return result;
    };
};

// Aplikacija funkcionalnog programiranja
const updateStats = () => {
    const totalProducts = products.length;
    const totalValue = calculateTotal(products);
    const averagePrice = calculateAverage(products);
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalValue').textContent = formatPrice(totalValue);
    document.getElementById('averagePrice').textContent = formatPrice(averagePrice);
};

// Event listeners sa funkcionalnim pristupom
const addEventListeners = () => {
    const buttonHandlers = {
        'prikažiSve': () => {
            konzolaLog('Prikazujem sve proizvode');
            displayProducts(products);
        },
        'prikažiSkupo': () => {
            const expensive = getExpensiveProducts(products);
            konzolaLog(`Proizvodi preko 1000 din: ${expensive.length}`);
            displayProducts(expensive);
        },
        'prikažiJeftino': () => {
            const cheap = getCheapProducts(products);
            konzolaLog(`Proizvodi ispod 500 din: ${cheap.length}`);
            displayProducts(cheap);
        },
        'sortByName': () => {
            const sorted = sortByName([...products]);
            konzolaLog('Sortirano po nazivu');
            displayProducts(sorted);
        },
        'sortByPrice': () => {
            const sorted = sortByPrice([...products]);
            konzolaLog('Sortirano po ceni');
            displayProducts(sorted);
        },
        'calculateTotal': () => {
            const total = calculateTotal(products);
            konzolaLog(`Ukupna vrednost: ${formatPrice(total)}`);
        },
        'showCategories': () => {
            const categories = getCategories(products);
            const stats = getCategoryStats(products);
            konzolaLog('Kategorije proizvoda:');
            categories.forEach(cat => {
                const catStats = stats[cat];
                konzolaLog(`  ${cat}: ${catStats.count} proizvoda, ${formatPrice(catStats.total)}`);
            });
        },
        'recursiveTotal': () => {
            
            // Rekurzivno računanje ukupne vrednosti
            const totalRecursive = calculateTotalRecursive(products);
            konzolaLog(`Rekurzivna suma svih proizvoda: ${formatPrice(totalRecursive)}`);
            

            
            // Rekurzivno brojanje po kategorijama
            const categories = getCategories(products);
            konzolaLog('Rekurzivno brojanje po kategorijama:');
            categories.forEach(cat => {
                const count = countByCategoryRecursive(products, cat);
                konzolaLog(`  ${cat}: ${count} proizvoda`);
            });
        },
        
        // Lambda izrazi sa kontrolnim strukturama
        'testPriceCategory': () => {
            konzolaLog('Kategorije cena');
            products.forEach(product => {
                const category = getPriceCategory(product.price);
                konzolaLog(`${product.name}: ${formatPrice(product.price)} → ${category}`);
            });
        },
        
        'testShipping': () => {
            konzolaLog('Troškovi dostave');
            const regions = ['Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica'];
            
            regions.forEach(region => {
                const shippingCost = getShippingCost(region);
                konzolaLog(`Dostava u ${region}: ${formatPrice(shippingCost)}`);
            });
        }
    };

    Object.entries(buttonHandlers).forEach(([id, handler]) => {
        document.getElementById(id).addEventListener('click', handler);
    });
};


// Demonstracija higher-order funkcija
const demonstracijaHighOrderFunkcije = () => {
    konzolaLog('Demonstracija higher-order funkcija:');
    
    const loggedCalculateTotal = withLogging(calculateTotal, 'Računanje ukupne vrednosti');
    const total = loggedCalculateTotal(products);
    
    const productNames = getProductNames(products);
    konzolaLog(`Nazivi proizvoda: ${productNames.join(', ')}`);
    
    const ceneSaPDV = getceneSaPDV(products);
    konzolaLog('Cene sa PDV-om:');
    ceneSaPDV.forEach(item => {
        konzolaLog(`  ${item.name}: ${formatPrice(item.price)} → ${formatPrice(item.priceWithTax)}`);
    });
};



// Inicijalizacija aplikacije
document.addEventListener('DOMContentLoaded', () => {
    addEventListeners();
    updateStats();
    displayProducts(products);
    demonstracijaHighOrderFunkcije();
    
    konzolaLog('Aplikacija uspešno učitana!');
});

// OPTIS Live Price Update
function updateMainPrice() {
    // Wait for OPTIS to calculate
    setTimeout(function() {
        // Get OPTIS total from cart or hidden element
        var optisTotal = 0;
        
        // Check all OPTIS options for prices
        document.querySelectorAll('[data-optis-price], .optis-addon-price, select option:checked, input[type="radio"]:checked').forEach(function(el) {
            var priceText = el.textContent || el.dataset.price || '';
            var price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            if (!isNaN(price)) optisTotal += price;
        });
        
        // If we found a total, update main price
        if (optisTotal > 0) {
            var mainPriceElements = document.querySelectorAll('.price__regular .price-item--regular, .product__price, [data-product-price]');
            mainPriceElements.forEach(function(el) {
                el.textContent = '$' + optisTotal.toFixed(2);
            });
        }
    }, 100);
}

// Listen for OPTIS changes
document.addEventListener('change', function(e) {
    if (e.target.matches('[name*="properties"], select, input[type="radio"], input[type="checkbox"]')) {
        updateMainPrice();
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', updateMainPrice);
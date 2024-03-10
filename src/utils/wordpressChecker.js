// src/utils/wordpressChecker.js

function isWordPressPage(htmlContent) {
    // Check for WordPress indicators
    const wordpressIndicators = [
        '<meta name="generator" content="WordPress',
        'wp-content',
        'wp-includes',
        // Add more indicators as needed
    ];

    // Check if any of the WordPress indicators are present in the HTML content
    return wordpressIndicators.some(indicator => htmlContent.includes(indicator));
}


module.exports = { isWordPressPage };

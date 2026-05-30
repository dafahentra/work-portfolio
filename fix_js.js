const fs = require('fs');
const file = '/Users/user/Documents/GitHub/Works-portfolio/src/assets/js/components/work-slider.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("const containerEl = document.querySelector('#recent-work').previousElementSibling.querySelector('.container');", "const containerEl = document.querySelector('#recent-work').previousElementSibling;");

fs.writeFileSync(file, content);

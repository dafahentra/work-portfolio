const fs = require('fs');
const file = '/Users/user/Documents/GitHub/Works-portfolio/src/assets/js/components/work-slider.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/const containerEl = document\.querySelector\('\.container'\);/g, "const containerEl = document.querySelector('#recent-work').previousElementSibling.querySelector('.container');");
content = content.replace(/const style = window\.getComputedStyle\(containerEl\);/g, "const subtitle = containerEl.querySelector('h2');\n        const style = window.getComputedStyle(subtitle);");
content = content.replace(/const paddingLeft = parseFloat\(style\.paddingLeft\);/g, "const paddingLeft = 0;");
content = content.replace(/const rect = containerEl\.getBoundingClientRect\(\);/g, "const rect = subtitle.getBoundingClientRect();");

fs.writeFileSync(file, content);

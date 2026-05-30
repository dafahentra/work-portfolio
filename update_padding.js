const fs = require('fs');
const file = '/Users/user/Documents/GitHub/Works-portfolio/src/assets/js/components/work-slider.js';
let content = fs.readFileSync(file, 'utf8');

// Insert padding logic in the constructor
const paddingLogic = `
      // Dynamic left padding to align with container
      const containerEl = document.querySelector('.container');
      if (containerEl) {
        const style = window.getComputedStyle(containerEl);
        const paddingLeft = parseFloat(style.paddingLeft);
        const rect = containerEl.getBoundingClientRect();
        this.list.style.paddingLeft = (rect.left + paddingLeft) + 'px';
      }
`;

content = content.replace('this._animate();', 'this._animate();\n' + paddingLogic);
fs.writeFileSync(file, content);

const fs = require('fs');
const file = '/Users/user/Documents/GitHub/Works-portfolio/src/assets/js/components/work-slider.js';
let content = fs.readFileSync(file, 'utf8');

const resizeLogic = `
      // Dynamic left padding to align with container
      const setPadding = () => {
        const containerEl = document.querySelector('#recent-work').previousElementSibling.querySelector('.container');
        if (containerEl) {
          const subtitle = containerEl.querySelector('h2');
          const rect = subtitle.getBoundingClientRect();
          this.list.style.paddingLeft = rect.left + 'px';
        }
      };
      setPadding();
      window.addEventListener('resize', setPadding);
`;

content = content.replace(/      \/\/ Dynamic left padding to align with container\n(?:.*?\n){8}/, resizeLogic);
fs.writeFileSync(file, content);

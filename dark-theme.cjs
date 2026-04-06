const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KevinAlejandroNaranj/OneDrive - XACTUS S.A.S/Info PC/Documentos/ALLIASOFT/8) ALLIASOFT PAGINA WEB/alliasoft/src/components';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // bg-white in specific elements (like cards) -> bg-slate-900/50 backdrop-blur-sm border border-slate-800
      // We will just do some generic replacements
      content = content.replace(/bg-white/g, 'bg-slate-900/40 backdrop-blur-md border border-slate-800');
      content = content.replace(/bg-gray-50/g, 'bg-slate-800/50');
      content = content.replace(/bg-gray-100/g, 'bg-slate-800/80');
      
      // text colors
      content = content.replace(/text-gray-900/g, 'text-gray-100');
      content = content.replace(/text-gray-800/g, 'text-gray-200');
      content = content.replace(/text-gray-700/g, 'text-gray-300');
      content = content.replace(/text-gray-600/g, 'text-gray-400');
      content = content.replace(/text-gray-500/g, 'text-gray-400');
      
      // Any specific overrides:
      // "bg-slate-900/40 backdrop-blur-md border border-slate-800/10" -> if already replaced inside gradient it might break
      // Since Hero and Portfolio already replaced or don't have bg-white, they only have the text-colors affected which is fine.
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDirectory(dir);
console.log('Done!');

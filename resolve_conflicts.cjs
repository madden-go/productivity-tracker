const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) results.push(file);
        }
    });
    return results;
}

const files = walk('/home/denisha/Desktop/productivity-tracker/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<<<<<<< HEAD')) {
        // Handle variations in newline or no newline at end of conflict marker
        content = content.replace(/<<<<<<< HEAD[\r\n]+([\s\S]*?)=======[\r\n]+[\s\S]*?>>>>>>> [a-fA-F0-9]+[\r\n]*/g, '$1');
        fs.writeFileSync(file, content);
        console.log(`Resolved: ${file}`);
    }
});

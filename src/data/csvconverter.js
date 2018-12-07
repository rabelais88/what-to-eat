// run with node
const fs = require('fs');

init();

function init() {
  fs.readFile('./database.csv', 'utf8', (err, data) => {
    const parsedData = readRow(data);
    fs.writeFile('./menu.json', JSON.stringify(parsedData), 'utf8', (err) => {
      if (!err) console.log('finished parsing!');
    })
  });
}

function readRow(data) {
  const rows = data.split(/([^\n\r]+)/g).filter(el => el !== '' && el !== '\n' && el !== '\r');
  return rows.map(row => {
    const cell = row.split(',');
    return {
      name: cell[0],
      price: Number(cell[1]),
      type: Number(cell[2])
    };
  })
}
const fs = require('fs');
const AquisitionManager = require('./aquisition-manager');

let storage = {
  upload: function(stream, filename) {
    let file = fs.createWriteStream(`/tmp/layers/${filename}.pdf`);
    stream.pipe(file);
    stream.on('finish', () => file.close());
  }
};

let manager = new AquisitionManager(storage, null);
let facilities = ['00109773', '00109775', '00109777'];

manager.scrape(facilities, (errors) => {
  if (errors.length) {
    console.log(errors);
  } else {
    console.log('finished without errors');
  }
});

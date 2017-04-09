const AWS = require('AWS');
const AquistionManager = require('./aquistion-manager');
const ImageProcessor = require('./image-processor');

'use strict';

const storage = {
  upload: function(stream, filename) {
    let s3 = new AWS.S3();
    let params = {Bucket: 'layers-documents', Key: filename, Body: stream};

    s3.upload(params, function(err, data) {
      console.log(err, data);
    });
  }
};

module.exports.aquire = (event, context, callback) => {
  const manager = new AquistionManager(storage, null);
  const facilities = event.body.facilities;

  manager.scrape(facilities, (err) => {
    let response;
    if (err) {
      response = {
        statusCode: 415,
        body: JSON.stringify({
          message: 'Shit broke, yo!',
          input: event,
        })
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Successfully imported DSUs from ${facilities.length} documents`,
          input: event,
        })
      };
    }

    callback(null, response);
  });
};

module.exports.process = (event, context, callback) => {
  const processor = new ImageProcessor();

  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// module.exports.turk = (event, context, callback) => {
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };

//   callback(null, response);

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };

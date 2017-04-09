'use strict';
const request = require('request');
const cheerio = require('cheerio');

class AquisitionManager {

  constructor(storage, db) {
    this.storage = storage;
    this.db = db;
  }

  scrape(facilities, cb) {
    let errors = [];
    let count = facilities.length

    facilities.forEach( (facility) => {
      this.isRelevant(facility)
      .then(() => this.getDocURL(facility))
      .then(url => this.getDoc(url))
      .then(stream => this.storeDoc(stream, facility))
      .catch(err => errors.push(err))
      // Use async.series for prod
      .then(() => {
        if (--count == 0) cb(errors);
      });
    });
  }

  isRelevant(facility) {
    let url = 'http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=' + facility + '&type=WELL';
    return new Promise((resolve, reject) => {
      request(url, function(error, response, html) {
        if(!error){
          if (referencesArea(html, 'GWA')) {
            // if 'Drill Unit: GWA' exists anywhere on the page
            resolve(facility);
          } else {
            reject('Not in the GWA');
          }
        }
      });
    });
  }

  getDocURL(facility) {
    let url = 'http://cogcc.state.co.us/weblink/results.aspx?id=' + facility;
    return new Promise((resolve, reject) => {
      request(url, function(error, response, html) {
        if(!error){
          // scrape for proposed download and return link
          let $ = cheerio.load(html)
          // will need to change the each to a find
          $('td').each((i, td) => {
            let doc_name = $(td).text().replace(/\s\s+/g, ' ')
            // may need to match up with other document titles
            if (doc_name === 'FORM 2 SUBMITTED') {
              $(td).parent('tr').children('td').each( (i, tag) => {
                let download_td = $(tag).text().replace(/\s\s+/g, '')
                if (download_td === 'Download') {
                  let download_link = tag.children[0].children[0].next.attribs.href
                  resolve(download_link)
                }
              });
            }
          });
        } else {
          reject(error)
        }
      })
    });
  }

  getDoc(path) {
    let url = 'http://cogcc.state.co.us/weblink/' + path;
    return new Promise((resolve, reject) => {
      console.log('url:', url);
      let stream = request.get(url);
      stream.on('response', (response) => {
        console.log(`Server responded with status code ${response.statusCode}`);
      });
      stream.on('error', (err) => console.log(err));
      resolve(stream);
    });
  }

  storeDoc(stream, filename) {
    return new Promise((resolve, reject) => {
      this.storage.upload(stream, filename);
      resolve();
    });
  }


}

function referencesArea(page, area) {
  return page.includes('Drill Unit: ' + area);
}

module.exports = AquisitionManager

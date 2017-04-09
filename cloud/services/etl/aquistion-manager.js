'use strict';

var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
// var mechanize = require('mechanize-js')

let facilities = ['00109773', '00109775', '00109777'];


facilities.forEach(saveDocIfExists);


function saveDocIfExists(facility) {
    let url = 'http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=' + facility + '&type=WELL';
    request(url, function(error, response, html) {
      if(!error){
        if (referencesArea(html, 'GWA')) {
          // if 'Drill Unit: GWA' exists anywhere on the page
          saveDoc(facility)
        }
      }

    });
}

function saveDoc(facility) {
  let url = 'http://cogcc.state.co.us/weblink/results.aspx?id=' + facility;
  request(url, function(error, response, html) {
    if(!error){
      // scrape for proposed download and do it
      let $ = cheerio.load(html)
      $('td').each((i, td) => {
        let doc_name = $(td).text().replace(/\s\s+/g, ' ')
        if (doc_name === 'FORM 2 SUBMITTED') {
          $(td).parent('tr').children('td').each( (i, tag) => {
            let download_td = $(tag).text().replace(/\s\s+/g, '')
            if (download_td === 'Download') {
              let download_link = tag.children[0].children[0].next.attribs.href
              downloadPDF(download_link)
            }
          });
        }
      });
    }
  });
}

function downloadPDF(path) {
  let url = 'http://cogcc.state.co.us/weblink/' + path;
  request
    .get(url)
    .on( 'response', function(response) {
      console.log(response)
    })
    .on('error', (err) => console.log(err));
}

function referencesArea(page, area) {
  return page.includes('Drill Unit: ' + area);
}

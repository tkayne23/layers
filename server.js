var express = require('express');
var fs      = require('fs');
var cheerio = require('cheerio');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  // url = 'http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=12312527&type=WELL';

  let urls = ['http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=00109773&type=WELL',
          'http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=00109775&type=WELL',
          'http://cogcc.state.co.us/cogis/FacilityDetail.asp?facid=00109777&type=WELL']
  urls.forEach( function(url) {
    // console.log(url)
      // nightmare
      // .goto(url)
      // .click('html > body > font:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > font:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(9) > a:nth-child(1)')
      // .click('a#WQResultGridView_ctl02_HyperLink1')
      // .end()
      // .then(function (result) {
      //   console.log(result)
      // })
      // .catch(function (error) {
      //   console.error('Error:', error);
      // });
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        // console.log(url)

        var title, release, rating;
        var json = { title : "", release : "", rating : ""};
        // console.log($('.td').children())
        // debugger;
        $('td').filter(function(){
          var data = $(this);
          // console.log(data)
          // title = data.children().first().text().trim();
          // release = data.children().last().children().last().text().trim();

          // json.title = title;
          // json.release = release;
        })
        //
        // $('.ratingValue').filter(function(){
        //   var data = $(this);
        //   rating = data.text().trim();
        //
        //   json.rating = rating;
        // })
      }
  });


    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    // })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

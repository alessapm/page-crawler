// http requests
let request = require('request');
// parses html elements
let cheerio = require('cheerio');

// end of url for pages to be crawled
let crawlArr1 = ['lot1.html', 'lot2.html', 'lot3.html', 'lot4.html', 'lot5.html'];

const step1 = () => {
  let artistArr = [];

  crawlArr1.forEach((urlEnding) => {
    let pageToCrawl = `https://alessapm.github.io/lot1/${urlEnding}`;

    request(pageToCrawl, (err, res, body) => {
      if(err) {
        console.log("Error: ", err);
      }
     //Check status code for 200 (OK)
     console.log("Status code: " + res.statusCode);

     if(res.statusCode === 200) {
       // Parse the document body using cheerio
       let $ = cheerio.load(body);
       artistArr.push($('h2').text())
       // console.log(artistSet.length, crawlArr1.length)
       if (artistArr.length === crawlArr1.length){
        console.log('arr: ', JSON.stringify(artistSet));
        return JSON.stringify(artistArr);
       }
     }
    })

  });
}

//         Step2 builds on step1 to add the work title.
const step2= () => {
  let artistsAndTitles = [];

  crawlArr1.forEach((urlEnding) => {
    let pageToCrawl = `https://alessapm.github.io/lot1/${urlEnding}`;

    request(pageToCrawl, (err, res, body) => {
      if(err) {
        console.log("Error: ", err);
      }
     if(res.statusCode === 200) {
       // Parse the document body using cheerio
       let $ = cheerio.load(body);
       let artist = $('h2').text();
       let title = $('h3').text();
       let obj = {
        artist: artist,
        works: title
       };
       artistsAndTitles.push(obj);
       if (artistsAndTitles.length === crawlArr1.length){
        console.log('arr: ', JSON.stringify(artistsAndTitles));
        return JSON.stringify(artistsAndTitles);
       }
     }

    })

  });
}


// step1();
step2();

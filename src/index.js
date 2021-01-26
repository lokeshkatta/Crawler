const cheerio = require('cheerio');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

//PORT variable initialization 
const PORT = process.env.PORT || 4001;
//seenUrl object for repeated url visiting detection
const seenUrl = {};
//shots array which stores top 100 shots data 
let shots =[];
//url links' array of shots to search for top likes,comments, views of shots
let links=[];
//object to compare top values 
let max={views:0,comments:0,likes:0};

//getLink function takes url as a input 
const getLink = async (url)=>{
    //if the url is present in sennUrl object then return
    if(seenUrl[url]) return;
    // if its not then sets the url as visited
    seenUrl[url]= true;
    console.log('crawling',url);
    // every unvisited urls is pushed into links array
    links.push(url);
    // fetching data from 'https://dirbbble.com/' or 'https://dribbble.com/shots/[0-9]+' and stored in response
    const response = await fetch(url);
    //  response from url is converted into text and stored in html vairable
    const html = await response.text();
    // html is loaded using cheerio in $
    const $ = cheerio.load(html);
    // looks for a 'shotData:' in html variable
    let x =await html.match(/.*shotData:.*\}/);
    // if 'shotData:' is found 
    if(x){
        // accessing the data from x[0] and removing extra whitespaces
        x=x[0].trim();
        // removing 'shotData:' from x which gives string JSON {}
        const htmls = x.slice(10);
        // converting string JSON into JSON object
        const json = JSON.parse(htmls);
        // if the json object's comments or views or likes is more the max object's comments or views or likes
        if(json.commentsCount>max.comments || json.likesCount>max.likes || json.viewsCount > max.views){

            if(json.commentsCount>max.comments){ // if json object's comments is greater than max object's comments
                //we update the max object's comments value
                max.comments=json.commentsCount;

            }else if(json.likesCount>max.likes){ // if json object's likes is greater than max object's likes
                //we update the max object's likes value
                max.likes=json.likesCount;
            }else if(json.viewsCount > max.views){ // if json object's likes is greater than max object's likes
                //we update the max object's views value
                max.views-=json.viewsCount;
            }
            // creating new object which contains shotId,title,url,likes,views,comments and pushing into shots array
            shots.push({shotId:json.shotId,title:json.title,url:url,likes:json.likesCount,views:json.viewsCount,comments:json.commentsCount});
        }
    }
     
    $("a").each((i,el)=>{ // searching for each url in a (anchor) tag
        //storing the value of href attribute of a tag in link variable
        const link = $(el).attr('href');
        // pushing into links array which is used to search for top likes,comments, views of shots
        links.push(link);
    });

    // Looping through every link in links array
    links.forEach((link)=> {
        // if the element in links array matches regex '/shots/[0-9]+' (dribbble link followed by '/shots/' and shotid)
        // storing in variable y
        let y =link.match(/\/shots\/[0-9]+/);
        // if y is not null
        if(y){
            // recursively calling getLink function until the website's all reachable url are visited
            getLink(`https://dribbble.com${y}`);
        }
    });
}

//Get request to 'http://localhost:4001/top100' url using express framework 
app.get('/top100',(req, res) => {
    getLink("https://dribbble.com/");
    setTimeout(function(){
        res.send(shots);
    },50000);
});

//HttpServer listening on PORT variable
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
// declare global array that contains the id's of each topicDiv
const topicDivs = ['home', 'politics', 'us', 'world', 'business', 'technology', 'health', 'science']

// function to return ajax call for topic of index of topicDiv array
const apiCall = (num) => {
  let thisTopic = topicDivs[num]
  $.ajax({
      url:`https://api.nytimes.com/svc/topstories/v2/${thisTopic}.json?api-key=CkbExbhSAZ9Ql86tboDAGVkQDibvR61G`
  }).then(
    (data) => {
      console.log(data);
      let $thisTopicDiv = $('.topicDiv').eq(num)
      let $thisArticleContainer = $thisTopicDiv.children('.articleContainer')
      for (var x = 0; x < 10; x++) {
        let $thisArticle = $thisArticleContainer.children('.article').eq(x)
        $thisArticle.children('.articleTitle').text(data.results[x].title)
        $thisArticle.children('.articleDescription').text(data.results[x].abstract)
        $thisArticle.children('.articleLink').attr('href', data.results[x].url)
        console.log(data.results[x].abstract);
      }
    },
    () => {
      console.log('error, ajax call failed');
    }
  )
}

// function to create articleContainer div and 15 article divs each with a h3 and h4 in each topicDiv
const makeTopicContentTags = () => {
  for (let i = 0; i < 8; i++) {
    let $thisTopicDiv = $('.topicDiv').eq(i)
    let $thisTopicContainer = $('<div>').addClass('articleContainer')
    $thisTopicDiv.append($thisTopicContainer)
    for(let j = 0; j < 10; j++) {
      let $newLink = $('<a>').addClass('articleLink').attr('target', '_blank').text('READ THE FULL ARTICLE HERE')
      let $newArticle = $('<div>').addClass('article').append($('<h3>').addClass('articleTitle'), $('<h4>').addClass('articleDescription'), $newLink)
      $thisTopicContainer.append($newArticle)
    }
    apiCall(i)
  }
}

//function to populate headlines to all topics inside h3 of at each articleContainer index
  // declare jquery variable that gets all topDivs
  // for loop

// function to populate abstracts to all topic h4




$(() => {

makeTopicContentTags()






});







//CkbExbhSAZ9Ql86tboDAGVkQDibvR61G
//NYT API KEY

// declare global array that contains the id's of each topicDiv
const topicDivs = ['home', 'politics', 'us', 'world', 'business', 'technology', 'health', 'science']

// function to return ajax call for topic of index of topicDiv array
//function to populate headlines to all topics inside h3 of at each articleContainer index
// function to populate abstracts to all topic h4
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
// function to create articleContainer div and 15 article divs each with a h3 h4 and a tag in each topicDiv
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
  $('.subjects').on('click', topicSelect)
  $('#nextButton').on('click', nextBtn)
  $('#lastButton').on('click', lastBtn)
  $('header').hover(showSatire, hideSatire)
  $('header').mousemove(moveSatire)
}


//function to use next nextButton
const nextBtn = () => {
  $('.active').removeClass('active')
  let $newCenter = $('.topicDiv').index($('.next'))
  $('.subjects').eq($newCenter).addClass('active')
  setDivClasses($newCenter)
}
//function to use last lastButton
const lastBtn = () => {
  $('.active').removeClass('active')
  let $newCenter = $('.topicDiv').index($('.last'))
  $('.subjects').eq($newCenter).addClass('active')
  setDivClasses($newCenter)
}
//function to change last center and next classes with topic change click in nav bar
const topicSelect = (event) => {
  let $clickedIndex = $('.subjects').index(event.currentTarget)
  console.log($clickedIndex);
  setDivClasses($clickedIndex)
}
//function to set center next and last classes
const setDivClasses = (newCenterIndex) => {
  $('.active').removeClass('active')
  $('.center').removeClass('center')
  $('.next').removeClass('next')
  $('.last').removeClass('last')
  $('.middleNext').removeClass('middleNext')
  $('.middleLast').removeClass('middleLast')
  $('.subjects').eq(newCenterIndex).addClass('active')
  let $newCenter = $('.carouselContainer').children('.topicDiv').eq(newCenterIndex)
  $newCenter.addClass('center')
  if (newCenterIndex > 0 && newCenterIndex < 7) {
    let $newNext = $('.carouselContainer').children('.topicDiv').eq(newCenterIndex + 1)
    console.log($newNext);
    let $newLast = $('.carouselContainer').children('.topicDiv').eq(newCenterIndex - 1)
    $newNext.addClass('next').addClass('middleNext')
    $newLast.addClass('last').addClass('middleLast')
  } else if (newCenterIndex === 0) {
    let $newNext = $('.carouselContainer').children('.topicDiv').eq(1)
    let $newLast = $('.carouselContainer').children('.topicDiv').eq(7)
    $newNext.addClass('next')
    $newLast.addClass('last')
  } else if (newCenterIndex === 7) {
    let $newNext = $('.carouselContainer').children('.topicDiv').eq(0)
    let $newLast = $('.carouselContainer').children('.topicDiv').eq(6)
    $newNext.addClass('next')
    $newLast.addClass('last')
  }
}
//function to change background color of center div in nav bar
 //function to make headerToolTip appear on hover on desktop and follow mouse cursor
 const moveSatire = (event) => {
   let $toolTip = $('#headerToolTip')
   console.log(event.pageX);
   $toolTip.css('left', event.pageX - 90 + 'px')
   $toolTip.css('top', event.pageY - 30 + 'px')
 }
 const showSatire = () => {
   $('#headerToolTip').css('display', 'block')
 }
 const hideSatire = () => {
   $('#headerToolTip').css('display', 'none')
 }

$(() => {


makeTopicContentTags()






});







//CkbExbhSAZ9Ql86tboDAGVkQDibvR61G
//NYT API KEY

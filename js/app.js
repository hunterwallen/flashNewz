//CkbExbhSAZ9Ql86tboDAGVkQDibvR61G
//NYT API KEY




$(() => {

$.ajax({
  url:'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=CkbExbhSAZ9Ql86tboDAGVkQDibvR61G'
}).then(
  (data) => {
    console.log(data.results[0].abstract);

  },
  () => {
    console.log('error');
  }
)






})

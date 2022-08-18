/**
    Sticky Left Menu Share 
*/

document.getElementById('stickyShareButton').addEventListener(
    'click',
    function (e) {
      event.preventDefault();
      let text = document.getElementById('stickyShareButton').getAttribute('href');
      let input = document.createElement('input');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
    },
    false
);
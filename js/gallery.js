/**
Declare some default variables which will be used throughout
**/

var images;
var imageWidth;

$(function(){
imageWidth = $('.gallery').data("thumb-width");

//COLLECT ALL THE IMAGES FROM WITHIN THE .gallery Class
images = $('.gallery').find('img');

/** FOR EACH IMAGES, CREATE A THUMBNAIL AND ADD A CLASS TO IDENTIFY THE IMAGE & THUMBNAIL
RELATIONSHIP TO EACH OTHER **/
$.each(images, function(index, value){
  $(value).addClass("img" + index);
  $('.gallery .thumbs').append("<a href='#' data-index='" + index +
   "' class='thumb'><img src='" +$(this).prop("src") + "' width='" + 
   imageWidth + "' height='120' border='0'/></a>");
});
/** UPDATE THE SCROLL BUTTONS **/
updateScrollButtons();

/*Adding the Events Handlers for scroll gallery's buttons*/
$('.arrow').click(function(){
  var element = $(this);
  if(!element.hasClass('disabled')){
    element.addClass('disabled');
    var scrollString = "-=";
    if($(this).data("direction") == "left"){
      scrollString = "+=";
    }
    $('.thumbs').animate({
      marginLeft: scrollString + imageWidth + "px"
    }, "fast", function(){
      element.removeClass('disabled');
      updateScrollButtons();
    });
  }
});

/*Adding Gallery's event handlers for images*/
$('.gallery').on("click", ".thumb", function(){
  var thumb = $(this);
  var image = $('.img' + thumb.data('index'));
  $.each(images, function(index, value){
    if(!$(value).hasClass('img' + thumb.data('index')))
    {
      $(value).hide();
    }
  });
  
  if(image.css("display") !="block"){
    image.fadeIn();
  }
});
});

//Perform the scrolling on thumbs and arrows when user navigates around
function updateScrollButtons(){
  var thumbs = $('.thumbs');
  var thumbsMarginLeft = parseInt(thumbs.css("margin-left"));
  var thumbsMaxWidth = (images.length * imageWidth);
  if(thumbsMarginLeft >= 0){
    $('.left-arrow').addClass('disabled');
  } else{
    $('.left-arrow').removeClass('disabled');
  }
  if((thumbsMarginLeft * -1) >= (thumbsMaxWidth - thumbs.width() / 2)){
    $('.right-arrow').addClass('disabled');
  } else{
    $('.right-arrow').removeClass('disabled');
  }
}
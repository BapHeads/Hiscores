$(function(){
 $(".compareForm").submit(function(ev){
  var user1Val = $('.compareForm [name="user1"]').val(), user2Val = $('.compareForm [name="user2"]').val();
  if(!user1Val || !user2Val){
   ev.preventDefault();
   alert("Please supply both names.");
  }
  else if(user1Val == user2Val){
   ev.preventDefault();
   alert("You cannnot compare a player with themselves.");
  }
 });

 // Scroll options inside vexillum
 var $container = $('#contentCategory'), step = $container.height() / 2, disabledClass = "personal-hiscores__scroll-arrow--disabled",
    $scrollUp = $("[data-js-scroll='up']"), $scrollDown = $("[data-js-scroll='down']");

 $("[data-js-scroll]").bind("click", function(ev) {
     ev.preventDefault();

        if ($(this).data("js-scroll") === "up" && $container.scrollTop() > 0) {
            $container.animate({
                scrollTop: "-=" + step + "px"
            });
            
        } else if ($(this).data("js-scroll") === "down" && $container.scrollTop() < ($container[0].scrollHeight - $container[0].offsetHeight)) {
            $container.animate({
                scrollTop: "+=" + step + "px"
            });
        }
    });
 
 function checkScrollPos() {
        $scrollUp.removeClass(disabledClass);
        $scrollDown.removeClass(disabledClass);

        if ($container.scrollTop() === 0) {
            $scrollUp.addClass(disabledClass);
        } else if ($container.scrollTop() === ($container[0].scrollHeight - $container[0].offsetHeight)) {
            $scrollDown.addClass(disabledClass);
        }
    }

    $container.on("scroll", function() {
        checkScrollPos();
    });

    checkScrollPos();
});

//////////////////////////////////////////////////////////////////
//////////THESE ARE OUR UTLILITIES
//These methods can be used multiple times in different contexts
//If you use a code snippet repeatedly add it here so it's available as a part of our code base
/////////////////////////////////////////////////////////////////
utilities = {};

//shortcut to check is selector returns results in jQuery
// jQuery.fn.extend({
//   exists: function() {
//     return !!this.length;
//   }
// });

//comparen numbers in array and return largest
utilities.findLargest = function(arr) {
  arr.sort(function(a, b) {
    return a - b;
  });
  var largest = arr[arr.length - 1];
  return largest;
}; //end

//wait x seconds before executing a function on resize or other recurrent event
//fun = function to execute
//wait = number of miliseconds
//immediate = true/false. If True execute function once before waiting x seconds
utilities.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// given a series of blocks make all blocks min-height equal to height of tallest block
utilities.equalBlocks = function($blocks) {
  equalHeight = function() {
    $blocks.addClass('equalBlock');
    $blocks.css('min-height', 0);
    var heights = [];
    $blocks.each(function() {
      heights.push($(this).outerHeight());
    });
    var result = utilities.findLargest(heights);
    $blocks.css('min-height', result + 'px');
  }; //end equalHeight

  try {
    equalHeight();
  } catch (e) {}

  $(window).resize(function() {
    try {
      utilities.debounce(equalHeight, 100, true)();
    } catch (e) {}
  });
}; //end equal blocks
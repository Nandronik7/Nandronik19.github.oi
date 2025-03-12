// Set the date we're counting down to
var target_date = new Date("May 17, 2025 08:00:00").getTime(); // Use the current year or your target date

var Clock = (function(){  
  var exports = function(element) {
    this._element = element;
    var html = '';
    for (var i = 0; i < 6; i++) {
      html += '<span>&nbsp;</span>';
    }
    this._element.innerHTML = html;
    this._slots = this._element.getElementsByTagName('span');
    this._tick();
  };
  
  exports.prototype = {
    _tick: function() {
      var time = new Date().getTime();
      var seconds_left = (target_date - time) / 1000;
      
      // Do some time calculations
      var days = parseInt(seconds_left / 86400);
      seconds_left = seconds_left % 86400;
      
      var hours = parseInt(seconds_left / 3600);
      seconds_left = seconds_left % 3600;
      
      var minutes = parseInt(seconds_left / 60);
      
      this._update(this._pad(days) + this._pad(hours) + this._pad(minutes));
      var self = this;
      setTimeout(function(){
        self._tick();
      }, 1000);
    },
    
    _pad: function(value) {
      return ('0' + value).slice(-2);
    },
    
    _update: function(timeString) {
      var i = 0, l = this._slots.length, value, slot;
      for (; i < l; i++) {
        value = timeString.charAt(i);
        slot = this._slots[i];
        slot.innerHTML = value;
      }
    }
  };
  
  return exports;
})();

// Initialize the clock
var clockElement = document.getElementById('clock');
var clock = new Clock(clockElement);
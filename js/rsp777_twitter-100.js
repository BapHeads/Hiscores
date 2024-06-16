JXTWEET = {
    user: 'OldSchoolRS',
    cacheExpiry: 30, // cache time set in minutes (1 minute)
    appendTo: '#twitter',
    numTweets: 5,
    loadTweets: function() {
     
        var request = {
            expiry: JXTWEET.cacheExpiry
        }
 
   $(JXTWEET.appendTo).html('');
   
        $.ajax({
            url: '/oldschooltwitter',
            type: 'GET',
            dataType: 'json',
            data: request,
            success: function(data, textStatus, xhr) {
                var text, name, html = '<p class="tweet"><span class="time"><a href="URL" target="_blank">AGO</a></span> - <span class="text">TWEET_TEXT</span></p>';
                //Twitter Search API has different JSON Structure
                for (var i = 0; i < data.length && i < JXTWEET.numTweets; i++) {
 
                    $(JXTWEET.appendTo).append(
                        html.replace('TWEET_TEXT', JXTWEET.ify.clean(data[i].text) )
                            .replace('AGO', JXTWEET.timeAgo(data[i].created_at) )
                            .replace('URL', 'http://twitter.com/' + data[i].user.screen_name + '/status/' + data[i].id_str )
                    );                             
 
                }
                $(JXTWEET.appendTo).append('<a href="http://twitter.com/' + JXTWEET.user + '" class="more">View more news</a>');                         
            }  
        });
    },
    /**
      * Create a more readable date format
      * @param {string} twitter date string returned from Twitter API
      * @return {string} better time like "4pm Friday 22nd Feb 2013"
      */
    timeAgo: function(dateString) {
  
  // Stupid IE and dates
  var iniDate = dateString.split(' ');
  var date = new Date(Date.parse(iniDate[1]+' '+iniDate[2]+' '+iniDate[5]+' '+iniDate[3]+' UTC'));
  
  // Outputs am or pm
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  
  // Outputs full day i.e. Sunday
  var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
  
  // Outputs date with th, st, nd, rd
  var dayDate = date.getDate(), newDate = dayDate + (dayDate>10 && dayDate<20 ? 'th' : {1:'st', 2:'nd',3:'rd'}[dayDate % 10] || 'th');
  
  // Outputs full name Month
  var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()];
  
  // Outputs year
  var year = date.getFullYear();
  
  // Return in desired format "4pm Friday 22nd Feb 2013"
  var combinedString = strTime + ' ' + day + ' ' + newDate + ' ' + month + ' ' + year;
  return combinedString;
    },
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },
 
      at: function(tweet) {
        return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },
 
      list: function(tweet) {
        return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },
 
      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },
 
      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    }
};

$(document).ready(function () {
    //JXTWEET.loadTweets();
});
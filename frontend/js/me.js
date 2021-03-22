$(document).ready(function(){
    function truncateText(text, length) {
      if (text.length <= length) {
        return text;
      }
    
      return text.substr(0, length) + '\u2026'
    }
      $.ajax({
            url : "/api/me/user",
            type: "GET",
            success: function(result){
                let nav = $("#nav-mobile");
                if (result[0]) {
                     nav.append('<li>' + `<a href="/me/">${result[0].name}</a>` + '</li>'
                 + "<li> <a href='/auth/logout'>Sign Out</a>");
                } else {
                  console.log("ERROR");
                let nav = $("#nav-mobile");
                nav.append(' <li><a href="/login">Login</a></li>'+
                    '<li><a href="/register">Sign Up</a></li>')
                }
            },
            error: function(e) {
                console.log('error', e);
                let nav = $("#nav-mobile");
                nav.append(' <li><a href="/login">Login</a></li>'+
                    '<li><a href="/register">Sign Up</a></li>')
            }
        });
      $.ajax({
            url : "/api/me/reviews",
            type: "GET",
            success: function(result){
            let table = $("#reviews");
                for (let i = 0; i < result.length; i ++){
                    table.append('<tr><td>' + result[i].rid + '</td><td>' + 
                    `<a href="/officer/${result[i].rid}">${result[i].off_name}</a>` +'</td><td>'+   `${result[i].off_num}`+ '</td><td>' + `${result[i].rating}`+ '</td><td>' + `${truncateText(result[i].rev, 15)}`+ '</td><td>' + result[i].location + '</td><td>' + result[i].likes + '</td><td>' + result[i].dislikes + '</td><td>'+ `<a href="/review/${result[i].rid}">View</a>` + '</tr>');
                }
                console.log(result);
            },
            error: function(e) {
                console.log(e);
            }
        });
    });
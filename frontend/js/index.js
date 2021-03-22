
$(document).ready(function(){
    function truncateText(text, length) {
      if (text.length <= length) {
        return text;
      }
    
      return text.substr(0, length) + '\u2026'
    }
    let nav = $("#nav-mobile");
      $.ajax({
            url : "/api/me/user",
            type: "GET",
            success: function(result){
                if (result[0]) {
                     nav.append('<li>' + `<a href="/me/">${result[0].name}</a>` + '</li>'
                 + "<li> <a href='/auth/logout'>Sign Out</a>");
                } else {
                nav.append(' <li><a href="/login">Login</a></li>'+
                    '<li><a href="/register">Sign Up</a></li>')
                }
            },
            error: function(e) {
                console.log('error', e.responseText);
                nav.append(' <li><a href="/login">Login</a></li>'+
                    '<li><a href="/register">Sign Up</a></li>')
            }
        });
      $.ajax({
            url : "/api/reviews",
            type: "GET",
            success: function(result){
             let table = $("#reviews");
                for (let i = 0; i < result.length; i ++){
                    table.append('<tr><td>' + result[i].rid + '</td><td>' + 
                    `<a href="/officer/${result[i].off_num}">${result[i].off_name}</a>` +'</td><td>'+   `${result[i].off_num}`+ '</td><td>' + `${result[i].rating}`+ '</td><td>' + `${truncateText(result[i].rev, 15)}`+ '</td><td>' + result[i].location + '</td><td>' + result[i].likes + '</td><td>' + result[i].dislikes + '</td><td>'+ `<a href="/review/${result[i].rid}">View</a>` + '</tr>');
                }
                console.log(result);
            },
            error: function(e) {
                console.log(e);
            }
      });
      $(function() {

        $('#login').on('submit', (e) => {
            e.preventDefault();
           let email = $("#email").val();
           let pword = $("#password").val();
           let formData = {
               'email': email,
               'password': pword
           }
       $.ajax({
           url: '/auth/login',
           type: 'POST',
           data: JSON.stringify(formData),
           contentType: 'application/json',
           success: function(result){
               console.log(result);
               window.location.replace("/"); 
           },
           error: function(error){
               console.log(error);
               alert(error.responseText);
           }
       });
    })
   });
    });
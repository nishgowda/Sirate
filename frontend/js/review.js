
$(document).ready(function() {
    $('#rating').formSelect();
    let current_uid = 0;
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
   let url = window.location.href
   let sub = url.replace('http://localhost:4000/review/', '')
   let rid = parseInt(sub);
   let owner_id = 0;
   let likes = 0;
   let dislikes = 0;
     $.ajax({
       url : "/api/reviews/" + rid,
       type: "GET",
       success: function(result) {
           owner_id = result[0].uid;
           $('#off_name').val(result[0].off_name);
           $("#off_num").val(result[0].off_num)
           $('#review').text(result[0].rev);
           $("#rating").val(result[0].rating);
           $("#location").val(result[0].location);
           dislikes = result[0].dislikes;
           likes = result[0].likes;
           $('#rating').formSelect();
           if (owner_id != current_uid) {
               $('#off_name').attr('disabled', true);
               $('#off_num').attr('disabled', true);
               $('#review').attr('disabled', true);
               $('#location').attr('disabled', true);
               $('#rating').attr('disabled', true);
               $('#rating').formSelect();
               $("#header").text("See Review");
           }
           console.log(result);
           console.log(current_uid, owner_id);
       },
       error: function(e) {
           console.log(e);
       }
   });
   $("#like_btn" ).click(function() {
       likes += 1;
       $('#like_btn').text(likes);
       $('#dislike_btn').attr('disabled', true);
        $(function() {
       $('#create_form').on('submit', (e) => {
        e.preventDefault();
       let formData = {
           'likes': likes,
       };
         $.ajax({
           url : "/api/reviews/liked/" + rid,
           type: "PUT",
           data: JSON.stringify(formData),
           contentType: 'application/json',
           success: function(result){
               window.location.href = "/";
                   console.log(result);
           },
           error: function(e) {
               alert(e.responseText);;
               console.log(e);
           }
       });
   });
       });
   });
   $("#dislike_btn" ).click(function() {
       dislikes += 1;
       $('#dislike_btn').text(dislikes);
       $('#like_btn').attr('disabled', true);
        $(function() {
       $('#create_form').on('submit', (e) => {
        e.preventDefault();
       let formData = {
           'dislikes': dislikes,
       };
         $.ajax({
           url : "/api/reviews/disliked/" + rid,
           type: "PUT",
           data: JSON.stringify(formData),
           contentType: 'application/json',
           success: function(result){
               window.location.href = "/";
                   console.log(result);
           },
           error: function(e) {
               alert(e.responseText);;
               console.log(e);
           }
       });
   });
       });
       
   $(function() {
       $('#create_form').on('submit', (e) => {
        e.preventDefault();
       let officer_name = $('#officer_name').val();
       let officer_badge_num = $('#officer_badge_num').val();
       let review = $('#review').val();
       let rating = $('#rating').val();
       let location = $('#location').val();
       let formData = {
           'rev': review,
           'rating': rating,
           'off_name': officer_name,
           'off_num': officer_badge_num,
           'location': location,
           'likes': likes,
           'dislikes': dislikes,
           'uid': current_uid
       };
         $.ajax({
           url : "/api/reviews/" + rid,
           type: "PUT",
           data: JSON.stringify(formData),
           contentType: 'application/json',
           success: function(result){
               window.location.href = "/";
                   console.log(result);
           },
           error: function(e) {
               alert(e.responseText);
               console.log(e);
           }
       });
   })
       });
   });
      });

$(document).ready(function(){
    $('#rating').formSelect();
    let uid = 0;
$.ajax({
    url : "/api/me/user",
    type: "GET",
    success: function(result){
        let nav = $("#nav-mobile");
        if (result[0]) {
             nav.append('<li>' + `<a href="/me/">${result[0].name}</a>` + '</li>'
         + "<li> <a href='/auth/logout'>Sign Out</a>");
         uid = result[0].uid;
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
        'likes': 0,
        'dislikes': 0,
        'uid': uid,

    };
$.ajax({
    url : "/api/reviews",
    type: "POST",
    data: JSON.stringify(formData),
    contentType: 'application/json',
    success: function(result){
        window.location.href = "/";
        console.log(result);
    },
    error: function(e) {
        alert(e);
        console.log(e);
    }
});
})
})
});
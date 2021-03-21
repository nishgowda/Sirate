# Backend

Contains two services, api and auth, that handle server functionality.

## API:
Create, Read, Update, and Delete information for **Users** and **Reviews**
1. Users
    - GET '/api/users' retrieves all the information about all users in the database
    - GET '/api/user/:uid' retrieves information about a single user given a uid
    - GET '/api/user/me' retrieves information about the user logged in
    - PUT '/api/user/:uid' updates information about a user (except their password) given a uid
    - DELET '/api/user/:uid' delete a user in the database given their uid
2. Reviews
    - GET '/api/reviews' retrieve all information about all reviews in database
    - GET '/api/reviews/me' retrieves information about the reviews the logged in user has made
    - GET '/api/reviews/:rid' retrieves all information about a single review given its rid
    - GET '/api/reviews/users/:uid' retireves the information about the reviews made by a user given a uid
    - GET '/api/reviews/officer/name/:off_name' retrieves the information about the reviews made containing the officers name given their off_name
    - GET '/api/reviews/officer/num/:off_num' retrieves the information about the reviews made containing the officers name given their off_num (badge number)
    - GET '/api/reviews/location/:location' retrieves the information about the reviews made in the given location
    - GET '/api/reviews/likes/:likes' retrieves the information about the reviews given a certain number of likes
    - GET '/api/reviews/dislikes/:dislikes' retrieves the information about the reviews that have the given number of dislikes
    - GET '/api/reviews/rating/:rating' retrieves the information about the reviews that have the given a rating
    - GET '/api/reviews/count/:uid' retrieves the number of reviews a certain user has made given their uid
    - POST '/api/reviews/' inserts a review into the database with the correct params 
    Must contiain { rating, text, likes, dislikes, off_name, off_num, location } in json format in the request body.
    - PUT '/api/reviews/liked/:rid' updates the review to change the number of likes
    - PUT '/api/reviews/disliked/:rid' updates the review to change the number of dislikes

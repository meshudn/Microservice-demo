## Moduler Description
# Review Service

config
> expose applicaiton on PORT: 3062

> create a database connection with MySQL or MongoDB 

>create Review Table {
   customerId, productId, order_id, review_text, review_date
 }

function getAllReviews(){}
> path: localhost/reviews

> HTTP Method: Get /

> get all the review from the review database and send a JSON response. 

function addReview(){}
> path: localhost/review

> HTTP Method: POST

> body with a JSON request.

> add review in the review database. 

function deleteReview(){}
> path: localhost/review/{id}

> HTTP Method: delete

> add review in the review database. 

function updateReview(){}
> path: localhost/review/{id}

> HTTP Method: PUT

> body with JSON request

> add review in the review database. 

dependency: There will be a HTML form in the frontend Service. and frontend service will send the json data to API-GATEWAY service. 

Language: ASP.net

Task Assign to: RAKIBUL ISLAM

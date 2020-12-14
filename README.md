# 304CEM_Backend_Public_Libary_Cw
Ross Woolfenden's (7955723) 304CEM Coursework. Client 2 – Public Library: A Book Lending Web App
To run 
### `npm i`
To install dependencies 

### `npm run dbstart` or `docker start mariadbdocker`
To start docker container running database

### `npm start` or `node index.js`
To run API

User Routes - /api/v1/users

| Method | extention |Body/Param | Description |
|--------|-----------|-----------|-------------|
| get | '/getAllUsers | n/a | Route admin only to get alll users |
| post | '/register | Body - json object of user details | Route to register users |
| post | '/' | body- log in credentials | Route to log user in |
|delete | '/:id([0-9]{1,})' | Params id of user | Route to delete user |
| put | '/'/:id([0-9]{1,})' |params id of user body - new user credentials  |  Route to update user detials |

Book Routes /api/v1/books

| Method | extention |Body/Param | Description |
|--------|-----------|-----------|-------------|
|get | '/' | n/a | Route to get all books| 
|get | '/mybooks' | n/a | Route to get all book by a user / need auth |
|get | '/:id([0-9]{1,}) | params - id of book | get detials on selected book |
|post | '/add' | body - Book credentails | A route to add a new book / need auth |
|delete | '/:id([0-9]{1,})' | params - book id | A route to delete book - need auth/ and role |
| put | '/:id([0-9]{1,})' | params - book id | A route to update book - need auth and role|


Request Routes - /api/v1/requests

| Method | extention |Body/Param | Description |
|--------|-----------|-----------|-------------|
| get | '/chats/' | n/a | gets all user chats - need auth |
| get | 'chat/:id([0-9]{1,})' | params - id of chat | Route to get all messages form chat |
|post | '/sendRequest' | body - message detaails (book,users, chatid) | Route for first reuqests of a book |
|post | '/sendmsg' | body - message object | a Route to send messages between users| 


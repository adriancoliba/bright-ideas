<img src='logoWithText2.png' width='300' />

 &nbsp;[Live demo](https://bright-ideas-app.web.app/)

## Social blogging app

Bright Ideas is a blogging app that helps people free their thoughts and share ideas with everyone. It was built with React, firebase, react-router, redux and redux-thunk, material-ui and react-quill.

## Getting started
You can view a live demo over at https://bright-ideas-app.web.app/

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server (this project uses create-react-app)

## Features/functionality overview

This app is a social blogging site called "Bright Ideas". It uses firebase for all requests, including authentication. 

#### Uses:
- React (create-react-app)
- react-router
- firebase
- material-ui
- redux + redux-thunk
- react-quill

#### General functionality:
- SPA application with public and private routes
- Authenticate users via JWT (Sign Up / Sign In / Sign Out pages)
- Auth Persistence with Local Storage
- Reset password page and change password from Profile Settings page
- Database with CRUD Users, Notes, Posts (add/update comments on posts)

#### The general page breakdown:

- Home page (url: '/')
    - App introduction
    - List of all shared public blog posts
    - Because some of the posts are lengthy, Home page shows an excerpt instead of the full post, which makes it easier for public to browse content in one place.
    - If users see a teaser that grabs their attention, they can click on the title, or 'read more' and navigate to a nested route to see the full post. Here, public can also view and add comments.
    - See author's post profile information
- Sign up / Sign in / Sign out / Reset Password pages (url: '/signin', '/signup', '/reset')
    - Store the token in localStorage
    - Create user object inside 'users' collection
    - Handle inputs validation and catch firebase back-end errors
- Notepad page (url: '/notepad') 
    - Create new note and delete note functionality.
    - Text editor that updates database real-time, with the help of a debounce function to reduce database requests
    - Share note publicly as a blog post (able to share it anonymously or with your name and profile information)
- Profile Settings page (url: '/profile') 
    - Update avatar icon, full name, about information. 
    - Update password. Delete account permanently
    
## About
&nbsp;&nbsp; This project was approached to learn connecting React with a database and manipulate data from it.  From the beginning, I haven’t identified what exactly had to be build  nor determine the desired outcome. With this in mind, features were implemented on the fly. First I developed a notepad page that updates live with firebase database. Secondly, i've decided to add user authentication and authorization to handle login, sign up, reset password and manage routes with react-router for single-page application purposes. 
	
&nbsp;&nbsp; Now, after getting some exposure to React with Firebase and building some complexity, managing state shared across components became difficult and messy. I’ve decided to integrate Redux and Redux-thunk middleware to handle asynchronous actions. 
	
&nbsp;&nbsp; Lastly, to make this app more challenging, it came to mind building a blog app interrelated to the existing components. Giving users an option to share notes that they maintained was the first thing to do. After that i’ve created a public page with a list of all shared notes (as posts) and nested routes for each shared note. Last but not least, i had to let user / post's author control his public profile information by building Profile settings page and interrelating it to sibling components. 
    
## Contributing
Please submit bug fixes or features via pull requests & feedback via issues.

### Ideas/suggestions to implement:
- Option (checkbox) in Profile Settings to hide user's email from public
- Ask for password when deleting account
- Automated tests
- Share notes via email / social media
- Share posts via email / social media
- ...

##



// DESCRIBE the API !!!!!!!!!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


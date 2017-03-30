# DIY Life 

## Overview

DIY Life is life, if life was a game. 
Users can collaborate to create their own "choose your own adventure" stories. Given a prompt, users will put down two choices, without knowing what events occured before. These choices will then be passed on to another user to continue the story.
After a certain number of rounds, the story will be complete, and available for all users to play from the beginning.

## Data Model

The application will store Users and Stories
* Stories will be a collection of 10 events (maybe more or less?)
* Each event (excluding the ending) will be linked to two other events
** These events will be the two choices users choose from

An Example User:

```javascript
{
  username: "doppelganger",
  hash: // a password hash,
}
```

An Example Story:

```javascript
{
  collaborators: // array of users who have added to this already
  title: "Life",
  events: [Event],
  isFinished: boolean
}
```
An Example Event:

```javascript
{
  before: // event that occured before
  after: // event that occurs after, null if is end
  storyLine: String // prompt to display,
}
```


## [Link to Commented First Draft Schema](db.js) 


## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can start a new story
4. as a user, I can add choices to an existing story
5. as a user, I can play different paths in finished stories

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

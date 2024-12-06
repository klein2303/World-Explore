#  IT2810: Project 2 iteration 3
## Table of content 
- [IT2810: Project 2 iteration 3](#it2810-project-2-iteration-3)
  - [Table of content](#table-of-content)
  - [Decisions](#decisions)
  - [Developments](#developments)
  - [Technicalities](#technicalities)
  - [Future](#future)
  - [Usage of AI](#usage-of-ai)


## Decisions
We decided to restrict access to Explore Country and My Journals pages for users who are not logged in. 
This encourages users to take advantage of the login and register functionality. 
We also decided to change the Popular Countries functionality in the landing page (home page) with information about the intention behind the website. 
This decision was made alongside the restriction of access to the Explore Countries page for users who are not logged in. 

## Developments 
In this iteration, we mostly improved the functionalities we already had from the last iteration by upgrading the styling of the website, and made sure to be able to save and fetch the user generated data. 
Now, a review cannot be only created in the frontend, but it can also be saved in the database. Also, My Journal page can now get review from the database, and the reviews connected to the the journals can be succesfully retrieved from the database. 
Another added improvement is considering the accessibility (read more under Accessibility). 

In addition to that, some functionalities were added: 
1. Possibility to log in and sign out, while saving the registered user to the backend and retrieving the registered user and managing the login restrictions. 
2. Limited the access to our pages as user that is not logged in
3. To write a review from Explore Country page by clicking on the pencil on a Country card-component. This review will then come in My Journals page. 
4. Dark mode on website 

On top of that, we also managed to make some component tests alongside the end-to-end tests.


## Technicalities
Some technicalities we have after this iteration are: 
1. It is not possible to remain in the dark mode of the website when refreshing the website
2. The reviewboxes in the Country pages cuts off the review-text when the review has a long title
3. The navbar is not tested yet, because of some errors in the test we didn't have time to fix. We removed the test for now, but intend to put implement it in the future.

## Future 
Some improvements we intend to fix for the next iterations are: 
1. Improving the positions on the components of Explore Country page 
2. Continue with component tests 
3. Continue with end-to-end tests 

## Usage of AI 
In this iteration, we utilized AI to create component tests, generate texts for Home and Country pages, as replace div-elements with more semantically appropriate HTML elements.
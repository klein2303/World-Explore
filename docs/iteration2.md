# Decisions
In this section follows descriptions of the choices we have made since iteration 1 while developing "WorldExplore", for different aspects of the project. All decisions done earlier can be read under (link til iteration 1 here)

## Choice of database
We chose PostgreSQL as our database solution because we required a robust SQL database capable of handling complex relational data. Given the structure of our data, with multiple tables containing interrelated entities, PostgreSQL’s relational model was well-suited for managing and querying these relationships. This choice allowed us to define clear and maintainable foreign-key constraints, ensuring data integrity and simplifying complex data retrieval patterns. However, when integrating PostgreSQL with GraphQL, we encountered a limitation: GraphQL does not natively support SQL-like joins within queries. This meant we had to implement additional logic in our resolvers to handle data retrieval across related tables, adding some complexity to our API design. Despite this, PostgreSQL’s powerful features and support for relational data make it a solid foundation for our application, and the added complexity is manageable.

# Developments
We have added several functional improvemets since the last iteration. The requirements stated that we needed to implement a running 
ackend, but also support interaction like search, filtering, sorting and scrolling. Here is  an overview of how we have implemented said features:
- **Search**: The user can search for different countries on the Explore Countries page
- **Filtering**: The user can filter countries by continent on the Explore Countries page
- **Sorting**: The user can sort countries based an alphabetical order (both ascending and descending)
- **Scrolling**: The user can scroll through paginated content on the Explore Countries and My Journals pages, allowing seamless navigation between pages.

# Technicalities
- The virtual machine link is one commit behind the main branch. This is due to the group facing some issues when we tried to update the virtual machine with the newest changes. As we were afraid that we would be stuck without the frontend in the virtual machine, we decided to keep the virtual machine as it is. The commit made is possible to see reviews on the country-pages. However, we have met all the requirements for this iteration, as filtering, sorting, searching and scrolling is possible. Moreover, if you wish to see the reviews on the pages, you can clone the repo and run the application locally. Look up Egypt or Japan to see reviews for these countries.
- The My Journals page is not yet connected to the backend, so the data that is presented here is just dummy data.
- The application does not yet support writing reviews, but you may see how this is planned implemented by pressing the picture of an unwritten journal in My Journals or by visiting a country page and pressing the "Write a journal entry"-button
- Some characters, such as á and í, are shown as a "?" on our website when looking at the country-pages. For instance, Brazil's capital is shown as "Bras���". This is due to an error in the dataset.

# Future
There are still some features that need to be implented, and they are listed here.

## Connect to backend
There are some parts of the frontend that are connected to the database, like the Explore Countries page, as well as the individual country pages, but we still need to add functionality for writing actual reviews and viewing your own reviews on your personal page. For this to be possible we need to connect user accounts to the database, so that is a priority for the upcoming iteration.

## Testing
Since testing has not been prioritised this time around, we will focus on testing all components as well as performing end-to-end testing in the next iteration. Testing was implemented for iteration 1, but since we have set up the backend and modified some of the files, the test files will show errors. We plan on fixing our tests for the next iteration.

# Usage of AI
We used AI to transform our divs into more suitable elements. We also used it for improving our tests. AI was also used to help set up the backend on virtual machine.

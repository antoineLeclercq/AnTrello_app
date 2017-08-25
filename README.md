# AnTrello App
A project management web application based on Trello that allows for
creation, deletion, archival, reorganization, labeling and keyword search of lists and
cards in list.

### Backend tools
Express, Postgresql, node-postgres, jasmine-node

### Frontend tools
Backbone, jQuery, jQuery-UI, Underscore, moment, Jasmine, Handlebars, Autosize

## Features
- Single Page Application
- Persistence through PostgreSQL DataBase
- search cards feature
- bookmarkeable card url

### List Features
- create/archive list
- drag and drop list
- add/edit list name
- copy list + cards within it
- move list
- move all cards in list to other list
- archive all cards in list

### Card Features
- create/archve card in list
- add/edit card title
- drag and drop card within a list
- drag and drop card between lists
- card details view
- add/edit/remove card description
- add/remove labels
- add name to label
- add/edit/remove due date
- move card by selecting list and position in list
- copy card with following options:
  - copy associated comments
  - copy associated labels
  - select list and position in list
- card activities log:
  - add card to list
  - move card to different list
  - copy card
  - add/edit/remove due date
  - add/edit/remove comment
- subscribe to card => notifications when actvities are logged
- card prview including: title, labels, due_date, description flag, comment flag + count
- quick edit feature:
  - edit labels
  - edit due date
  - move card
  - copy card
  - archive card
- link to card for each activity in log

# Steps to set up app the app:
1) Make sure you have npm installed (https://docs.npmjs.com/getting-started/installing-node)
2) Install nodemon globally if not already installed (`npm install nodemon -g`)
3) Clone the repository
4) Open terminal, navigate to root directory of project
5) Execute the following command in order to install the node modules: `npm install`
6) Execute the following commands in the root directory to setup the databases:

`psql postgres < sql/antrello_app_dump_no_data.sql`

`psql postgres < sql/antrello_test_dump.sql`

7) Execute the following command in root directory of the project in order to start up the server : `npm start`
8) Open browser and navigate to: http://localhost:3000/

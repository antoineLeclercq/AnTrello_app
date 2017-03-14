# AnTrello App
## A Database backed Trello clone
### Backend tools: Express, Postgresql, node-postgres, jasmine-node
### Frontend tools: Backbone, jQuery, jQuery-UI, Underscore, moment, Jasmine, Handlebars, Autosize

Steps to set up app the app:
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

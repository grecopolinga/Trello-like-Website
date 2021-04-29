# CCAPDEV-2021T2-G05

Machine Project for CCAPDEV2021T2

<br/><p align="center"><img src="./public/img/logo.png"></p><br/>

TRONE is a productivity website that was inspired from Trello and Evernote. The website is made easier, more flexible and simpler to manage and organize tasks and reminders.

The workspace in TRONE is a Kanban-style, list-making application that is similar to Trello as it increases the user’s productivity and efficiency in handling tasks.

# Contents:

-   [config](config) - This folder contains config file for the web app.
-   [controllers](controllers) - This folder cointains files which defines callback functions for callback requests.
-   [helpers](helpers) - This folder contains files which contains helper functions.
-   [middlewares](middlewares) - This folder contains files which contains middlewares
-   [migrations](migrations) - This folder contains files for adding/removing data
-   [models](models) - This folder contains files for database modelling
-   [public](public) - This folder contains static assets such as css,js and img files
-   [routes](routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
-   [src](src) - This folder contains the css file for [tailwindcss](https://tailwindcss.com).
-   [views](views) - This folder contains all the hbs files to be rendered to the server.
-   [app.js](app.js) - Main entry point of the app

# How to Run Program:

Using a CLI:

1. Clone the repository using:

```
git clone https://github.com/DLSU-CCAPDEV/2021T2-G05.git
```

2. Navigate to the 2021T2-G05 folder and install all the required dependencies using `npm install`
3. Add data to the database using the command below.

```
npm run db_up
```

4. Run the program using:

```
npm run start
```

5. Once the program is running, your command prompt should display the following:

```
Running in production mode on port 3000
Serving at http://localhost:3000
DB Connected: localhost
```

6. Access the application on:

```
http://localhost:3000/
```

7. Enjoy Using the app!

# User Data

The table below shows the details of the sample users.
| Usename | Password |
| :----------: | :------------: |
| Sonson_Great | Hakdoq1234 |
| L_Graves | Leona_1234 |
| Fried_12 | Chizudoggu11\_ |
| StellaD | Bestoftherest143 |
| Angelo_Laurent | Daraifurawa12 |

# Authors:

-   Juliana Marie Agulto
-   Heinze Kristian Moneda
-   Greco Polinga

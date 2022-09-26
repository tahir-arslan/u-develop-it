# U Develop It
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Description
This module introduced MySQL and the file structure that goes along with the SQL database. Beginning with what a database is, how to create and access tables, as well as how to perform CRUD operations, the module ends with more advanced MySQL commands such as joining tables, using aggergate functions, and connecting everything together so that Express.js, Node.js, and MySQL can all work in tandem. MySQL2 is used to be able allow MySQL to use Express.js API Routes.

For this lesson, a vote tracker was created that contains information about the Candidates, Voters, and a Votes table that is a combination of select data from Candidates and Voters. This last table displays a count that tallys the total votes each candidates have gotten. 

#### Screenshot
![Screenshot](/public/assets/images/screenshot.png)

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License(s)](#licenses)
4. [Questions](#questions)

## Installation
Clone the repo and open the project. In terminal, execute the command `npm i`. This will install all the dependencies required for this application to work.

## Usage
Once the dependancies are installed, you need to execute `npm start` to start the server. Once the server is running, a message will appear saying,
```
API server now on port xxxx!
```
Open your browser and go to `localhost:xxxx` where 'xxxx' is the port being used to host the server. 

In order to use MySQL from the terminal, open `./db/connection.js` and enter your username and password for MySQL where:
```
{
        user: 'root',
        // change password to match login for MySQL
        password: ' ',
}
```
Save the file, and execute the command `mysql -u root -p` to login and use MySQL. 

## License(s)
MIT

## Questions
My name is Arslan Tahir, the creator of this project. If you have any issues, comments, concerns, or questions regarding this project, feel free to contact me at tahir.arslan@gmail.com.

If you would like to check out my other projects, feel free to explore my !(GitHub Page)[https://github.com/tahir-arslan/].
    
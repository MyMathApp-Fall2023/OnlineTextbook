# MyMathApp

CSCE606 Textbook Project in Fall 2023.

Deployed project at [Heroku](https://my-math-apps-online-textbook-63eb858df6f6.herokuapp.com/)

## Project Description
This project is a full-stack web application ecommerce site that allows users to register, login, find MYMathApps products (Calc 1/2/3 textbooks) and buy a subscription to them. They can then access the textbook from the webapp. Admins can view, activate/deactivate, and delete users. User access to a textbook is disabled after the end of their subscription date. Admins can also add or edit purchase codes that give discounts for particular products. Instructors can sign up an entire class along with themselves and then pay for their subscriptions. Instructors can also manage their classes and add or remove users from it.

## Technical Description
The application is built using React, Node.js, Express, and MySQL. Both front and back-end are written in TypeScript. The web client communicates with the backend REST API using Axios. The backend uses TypeORM to communicate with the MySQL database.



## Development Environment Setup
1. Install nodejs, the latest should work which at the time is 21.2.0
2. npm comes with nodejs.
3. Install yarn
   `npm install -g yarn`
4. Install nestjs
   `npm install @nestjs/cli`
5. Install Docker and set it up. This can be done from the CLI or from Docker Desktop itself (you can run the shell commands in a container's "exec" tab once the container is created).
   ```bash
      # Start the MySQL server container
      docker run --name local-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8.0
      # Connect to the MySQL server container
      docker exec -it local-db bash
      # Start MySQL client
      mysql -u root -p
      # enter your password from first command
      create database 'mymathapps';
      ```
6. Prepare different .env configuration files as .env.example in `Server` folder
  The configuration files are as lists:

  | Name        | Environment               |
  | ----------- | ------------------------- |
  | .env.dev    | Development               |
  | .env.test   | Test                      |
  | .env.heroku | Deploy on Heroku          |
  | .env.prod   | Deploy on CLient's server |

   For the .env.dev file:
   ```bash
      ENV_TYPE = dev
      SERVER_PORT = [enter your docker port]
      DB_HOST = localhost
      DB_Port = 3306
      DB_Username = [enter your DB username set in Docker]
      DB_Password = [enter your DB password set in Docker]
      DB_Database = mymathapps
      CLIENT_ID = [enter your PayPal sandbox ID]
      APP_SECRET = [enter your PayPal sandbox secret ID]
   ```

### To Run Backend Server:
1. `cd server/`
2. `yarn`
3. `yarn start`

### To Run Frontend Client:
1. `cd client/`
2. `yarn`
3. `yarn start`


## To test with this iteration

### Spec Tests
1. cd ./server
2. yarn test
   
### Before running the Cucumber tests, some test data must be inserted into the database. Copy the init.sql file into the Docker container, run it, then run the tests.
1. Navigate to the directory that the `init.sql` file is in (this should be the root directory of the project)
2. Use this command to copy the file `docker cp ./init.sql container_id:/tmp/init.sql`
3. Ensure the container is running and log in to the mysql on the container
   - This can be done either through the CLI or docker desktop
   - `mysql -u <database root username> -p`
4. `source init.sql;`
5. You should now be good to run the tests, note that this must be done each time the cucumber tests are run.

### Cucumber tests
1. cd ./client
2. yarn cucumber-test

## To Deploy On Heroku:
This article is extremely helpful, refer to it, **escpecially if you have no prior experience**:
[Deploying With Git On Heroku](https://devcenter.heroku.com/articles/git)

Here's the steps we used to deploy to Heroku. We recommend finding a safter way since this is error prone, but this has been our process.
1. Enter the root folder
2. `heroku login`
3. This step only has to be done the first time: `heroku create -a <your app name here>`, if you have an existing app, use this `heroku git:remote -a <your app name here>`
   - For more information, I strongly recommend checking the article.
5. Create a local branch off of dev. This branch should remain local and not be available to the public.
   - `git checkout -b <branch name>`
6. On the local branch, naviage to the client directory.
7. Inside of your .env.client.heroku file, change the two urls to the url of your app.
8. Navigate to the server directory, then the src directory
9. Inside of the main.ts on line 11 (just below the `enablecors` section), change the heroku app url to your own url.
10. Navigate back to the server directory
11. Modify the .gitignore and remove the line containing `.env.heroku`
12. Create a .env.heroku file in the same directory, it's almost the same as the .env.dev but the DB information is replaced with a dburl.
    - Refer to app.module.ts for more information on the differences. The heroku website should also have information on what is needed.
    - If your db is different from postgres, you'll need to look on the heroku website and modify the .env.heroku
13. **Be careful**, your .env.heroku has sensitive information. Do not allow your local repo to go onto github or anywhere public.
14. Use `git status` and add/commit anything that still needs to be added. Be sure to add your .env.heroku
15. `git push heroku your_local_branch:main` **Do not** push the local repo to anywhere else.
    - Since your heroku branch may be multiple versions off, you may need to add `-f` after the push to overwrite what's there.
16. That's it.

## Contributors
Cheng Niu, Shuang Yu, Zhiting Zhao, Yongqing Liang, Shuyu Wang, Yun Du, Andrew Crenwelge, Spencer Banasik, Nikhil Nehra, Nick Robert, Arunim Samudra

Point of Contact: Spencer Banasik, smb200007@tamu.edu

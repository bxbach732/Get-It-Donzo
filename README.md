<a name="readme-top"></a>

<div align="center">

<h1 align="center">Get It Donzo</h1>

  <h4 style="font-style: italic; text-align: center;">
    Get it donzo bozo
    <br />
    <a href="https://github.com/bxbach732/Get-It-Donzo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </h4>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This todo-list application is the take-home assignment for the Slush Junior Web Developer position. 
It was developed using the PERN stack (PostgreSQL, Express, React, and Node) and deployed to Render (https://get-it-donzo.onrender.com/). This is a fairly simple PERN stack application because the scope of the assignment is a 12-hour-to-make web application. 

The Node/Express backend is built using TypeScript. JavaScript is used for developing the React frontend. The database uses the postgres Docker image and the data migration/seed processes are handled by Knexjs. The database for the deployment is hosted using ElephantSQL. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* TypeScript: https://www.typescriptlang.org/
* PostgreSQL: https://www.postgresql.org/
* Express.js: https://expressjs.com/
* React.js: https://react.dev/
* Node.js: https://nodejs.org/en
* Docker: https://www.docker.com/
* PaperCSS: https://www.getpapercss.com/
* Knex.js: https://knexjs.org/
* ElephantSQL: https://www.elephantsql.com/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
This is the instruction of how to set up and run this project locally.

### Prerequisites
There are 2 ways to build and run this application: the first way is by using Docker (recommended) and the second way is to use npm. Go to the server subfolder of the project, create a .env file, and fill it according to the example file .env.example (Note: if you user Docker, you can fill in whatever credentials you prefer but you'll have to use real credentials from a running PostgreSQL database if you choose to use npm).
<br><br/> 
#### Using Docker
The first thing to do is to open Docker (install Docker if you don't already have it).
1. Build the Docker image. Note that everytime you make a change, you will have to rebuild the Docker image again
   ```sh
   docker-compose build
   ```
2. Start the Docker container
   ```sh
   docker-compose up
   ```
3. Go to localhost:3000 to use the application

#### Using npm
1. Go to each directory server and client and install all the dependencies
    ```sh
    npm install
    ```
2. Go to the package.json of the client and remove the line '"proxy": "http://backend:7777"'
3. In each directory server and client, run
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

I chose to build a to-do list application because it's so simple but also very usefull to people. The user can sign up, login, and use the application like a typical to-do list: they can create a todo entry, mark it as done, and delete it. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Implement testing.
- [ ] Implement better way to handle authentication (currently localStorage based token)
- [ ] Convert the frontend from Javascript to Typescript
- [ ] Document the APIs using swager
- [ ] Implement CI/CD pipeline
- [ ] Add more features to the application
    - [ ] Profile page
    - [ ] Habit tracker
    - [ ] Heat map


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
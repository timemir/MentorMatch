&nbsp;
DISCLAIMER: PUBLIC VERSION FOR SHOWCASE
<p align="center">
<img width="350" src=https://user-images.githubusercontent.com/84287747/217040499-c835a9ea-a050-46b4-a648-021d5afc9fad.png>
</p>



<p align="center">
<img src=https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB>
<img src=https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white>
<img src=https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white>

</p>
<p align="center">
  <img src=https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E>
<img src=https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white>
  <img src=https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue>
  <img src=https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white>
  <img src=https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white>
<img src=https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white>
  <img src=https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white>
</p>

&nbsp;

<h5 align="center">
  <a href="#About">About</a>  |
  <a href="#Setup">Setup</a>  |
  <a href="#Examples">Examples</a>  |
  <a href="#Roadmap">Roadmap</a>  |
  <a href="#Authors">Authors</a>
</h5>

&nbsp;

# Mentor Matching

![](https://user-images.githubusercontent.com/94791958/230463518-4dcbcec1-ab8c-49b5-8bb4-38f69fc5233e.png)

The mentor-matching application shall connect learners and experts in a convenient and efficient way. Users create mentor and/or mentee profiles that an algorithm matches with a suitable counterpart.

![](https://user-images.githubusercontent.com/94791958/230463520-673f72a3-56db-413e-9088-6b4b43faadc9.png)

Based on user A’s preference for in-person learning, location, and interest in cooking, they were matched with user B.

# Setup

In order to setup the project, please proceed as follows:

1. First, you need to clone this repository with the following git command, while being in your desired directory:

```bash
  git clone https://github.com/TechLabs-Dortmund/mentor-matching.git
```

2. Then you need to change your directory into the newly created folder called ```mentor-matching``` with the following command:

```bash
  cd mentor-matching
```


3. Then, you need to create a ```.env ``` file inside the ```./backend ``` folder, where you can also find the ```.env.template``` file.

It should have the following properites:


```bash
SECRET_KEY=your_super_secret_key
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_SERVER=your_postgres_server_address
POSTGRES_PORT=5432
POSTGRES_DB=your_postgres_db_name
AUTH_SECRET=your_secretkey
ACCESS_TOKEN_EXPIRE=100
ALGORITHM=your_chosen_algorithm
```

Note: Please do not use the given example values (except the port) and add your own. If you want to change the port, you also have to change it in the ```docker-compose.yml``` file. And if you are not sure what to do, here is an example that should work:


```bash
SECRET_KEY=supersecret
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SERVER=db
POSTGRES_PORT=5432
POSTGRES_DB=postgres
AUTH_SECRET=secretkey
ACCESS_TOKEN_EXPIRE=100
ALGORITHM=HS256
```

4. Then, you need to create a ```.env ``` file inside the ```./client ``` folder, where you can also find the ```.env.template``` file. It should have the following properites:

```bash
VITE_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
VITE_CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
VITE_CLOUDINARY_URL=YOUR_CLOUDINARY_URL
```

Note: You have to create an account on [Cloudinary](https://cloudinary.com/) and create an API key. Then you can add the values to the ```.env``` file. For a tutorial on how to do this exactly, please refer to this [tutorial](https://dev.to/ogwurujohnson/cloudinary-image-upload-the-setup-k3h#:~:text=On%20the%20settings%20page%2C%20click,pre%2Dsigning%20the%20upload%20request.) or just search for how to upload images to cloudinary.

---

For the frontend, backend and the Database, we are using [Docker](https://www.docker.com/). For the following steps, we are assuming you installed and setup Docker correctly on your system.

5. Change your current directory to the root folder of ```mentor-matching``` with the following command (if you are not in the root folder):

  
  ```bash
    cd ..
  ```
  
6. Then build up the docker container with the following command:

  ```bash
    docker compose up -d --build
  ```

7. After the docker builder has been build successfully, you can boot it up with the following command:

```bash
  docker compose up
```

The following servers are now running:
- Frontend port 5173
- Backend port 8000

## Examples

### Tour Video
![](https://user-images.githubusercontent.com/84287747/230416088-fec5f250-7897-4654-a75c-296494788084.gif)

### Mentor Overview
You see an overview of the most popular mentors to get an idea, of what you can expect from the platform

![Bildschirmfoto 2023-04-06 um 14 07 46](https://user-images.githubusercontent.com/94791958/230466596-c8dc7b5d-9582-4698-ac6a-b735054d161c.png)

### See all your matches in one place
In your own dashboard, you will always see your current matches and in which status these are. 

![Bildschirmfoto 2023-04-06 um 14 15 49](https://user-images.githubusercontent.com/94791958/230467464-a547eab7-37d6-404d-8b51-1d2b2d349e1e.png)


### Get in contact with your mentors and mentees via chat
Have a short chat, or plan your next session. It is up to you 

![Bildschirmfoto 2023-04-06 um 14 16 49](https://user-images.githubusercontent.com/94791958/230467954-067b9dd5-a1d6-47c5-99a8-62fc2b310000.png)

### Rate your experience
You had a great experience with a mentor or mentee? Great! You can show this with a rating for the user

![Bildschirmfoto 2023-04-06 um 14 17 15](https://user-images.githubusercontent.com/94791958/230468211-20b355bf-197e-478c-9eaf-76db71d5d8dc.png)


  
## Known Bugs

- The Docker was designed in a Linux environment. Therefore there were some issues with a development environment based on Windows


  
## Authors

- [@Tim](https://github.com/timemir)
- [@Moritz](https://github.com/DerMoehre)
- [@Enis](https://github.com/EnisOezel)
- [@Jannik](https://github.com/thejaniak)
- [@Nil](https://github.com/sranger1)
- [@Finn](https://github.com/fringetime)


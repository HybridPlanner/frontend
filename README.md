<p align="center">
  <img src="src/assets/img/logo_hybrid_planner.svg" alt="HybridPlanner Logo"/>
</p>

<p align="center">HybridPlanner makes planning meetings with external participants a breeze.</p>

# Table of Contents
- [🚀 Built with ReactJS](#-built-with-reactjs)
- [🔑 Prerequisites](#-prerequisites)
- [🔧 Installation](#-installation)
  - [🐳 Using Docker](#-using-docker)
- [🔍 How to Use HybridPlanner](#-how-to-use-hybridplanner)
  - [📆 Create a New Meeting](#-create-a-new-meeting)
  - [📝 Join a Meeting](#-join-a-meeting)

# 🚀 Built with ReactJS
HybridPlanner's frontend is built using [ReactJS](https://reactjs.org/), providing a modern and efficient user interface.

> We also used [Storybook](https://hybridplanner.github.io/frontend) to develop and test the components in isolation.

# 🔑 Prerequisites
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (optional)

**Note:** Ensure you start the backend server before using the application. Find the backend repository [here](https://github.com/HybridPlanner/backend).

# 🔧 Installation
1. Clone the repository.
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the application
    ```bash
    npm run start
    ```
4. Open the application in your browser: [http://localhost:5173](http://localhost:5173)

### 🐳 Using Docker
1. Clone the repository.
2. Use the docker-compose file to start the application
    ```bash
    docker-compose up
    ```
3. Open the application in your browser.

# 🔍 How to Use HybridPlanner

> ⚠️ Ensure the backend server is running before following the steps below.

## 📆 Create a New Meeting
1. Go to the dashboard and fill out the form with the meeting details and the participants you want to invite.
2. Click on "Plan meeting" to create the meeting.
3. The meeting is now created, and you can view the meeting details and the participants you invited.

> 💡 Participants will receive an email with a link to the meeting details.

## 📝 Join a Meeting
1. Go to the dashboard and click on the meeting you want to join.
2. Click on the 🔗 link of the meeting you created, and you will be redirected to a waiting page with a countdown. You will be automatically redirected to the meeting page when the countdown is over.

> 💡 You can also join the meeting by clicking on the link in the email you received.

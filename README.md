# HangTime
### Unlimit your limited schedule
- <a href="https://g14-classified.gitlab.io/hang-time">Link to Website</a>
- <a href="https://oct-2023-14-pt-g14backend.mod3projects.com/docs#/default">Backend Deployment</a>

## G-14 Classified (Group 14)
- Christian Ramos
- Henry Martija
- Mark Giampa
- John Romua

## Design
- <a href="https://gitlab.com/g14-classified/hang-time/-/blob/dev/docs/API.md?ref_type=heads">API Documentation</a>
- <a href="https://gitlab.com/g14-classified/hang-time/-/blob/dev/docs/DATA-MODEL.md?ref_type=heads">Data Models</a>
- <a href="https://gitlab.com/g14-classified/hang-time/-/blob/dev/ghi/WireFrame/ghi.md?ref_type=heads">GHI</a>

## Intended Market
HangTime is tailored for anyone seeking an organized and efficient way to manage their schedules, join groups and events of interest, and connect with others based on open availability.

## Functionality
- All visitors of the website are able to Register or Login
- Logged-in users are brought to their Profile page
- Profile page includes:
    - creating Availabilities
    - list view of current Availabilites
    - matching Availabilities with friends
- NavBar includes routes to:
    - Events
    - Profile
    - Groups
    - Logout
- Groups page includes:
    - create a Group
    - join or leave a Group
    - list view of joined Groups
    - add friends to Group
    - create an Event
    - list view of upcoming Events with attendance option
        - includes filter option based on selected group
- Events page includes:
    - list view of users attending an Event
        - includes filter option based on selected Event
    - list view of Event History for past Events

## Project Initialization
1. Fork this repository - https://gitlab.com/g14-classified/hang-time
2. Clone the forked repository to your local machine by running this command in your terminal:
- `git clone https://gitlab.com/g14-classified/hang-time.git`
3. Make sure Docker is installed and running
4. Run these Docker commands in your terminal:
- `docker volume create postgres-data`
- `docker-compose build`
- `docker-compose up`
5. Once the Docker containers are running, access the project in your browser:
    - Backend FASTAPI Swagger: http://localhost:8000/docs
    - Frontend React: http://localhost:3000/

# Henry's Journal

## Week 13 1/7 - 1/13:

- Created project roadmap documentation.
- Worked on wire frame outlines
- Worked on API endpoints
- SQL Models in progress

## Week 14 1/14 - 1/20:

- Tuesday 1/16:
  - Rosheen asked us to rework on our tables
  - Learned about junction and associate tables
  - Recreated and designed junction tables
    - EventAttendees
    - UserGroups
- Wednesday 1/17:
  - Created documentation for group on migrations
  - Migrated new tables to db
- Thursday 1/18:
  - Created first sample api endpoint to create a user

## Week 15 1/21 - 1/27

- Monday 1/22:
  - Worked with Mark to do backend api refresher
  - Helped him create groups endpoint
- Wednesday 1/24:
  - Worked on events endpoints for backend
- Thursday 1/25:
  - Wrapped up remaining CRUD endpoints for events
- Friday 1/26:
  - Figured out SQL queries for our User's Group's Event's endpoint
    - This needed to join 4 tables to get to work

## Week 16 1/28 - 2/3

- Monday 1/22:
  - Created Unit Test for User login
  - Worked with Christian to figure out how to create unit tests for other endpoints
- Tuesday 1/23:
  - Worked on CI/CD
  - Took notes on Rosheen's CI/CD notes
  - Reviewed CI/CD Learn Block
  - Deployed Database
- Wednesday 1/24:
  - Deployed Backend
  - Couldn't deploy frontend, kept getting 503 temporary unavailable error
  - asked SIERs and put up HMU
- Thursday 1/25:
  - Got help from Rosheen to deploy the Frontend
  - Apparently we have to get the repo and the group public as we changed it to private to get rid of a GitLab group limitation.
- Friday 1/26:
  - Implemented frontend version of Create an Event
- Saturday 1/27:
  - Implemented frontend version for Listing Users GRoups Events

## Week 17 2/4 - 2/10

- Monday 2/5:
  - I broke the Create Event endpoint
  - Fixed it by creating a separate EventsOut base model.
  - Worked with john to figure out how best to implement users attending and event by making a new api endpoint
- Tuesday 2/6:
  - Spent the whole morning with Rosheen fixing our deployment backend
  - I made a bunch of errors in my deployment variables
  - Eventually got it fixed and deployed
- Wedneday 2/7:
  - Coordinated full testing of deployed front end and back end endpoints
  - Consolidated a list of high priority bugs to fix through out the week and stretch goals
  - Created the splash page and CSS design of the overall site
- Thursday 2/8:
  - Worked on documentation for the API endpoints and Table data.
  - Merge recent changes to main, I'm pretty sure there we're 20 total merge conflicts to sort through.
- Friday 2/9:
  - Will work on code cleanup
  - Fix some remaining front end components

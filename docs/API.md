# API Documentation

## Overview

Overview of the available Hang-Time API endpoints organized into distinct categories: UsersGroups, Groups, Events, Availabilities, and EventAttendees. Each category is designed to manage specific aspects of the application, from user group memberships to event management and user availabilities.

## UsersGroups (Authenticated)

The UsersGroups endpoints manage the relationship between users and groups, allowing for adding users to groups, retrieving user groups, and removing users from groups.

- POST /usersgroups: Add a user to a group. Requires a JSON object with user_id and group_id.

Sample Input:

```
{"user_id": 1, "group_id": 2}

```

- GET /usersgroups/{user_id}: Retrieve all groups a specific user belongs to.

- DELETE /usergroups/{user_id}/{group_id}: Remove a user from a specific group.

Sample Output:

```
[
  {
    "group_id": 1,
    "name": "Matrix global models",
    "description": "Ready stage perform charge despite recent suddenly board."
  }
]
```

# Groups (Authenticated)

Groups endpoints facilitate the management of groups, including their creation, retrieval, update, and deletion.

- GET /groups: Retrieve all groups or a specific group by id.

- POST /groups: Create a new group with name and description.

Sample Input:

```
{"name": "string", "description": "string"}

```

- PUT /groups/{id}: Update a specific group's details.

- DELETE /groups/{id}: Delete a specific group.

Sample Output:

```
[
  {"id": 2, "name": "Reinvent b2b models", "description": "Target 24/7 initiatives"}
]

```

## Events (Authenticated)

Events endpoints allow for the creation, retrieval, updating, and deletion of events, as well as fetching events associated with a specific user.

- GET /events: Fetch all events or a specific event by event_id.

- POST /events: Create a new event with details such as name, description, location, start_date, end_date, and group_id.

Sample Input:

```
{
  "name": "string",
  "description": "string",
  "location": "string",
  "start_date": "2024-02-08",
  "end_date": "2024-02-08",
  "group_id": 0
}

```

- PUT /events/{event_id}: Update an existing event's details.

- DELETE /events/{event_id}: Remove a specific event.

Sample Output:

```
[
  {
    "id": 13,
    "name": "string",
    "description": "string",
    "location": "string",
    "start_date": "2024-01-25",
    "end_date": "2024-01-25",
    "group_id": 2
  }
]

```

## Availabilities (Authenticated)

The Availabilities endpoints manage user availability data, allowing for the creation, retrieval, and deletion of user availability entries.

- POST /availability: Create a new availability entry with day, is_match, and user_id.

Sample Input:

```
{"day": "2024-02-08", "is_match": true, "user_id": 0}

```

- GET /availability/{user_id}: Retrieve all availability entries for a specific user.

- GET /availabilities: Retrieve all availability entries from all users.

- DELETE /availability/past: Retrieve all past availability entries from all users.

Sample Output:

```
[
  {"id": 1, "day": "2024-02-02", "is_match": true, "user_id": 17}
]
```

## EventAttendees (Authenticated)

EventAttendees endpoints manage users attending specific events, including adding and removing attendees and retrieving event attendees.

- POST /eventattendees: Add a user attendee to a specific event. Requires user_id and event_id.

Sample Input:

```
{"user_id": 0, "event_id": 0}
```

- DELETE /eventattendees: Remove a user attendee from a specific event.

- GET /eventattendees/{event_id}: Retrieve all users attending a specific event.

Sample Output:

```
[
  {
    "id": 1,
    "user_id": 17,
    "event_id": 17,
    "first_name": "string",
    "last_name": "string"
  }
]
```

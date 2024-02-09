# Data Models

## Table: `authenticated_users`

Stores information about users who have registered and are authenticated to use the system.

| Column     | Type   | Constraints | Description                          |
| ---------- | ------ | ----------- | ------------------------------------ |
| id         | SERIAL | PRIMARY KEY | A unique identifier for each user.   |
| First_Name | TEXT   | NOT NULL    | The first name of the user.          |
| Last_Name  | TEXT   | NOT NULL    | The last name of the user.           |
| email      | TEXT   | NOT NULL    | The email address of the user.       |
| password   | TEXT   | NOT NULL    | The password for the user's account. |

## Table: `groups`

Stores information about groups that users can join.

| Column      | Type   | Constraints | Description                                     |
| ----------- | ------ | ----------- | ----------------------------------------------- |
| id          | SERIAL | PRIMARY KEY | A unique identifier for each group.             |
| name        | TEXT   | NOT NULL    | The name of the group.                          |
| description | TEXT   | NOT NULL    | A brief description of what the group is about. |

## Table: `usergroups`

Manages the association between users and groups, indicating which users are part of which groups.

| Column   | Type    | Constraints           | Description                                   |
| -------- | ------- | --------------------- | --------------------------------------------- |
| user_id  | INTEGER | NOT NULL, FOREIGN KEY | References the `id` in `authenticated_users`. |
| group_id | INTEGER | NOT NULL, FOREIGN KEY | References the `id` in `groups`.              |

## Table: `events`

Contains information about events that are organized within groups.

| Column      | Type    | Constraints           | Description                                                                  |
| ----------- | ------- | --------------------- | ---------------------------------------------------------------------------- |
| id          | SERIAL  | PRIMARY KEY           | A unique identifier for each event.                                          |
| name        | TEXT    | NOT NULL              | The name of the event.                                                       |
| description | TEXT    | NOT NULL              | A brief description of the event.                                            |
| location    | TEXT    | NOT NULL              | The location where the event takes place.                                    |
| start_date  | DATE    | NOT NULL              | The starting date of the event.                                              |
| end_date    | DATE    | NOT NULL              | The ending date of the event.                                                |
| group_id    | INTEGER | NOT NULL, FOREIGN KEY | References the `id` in `groups`. Indicates which group the event belongs to. |

## Table: `eventattendees`

Tracks which users are attending which events.

| Column   | Type    | Constraints           | Description                                                                      |
| -------- | ------- | --------------------- | -------------------------------------------------------------------------------- |
| id       | SERIAL  | PRIMARY KEY           | A unique identifier for each attendance record.                                  |
| user_id  | INTEGER | NOT NULL, FOREIGN KEY | References the `id` in `authenticated_users`. Indicates which user is attending. |
| event_id | BIGINT  | NOT NULL, FOREIGN KEY | References the `id` in `events`. Indicates which event the user is attending.    |

## Table: `availabilities`

Records the availability of users for events on specific days, and whether that availability is a match for scheduled events.

| Column   | Type    | Constraints           | Description                                                                                          |
| -------- | ------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| id       | SERIAL  | PRIMARY KEY           | A unique identifier for each availability record.                                                    |
| day      | DATE    | NOT NULL              | The day for which the availability is recorded.                                                      |
| is_match | BOOLEAN | NOT NULL              | Indicates whether the user's availability matches any event requirements.                            |
| user_id  | BIGINT  | NOT NULL, FOREIGN KEY | References the `id` in `authenticated_users`. Indicates which user's availability is being recorded. |

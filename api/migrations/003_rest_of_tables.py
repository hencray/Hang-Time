steps = [
    [
        """
        CREATE TABLE groups (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        );
        """,
        """
        DROP TABLE groups;
        """
    ],
    [
        """
        CREATE TABLE usergroups (
            user_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            FOREIGN KEY (group_id) REFERENCES groups(id),
            FOREIGN KEY (user_id) REFERENCES authenticated_users(id)
        );
        """,
        """
        DROP TABLE usergroups;
        """
    ],
    [
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            group_id INTEGER NOT NULL,
            FOREIGN KEY (group_id) REFERENCES groups(id)
        );
        """,
        """
        DROP TABLE events;
        """
    ],
    [
        """
        CREATE TABLE eventattendees (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            event_id BIGINT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES authenticated_users(id),
            FOREIGN KEY (event_id) REFERENCES events(id)
        );
        """,
        """
        DROP TABLE eventattendees;
        """
    ],
    [
        """
        CREATE TABLE availabilities (
            id SERIAL PRIMARY KEY,
            day DATE NOT NULL,
            is_match BOOLEAN NOT NULL,
            user_id BIGINT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES authenticated_users(id)
        );
        """,
        """
        DROP TABLE availabilities;
        """
    ]
]

steps = [
    [
        """
        CREATE TABLE authenticated_users (
            id SERIAL PRIMARY KEY,
            First_Name TEXT NOT NULL,
            Last_Name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        );
        """,
        """
        DROP TABLE authenticated_users;
        """
    ]
]

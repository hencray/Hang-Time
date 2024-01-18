import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get(
    "postgresql://example_user:secret@postgres/example_db"))

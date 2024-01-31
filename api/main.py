from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    users,
    groups,
    usergroups,
    events,
    availability,
    eventattendees,
)


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(usergroups.router)
app.include_router(groups.router)
app.include_router(events.router)
app.include_router(availability.router)
app.include_router(eventattendees.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }

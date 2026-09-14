```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST /exampleapp/new_note (note=text)
    activate Server
    Server->>Server: formatNote() + createNote() -> add to notes array
    Server-->>Browser: 302 Found, Location: /exampleapp/notes
    deactivate Server

    Browser->>Server: GET /exampleapp/notes
    activate Server
    Server-->>Browser: HTML page + main.js
    deactivate Server

    Note right of Browser: Browser executes JavaScript
    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: JSON array of notes (including new note)
    deactivate Server

    Note right of Browser: JavaScript renders the notes list in #notes

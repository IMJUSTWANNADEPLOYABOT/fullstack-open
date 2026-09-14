```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST /exampleapp/new_note_spa (note=text)
    activate Server
    Server->>Server: formatNote() + createNote() -> add to notes array
    Server-->>Browser: 201 Created, JSON { message: 'note created' }
    deactivate Server

    Note right of Browser: JavaScript receives response
    Note right of Browser: Updates #notes div with new note (no page reload)
    

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /exampleapp/spa
    Server-->>Browser: HTML document (200 OK)

    Note right of Browser: Browser parses HTML and discovers spa.css and spa.js

    Browser->>Server: GET /exampleapp/spa.css
    Server-->>Browser: CSS

    Browser->>Server: GET /exampleapp/spa.js
    Server-->>Browser: JavaScript

    Note right of Browser: Browser executes spa.js, which loads notes

    Browser->>Server: GET /exampleapp/data.json
    Server-->>Browser: JSON array of notes

    Note right of Browser: Browser renders notes using redrawNotes()

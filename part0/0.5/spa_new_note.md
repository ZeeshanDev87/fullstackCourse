sequenceDiagram
    participant browser
    participant server

    browser->>server: POST /api/notes
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: JavaScript updates the note list dynamically

    Note right of browser: The page reloads

    browser->>server: GET /spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /spa.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    browser->>server: GET /data.json
    activate server
    server-->>browser: Notes data (JSON)
    deactivate server

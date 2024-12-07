sequenceDiagram
    participant Usuario
    participant Navegador
    participant Servidor

    Usuario ->> Navegador: Escribe en el campo de texto
    Usuario ->> Navegador: Clic en botón "Save"
    Navegador ->> Servidor: POST /new_note {data: "contenido de la nota"}
    Servidor -->> Navegador: Respuesta 200 OK con datos actualizados
    Navegador ->> Usuario: Actualiza la lista de notas en la página


SPA
sequenceDiagram
    participant Usuario
    participant Navegador
    participant Servidor

    Usuario ->> Navegador: Accede a la aplicación SPA
    Navegador ->> Servidor: GET /data.json
    Servidor -->> Navegador: JSON con notas existentes
    Navegador ->> Usuario: Muestra notas en la interfaz
    Usuario ->> Navegador: Escribe una nueva nota y hace clic en "Save"
    Navegador ->> Servidor: POST /new_note {content: "nueva nota"}
    Servidor -->> Navegador: Respuesta 200 OK
    Navegador ->> Usuario: Actualiza la lista de notas localmente

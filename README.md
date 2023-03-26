# CodeFiddle

Ever used sites like CodeSandbox, or codedamn? Wondered how they've built their code editors to be so customisable while integrating personalised features like open collaboration? This project is a take on how a site like this could be built.

The basic layout provides a VS Code experience, wherein a user can navigate between his available files from the file manager. The user also has a shell available that is hooked to a container that has been spun up for him, thus allowing for a full developer workflow, similar to the way you would work offline.

Integrated with this is also an iframe providing realtime feedback to changes you may make in your project. The various components in this project, like the Code Editor, and the Browser Previews are freely resizable, so you can set them to a size that provides the most optimal working environment for you.

## Authors

- [@rajatmaheshwari2512](https://www.github.com/rajatmaheshwari2512)

## Contributing

Contributions are always welcome!

- In case you find a bug, please open an issue, the title of which must begin with 'BUG'.
- Detail the steps to reproduce the bug, and the expected outcome as well.
- In case you're fixing a bug, please open a PR, and detail the bug that you have fixed.
- To request a feature, please open an issue, the title of which must begin with 'FEATURE REQUEST'.

## Features

- Built in React, Node, Express, and Docker.
- Uses websockets to transmit changes and other events to and from the client to the server.
- Uses xterm.js to provide a shell to the Docker container.
- Uses Monaco editor to provide a VS Code like experience while working in the browser.
- Recursively hydrates the file structure so as to handle files and folders at any depth, i.e., nested structure.
- Uses zustand as the global state management library.
- Uses icon packs to help identify the types of files in the project.
- Each playground comes bootstrapped with a React Vite Application.

## Run Locally

Note: The project was built in a Linux based environment, and is untested on Windows, and MacOS

Clone the project

```bash
git clone https://github.com/rajatmaheshwari2512/CodeFiddle
```

Switch to the frontend and install dependencies

```
cd frontend
npm install
```

Switch to the backend and install dependencies

```
cd backend
npm install
```

In the backend, create a directory named playgrounds

```
mkdir playgrounds
```

Run the frontend and backend

```
cd frontend
npm run dev
cd backend
npm run dev OR npm start
```

## Roadmap

- **The move to Kubernetes**: The current setup is based on Docker, and exposes a port on the running container, which reflects the changes that are made to files on the container. This approach is fine for testing purposes, but there are only so many ports available, not to mention the load on the device hosting the docker containers. Switching to Kubernetes and serving content through an Ingress Controller, will kill reliance on ports, and allow the user to access his container on a subdomain, for example, https://testing.codefiddle.com.

- **Ensuring Collaborative Editing**: The current setup of the project allows only a single user to make changes to the file, which limits what the project can do. The foundations for making a collaborative editor are in the project, but are quite barebones, and the most important feature of the project actually allowing realtime changes is still missing.

- **Updating the file explorer in realtime**: The file explorer is currently fetched and rendered when the playground is requested. Imagine a scenario where a user creates a file or a folder from the terminal, this changes needs to be reflected in the file explorer in realtime.

- **Customized Context Menu**: On right clicking on a file or folder in the file explorer, rather than the default context menu that is opened in most browsers, a custom menu must open with options that allow creation or deletion of new files and folders.

- **Revamping the landing page**: Currently the landing page is just a big button clicking on which allows the user to create a new playground. This while functional is not very pleasantly styled and needs a bit of customisation.

- **Removal of unused containers**: A method needs to be deivsed where a container is removed if it has not seen activity for a specified period of time. This can be done by heartbeat signals of websockets.

- **Adding support for more file extensions**: Support for icons of more file extensions would result in a better and more informative UI.

- **Adding support for resizable shell**: Decreasing the size of the window results in the shell overflowing text, this can be fixed by using the fit addon that xterm.js provides.

## Screenshots

![The Editor Window](https://i.imgur.com/Mghmoeh.png)

![Resized Browser](https://i.imgur.com/vmn8gkh.png)

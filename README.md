# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Docker Deployment

This project includes Docker support for containerized deployment.

### Building the Docker Image

```bash
docker build -t event-list-react .
```

### Running the Container

```bash
docker run -p 80:80 event-list-react
```

The application will be available at [http://localhost:80](http://localhost:80).

### Docker Compose (Optional)

You can also create a `docker-compose.yml` file for easier management:

```yaml
version: '3.8'
services:
  event-list-react:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

### Production Considerations

- The Dockerfile uses a multi-stage build to optimize image size
- Static assets are served with appropriate caching headers
- The nginx configuration supports client-side routing for React Router
- The container runs on port 80 internally, map it to your desired external port

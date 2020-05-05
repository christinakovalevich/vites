# VITES

## Running the Application:
1. You can either start up the server and client apps separately:
    ```
    ./gradlew server:bootRun
    ```
    in another terminal
    ```
    ./gradlew client:start
    ```

2. The client build.gradle file also includes a bootRun (for consistency with the server project), which means you can take advantage of Gradle’s parallel execution to run both client and server apps in a single command:
    ```
    ./gradlew bootRun -parallel
    ```
3. Other tasks defined in client wrap the create-react-app scripts for building and testing the React app. You can run them with the Gradle wrapper, or run the npm scripts directly if you have npm installed.
    ```
   ./gradlew client:test //or, from the     client project dir: npm test
   
   ./gradlew client:build //or, from the client project dir: npm run build
    ```
   Learn more: https://guides.grails.org/using-the-react-profile/guide/index.html

# AsyncRemoteStorageApp

![Screen Shot](https://user-images.githubusercontent.com/107002413/229384758-8eea81fd-3922-466b-9f1b-76b6c17a9506.png)

## Introduction

This app provides various services for managing files and folders on a remote shared server. It is built using a combination of server-side Java Spring controllers and client-side technologies such as HTML, CSS, JavaScript, and jQuery. Users can browse, rename, download, upload, and delete files and folders on the remote server using a simple and intuitive user interface. The app was designed with performance in mind and implements asynchronous Promise-based communication with the server. Additionally, it is deployed using the Apache Tomcat web server, which ensures that it can be accessed by the user through a web browser on their computer.

To operate the app on your computer, you will first need to get Apache Tomcat installed. Once you get Tomcat installed and configured, you can start the server by running the appropriate command or script for your operating system. Once the server is running, open your web browser and navigate to the URL for the app, typically `http://localhost:8080/`. This should lead you to the app's homepage, where you can start using its features to browse, rename, download, upload, and delete files and sub-folders on a remote shared folder. You can use the navigation buttons to move between functionalities. For more information on how to use the app, a `readme.txt` is provided upon starting the app.

## Known Bugs

1. Renaming a file inside a sub-folder fails.
2. Attempting to navigate to a sub-folder immediately after renaming it fails, but reloading the page does fix the issue.

## Credits

The design of this website was inspired by: [https://criticalmediartstudio.com/witnessing/](https://criticalmediartstudio.com/witnessing/) by criticalmediartstudio.

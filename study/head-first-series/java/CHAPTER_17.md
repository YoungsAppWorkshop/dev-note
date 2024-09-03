# Chapter 17. Package, Jars and Deployment: Release Your Code

## Deploying your application

### Deployment Options

- Local
  - The entire application runs on the end-user’s computer, as a stand-alone, probably GUI, program
  - Deployed as an executable JAR
- Combination of local and remote
  - The application is distributed with a client portion running on the user’s local system, connected to a server where other parts of the application are running.
  - Web start, RMI app
- Remote
  - The entire Java application runs on a server system, with the client accessing the system through some non-Java means, probably a web browser.
  - Servlets

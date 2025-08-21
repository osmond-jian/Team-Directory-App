# Team Member Directory App - built with React + TypeScript + Vite

This app takes a mock team directory and allows searching, filtering (based on name, role and email), and even adding/deleting entries. It takes an initial array of teamMember objects and stores it in local storage to allow users to edit the data. There is a setTimeout when communicating with the json database to simulate the async nature of communicating with a backend. Feel free to try it out!

To do so - clone the repo and run the following command:
(NOTE: you need to have node.js and npm installed)
```
npm install || yarn install
```
Then, you can run it locally with 

```
npm run dev
```
Or if you want to run it in prod, use

```
npm run build
```
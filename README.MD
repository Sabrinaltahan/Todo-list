 ## Project Description
This project built with React and TypeScript. 
Express backend API and demonstrates full CRUD functionality for a Todo list.
The project was created as part of a course assignment to demonstrate:

State management in React
Dynamic data fetching using useEffect
Form handling with validation
CRUD operations with REST API
TypeScript type safety
Error handling and loading states
Responsive design

## Tech Stack
## 1-Frontend
React
TypeScript
Vite
Fetch API
CSS (responsive design)
## 2-Backend
Node.js
Express
CORS

## Features
1- Create
Add a new todo
Title must be at least 3 characters
Description max 200 characters
Default status: "Ej påbörjad"

 2- Read
Fetch all todos using useEffect
Display todos dynamically

3- Update
Update todo status:
Ej påbörjad
Pågående
Avklarad

4- Delete
Remove a todo from the list

5- Error Handling
API error messages displayed to user
Retry option when fetch fails

6- Loading State
Loading indicator while fetching data

## project structure:
todo-project/
│
├── backend/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   │   ├── TodoForm.tsx
│   │   │   └── TodoList.tsx
│   │   ├── types/
│   │   │   └── todo.ts
│   │   └── App.tsx
│   └── package.json

## Installation
1-start backend: 
cd backend
npm install
npm run dev
runs on : http://localhost:4000

2-start frontend 
cd frontend 
npm install
npm run dev
runs on : http://localhost:5173

API Endpoints:
GET:  GET/ todos
POST: POST/ todos
PUT: PUT/ todos/ :id
DELETE: DELETE/ todos/:id

## Developed by : Sabrin Altahan

Github link: https://github.com/Sabrinaltahan/Todo-list.git


Frontend APP:https://todo-list-1-m0hd.onrender.com


Backend API: https://todo-list-rrqd.onrender.com

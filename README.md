# React Native: Notes App

This is a React Native application built with Expo that allows users to manage personal notes. It includes user authentication and full CRUD (Create, Read, Update, Delete) operations using **Appwrite.io**. Each user has access only to their own notes.

## Environment

- React Native (via [Expo](https://expo.dev/))
- Node Version: 18 (LTS)
- Backend: [Appwrite.io](https://appwrite.io/)
- Cross-platform: Android, iOS, Web

## Application Demo

![This application allows users to manage personal notes with authentication](app/assets/images/demo.gif)

## Functionality Overview

The app offers the following features:

### User Authentication

- Register with email and password
- Secure login/logout
- Session management via Appwrite

### Notes Management (CRUD)

- View a list of personal notes
- Create new notes
- Update existing notes
- Delete notes
- Notes are isolated per user account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Appwrite

Set up an Appwrite project and configure the following:

- **Authentication** enabled
- **Database** collection for notes
- **Environment variables** (`.env`) containing:

  - `APPWRITE_ENDPOINT`
  - `APPWRITE_PROJECT_ID`
  - `APPWRITE_DATABASE_ID`
  - `APPWRITE_COLLECTION_ID`

### 4. Start the Expo App

```bash
npx expo start
```

This will open the Expo developer tools. You can run the app on Android/iOS simulators or physical devices via the Expo Go app.

## Technologies Used

- React Native (via Expo)
- Appwrite (for authentication and database)

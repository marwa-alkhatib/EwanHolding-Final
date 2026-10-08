# Ewan Holding — Final Project

## Project Overview
Ewan Holding is a full-stack web project consisting of a corporate website, an admin dashboard, and a backend API.

## Project Structure
- **website/** — Corporate website developed with Angular 22.
- **admin/** — Administration dashboard developed with Angular 22.
- **backend/** — REST API developed with ASP.NET Core (.NET 10).

## Technologies Used
- Angular 22
- TypeScript
- HTML, SCSS
- ASP.NET Core (.NET 10)
- Entity Framework Core

## How to Run

### Website
Open a terminal inside the `website` folder:

```bash
npm install
npm start
```

### Admin Dashboard
Open a terminal inside the `admin` folder:

```bash
npm install
npm start
```

### Backend API
Install the .NET 10 SDK, configure the required application settings, and open a terminal inside the backend API project directory.

```bash
dotnet restore
dotnet run
```

## Configuration
The backend requires database connection settings and may require authentication and email configuration.

Sensitive credentials and local configuration files are excluded from the repository. Request the necessary configuration securely from the project owner.

## Notes
The website and admin dashboard require the backend API to be configured and running for their API-dependent features.
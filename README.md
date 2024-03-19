# Right Way

## Cloning the Repository

To clone the master branch of the repository, run the following command:

```bash
git clone -b master https://github.com/UNLV-CS472-672/2024-S-GROUP6-RW.git
```

## frontend instructions

```bash
# Navigate to the project directory
cd 2024-S-GROUP6-RW

# Navigate to the frontend directory
cd frontend

# Install necessary modules
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.

## Backend instructions

To install go:
https://go.dev/doc/install

```bash
# Navigate to the project directory
cd 2024-S-GROUP6-RW

# Navigate to the backend directory
cd backend

# Install dependencies ( project uses go.mod for dependency management)
go mod tidy

# run the server
go run main.go
```

Open [http://localhost:8080](http://localhost:8080) to view the backend in your browser.

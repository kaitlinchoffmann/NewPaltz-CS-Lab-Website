```mermaid
sequenceDiagram
    participant User
    participant LoginComponent
    participant AuthService
    participant APIClient
    participant AuthRoutes
    participant Database

    Note over User,Database: Login Flow

    User->>LoginComponent: Enter credentials
    Note right of User: username & password

    LoginComponent->>LoginComponent: handleLogin()
    Note right of LoginComponent: Form validation

    LoginComponent->>AuthService: login(credentials)
    Note right of AuthService: Prepare API request

    AuthService->>APIClient: post('/auth/login', credentials)
    Note right of APIClient: Add headers & handle errors

    APIClient->>AuthRoutes: POST /auth/login
    Note right of AuthRoutes: Validate request body

    AuthRoutes->>Database: Query user
    Note right of Database: SELECT * FROM admins WHERE user = ?

    alt User Found
        Database-->>AuthRoutes: Return user data
        AuthRoutes->>AuthRoutes: Compare password
        Note right of AuthRoutes: bcrypt.compare()
        
        alt Password Matches
            AuthRoutes->>AuthRoutes: Generate JWT
            Note right of AuthRoutes: jwt.sign()
            AuthRoutes-->>APIClient: Return token & success
            APIClient-->>AuthService: Forward response
            AuthService-->>LoginComponent: Store token
            LoginComponent->>User: Redirect to dashboard
        else Invalid Password
            AuthRoutes-->>APIClient: 401 Unauthorized
            APIClient-->>AuthService: Throw error
            AuthService-->>LoginComponent: Show error
            LoginComponent->>User: Display error message
        end
    else User Not Found
        Database-->>AuthRoutes: Empty result
        AuthRoutes-->>APIClient: 401 Unauthorized
        APIClient-->>AuthService: Throw error
        AuthService-->>LoginComponent: Show error
        LoginComponent->>User: Display error message
    end

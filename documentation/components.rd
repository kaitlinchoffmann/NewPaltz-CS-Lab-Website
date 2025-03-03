//Login 
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


//faculty
sequenceDiagram
    participant User
    participant FacultyDirectory
    participant FacultyService
    participant APIClient
    participant FacultyRoutes
    participant Database

    User->>FacultyDirectory: Visit /faculty
    FacultyDirectory->>FacultyService: getAllFaculty()
    FacultyService->>APIClient: GET /faculty
    APIClient->>FacultyRoutes: HTTP GET Request
    FacultyRoutes->>Database: Query Faculty
    Database-->>FacultyRoutes: Return Faculty Data
    FacultyRoutes-->>APIClient: JSON Response
    APIClient-->>FacultyService: Process Response
    FacultyService-->>FacultyDirectory: Update State
    FacultyDirectory->>User: Display Faculty Cards

    User->>FacultyDirectory: Enter Search Term
    FacultyDirectory->>FacultyDirectory: Filter Results
    FacultyDirectory->>User: Update Display

    //faq
    sequenceDiagram
    participant User
    participant FAQComponent
    participant FAQService
    participant APIClient
    participant FAQRoutes
    participant Database

    User->>FAQComponent: Visit /faq
    FAQComponent->>FAQService: getAllFAQs()
    FAQService->>APIClient: GET /faq
    APIClient->>FAQRoutes: HTTP GET Request
    FAQRoutes->>Database: Query FAQs
    Database-->>FAQRoutes: Return FAQ Data
    FAQRoutes-->>APIClient: JSON Response
    APIClient-->>FAQService: Process Response
    FAQService-->>FAQComponent: Update State
    FAQComponent->>User: Display FAQ Cards

    User->>FAQComponent: Search FAQs
    FAQComponent->>FAQComponent: Filter Results
    FAQComponent->>User: Show Filtered FAQs


    //student resources

    sequenceDiagram
    participant User
    participant ResourcesComponent
    participant ResourceService
    participant APIClient
    participant ResourceRoutes
    participant Database

    User->>ResourcesComponent: Visit /resources
    ResourcesComponent->>ResourceService: getAllResources()
    ResourceService->>APIClient: GET /resources
    APIClient->>ResourceRoutes: HTTP GET Request
    ResourceRoutes->>Database: Query Resources
    Database-->>ResourceRoutes: Return Resource Data
    ResourceRoutes-->>APIClient: JSON Response
    APIClient-->>ResourceService: Process Response
    ResourceService-->>ResourcesComponent: Update State
    ResourcesComponent->>User: Display Resource Cards

    User->>ResourcesComponent: Filter Resources
    ResourcesComponent->>ResourcesComponent: Apply Filters
    ResourcesComponent->>User: Show Filtered Resources
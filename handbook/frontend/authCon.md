# AuthContext & AuthProvider

This file manages authentication state for the frontend application. It loads the user from a stored JWT token, decodes it, and provides authentication data and logout functionality to the rest of the app.

## File: `AuthContext.jsx`

```jsx
import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = () => {
            const token = authService.getToken();
            if (token) {
                try {
                    const decoded = jwt_decode(token);
                    setUser(decoded);
                } catch (err) {
                    console.error("Invalid token:", err);
                    authService.logout();
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
```

---

## What This Does

### **1. Creates a global authentication context**
```jsx
export const AuthContext = createContext();
```
This allows any component to access authentication data.

---

### **2. Stores authentication-related state**
```jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```
- `user` contains decoded token data  
- `loading` tracks whether token validation is still running

---

### **3. Loads and decodes the JWT token on page load**
```jsx
useEffect(() => {
    const token = authService.getToken();
    ...
}, []);
```
- Retrieves the token from localStorage  
- Decodes it with `jwt-decode`  
- Removes the token if invalid  

This ensures the user stays logged in between page refreshes.

---

### **4. Handles invalid or expired tokens**
If token decoding fails:

```jsx
authService.logout();
setUser(null);
```

---

### **5. Provides a global logout function**
```jsx
const logout = () => {
    authService.logout();
    setUser(null);
};
```

Any component can log the user out by calling `logout()` from the context.

---

### **6. Makes auth data available to the entire app**
```jsx
<AuthContext.Provider value={{ user, setUser, loading, logout }}>
    {children}
</AuthContext.Provider>
```

Components can access:

- `user` – logged-in user data  
- `setUser` – manually update user  
- `loading` – check if auth is still initializing  
- `logout` – log the user out  

---

## Using the AuthContext

Example usage:

```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome, {user?.username}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
```

---

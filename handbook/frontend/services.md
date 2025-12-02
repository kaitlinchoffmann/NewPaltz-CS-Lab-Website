# Frontend Services – Complete Code Explanations

This document explains the purpose and behavior of every frontend service in the application.  
Core services such as API, authentication, admin management, and event handling include deeper explanations, while the rest provide clear descriptions of what the code does.

---

# 1. apiService.js  
Centralized Axios configuration (detailed explanation)

The `apiService` file creates a single, reusable Axios instance that the entire frontend uses when communicating with the backend. By creating one shared instance, the app avoids repeating configuration code such as the base API URL, default headers, and authentication logic across multiple files.

The base URL `/api` is applied automatically to every request, meaning calls like `apiService.get('/users')` will actually go to `/api/users`. The default `Content-Type` is set to JSON since the majority of requests send and receive JSON data.

A request interceptor is used to attach the stored token (if it exists) to all outgoing requests. This is important because it ensures authenticated routes always receive an `Authorization` header without manually adding it in every service.

The response interceptor handles errors in a centralized way. Instead of returning an Axios error object, it throws the error so the calling service can handle it with its own try/catch. This keeps behavior consistent across the entire frontend.

```javascript
import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
  response => response,
  error => { throw error; }
);

export default apiService;
```

---

# 2. authService.js  
Authentication, token handling, and session control (detailed explanation)

The authentication service handles all login-related functionality. It communicates with the `/auth/login` backend endpoint and stores the returned JWT token in `localStorage`. This allows the user's login session to persist even when the page reloads.

When the `login` function is called, the user’s credentials are sent to the backend for verification. If successful, the backend responds with a token that the service stores under `adminToken`. The service does not decode or validate the token itself — that happens in the authentication context elsewhere in the application. Its only job is storing, retrieving, and clearing the token.

The `logout` function removes the token, which effectively ends the current session.  
`isAuthenticated` simply checks whether a token exists.  
`getToken` returns the stored token so other modules can access it.

```javascript
import apiService from './apiService';

const authService = {
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout() {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  },

  getToken() {
    return localStorage.getItem('adminToken');
  }
};

export default authService;
```

---

# 3. adminService.js  
Admin account management (detailed explanation)

The admin service communicates with backend routes under `/api/admins`. This service manages user accounts used by the admin panel. It includes functions for loading all admins, fetching specific admins, creating new admins, editing existing ones, and deleting accounts.

The admin service uses regular Axios rather than `apiService` because some routes may require different base handling or have their own security rules on the backend.

When creating or editing admins, the service sends full JSON objects that contain user details such as username, email, and permissions. When deleting admins, it targets privileged routes (`/admin-panel/...`), which indicates backend permission checks are likely involved.

The service also supports checking username and email availability. These requests allow the admin panel to validate form input before submitting it, preventing duplicate accounts.

```javascript
import axios from 'axios';
const baseURL = '/api/admins';

export const adminService = {
  async getAllAdmins() {
    try {
      const response = await axios.get(`${baseURL}/`);
      return response.data;
    } catch {
      throw new Error('Failed to load Users');
    }
  },

  async deleteAdmin(adminId) {
    try {
      const response = await axios.delete(`${baseURL}/admin-panel/${adminId}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete User');
    }
  },

  async addAdmin(adminData) {
    try {
      const response = await axios.post(baseURL, adminData);
      return response.data.id;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add User');
    }
  },

  async getAdminByID(id) {
    try {
      const response = await axios.get(`${baseURL}/admin-panel/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch User by ID');
    }
  },

  async editAdmin(id, data) {
    try {
      const response = await axios.put(`${baseURL}/admin-panel/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to edit User');
    }
  },

  async checkUsernameAvailability(username) {
    const response = await axios.get(`${baseURL}/check-username/${username}`);
    return response.data.available;
  },

  async checkEmailAvailability(email) {
    const response = await axios.get(`${baseURL}/check-email/${email}`);
    return response.data.available;
  }
};
```

---

# 4. eventService.js  
Event creation, editing, deletion, and file uploads (detailed explanation)

The event service interacts with the backend’s event routes (`/api/events`). Events often include images such as banners or posters, so this service is built to handle both regular JSON requests and multipart form uploads.

The functions `createEvent` and `editEvent` use `FormData` instead of a regular JavaScript object. This is required because file uploads cannot be sent as JSON; they must be encoded as multipart form data. The service sets the `Content-Type` header to `multipart/form-data` so the backend can properly parse uploaded files.

The `authHeader` function attaches the stored token to ensure only authorized users can create, edit, or delete events. Public-facing operations such as listing events do not include this header.

```javascript
import axios from 'axios';
const baseURL = '/api/events';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const eventService = {
  async getAllEvents() {
    const res = await axios.get(baseURL);
    return res.data;
  },

  async getEventById(id) {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
  },

  async createEvent(formData) {
    const res = await axios.post(baseURL, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },

  async editEvent(id, formData) {
    const res = await axios.put(`${baseURL}/${id}`, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },

  async deleteEvent(id) {
    const res = await axios.delete(`${baseURL}/${id}`, {
      headers: authHeader()
    });
    return res.data;
  }
};

export default eventService;
```

---

# 5. facultyService.js  
Faculty directory CRUD operations (simple explanation)

This service manages faculty entries. It supports loading all faculty, loading a specific faculty member, adding new faculty, editing existing entries, and deleting them. Each function sends a request to the corresponding backend route under `/api/faculty`.

```javascript
import axios from 'axios';
const baseURL = '/api/faculty';

const facultyService = {
  async getAllFaculty() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load faculty data');
    }
  },

  async deleteFaculty(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete faculty');
    }
  },

  async getFacultyByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch faculty data');
    }
  },

  async addFaculty(data) {
    try {
      const response = await axios.post(baseURL, data);
      return response.data;
    } catch {
      throw new Error('Failed to add faculty');
    }
  },

  async editFaculty(id, updatedData) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, updatedData);
      return response.data;
    } catch {
      throw new Error('Failed to edit faculty');
    }
  }
};

export default facultyService;
```

---

## 6. faqService.js  
FAQ creation, editing, deletion, and listing

```javascript
import axios from 'axios';
const baseURL = '/api/faq';

const faqService = {
  async getAllFaq() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load FAQ data');
    }
  },

  async deleteFAQ(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete FAQ');
    }
  },

  async addFAQ(data) {
    try {
      const response = await axios.post(baseURL, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add FAQ');
    }
  },

  async getFaqByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch FAQ by ID');
    }
  },

  async editFAQ(id, data) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to edit FAQ');
    }
  }
};

export default faqService;
```

---

## 7. techBlogService.js  
Blog post submission and admin approval workflow

```javascript
import axios from 'axios';
const baseURL = '/api/tech-blog';

const techBlogService = {
  async getAllArticles() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Posts');
    }
  },

  async createArticle(data) {
    try {
      const response = await axios.post(baseURL, data);
      return response.data;
    } catch {
      throw new Error('Failed to create Blog Post');
    }
  },

  async getPendingArticles() {
    try {
      const response = await axios.get(`${baseURL}/pending`);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Posts');
    }
  },

  async deleteArticle(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete Blog Post');
    }
  },

  async approveArticle(id) {
    try {
      const response = await axios.put(`${baseURL}/approve/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to Approve Blog Post');
    }
  },

  async getArticleById(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Post');
    }
  },

  async editArticle(id, data) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data);
      return response.data;
    } catch {
      throw new Error('Failed to update Blog Post');
    }
  }
};

export default techBlogService;
```

---

## 8. studentHighlightService.js  
Student project highlight management

```javascript
import axios from 'axios';
const baseURL = '/api/student-highlights';

const studentHighlightService = {
  async getAllPosts() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Posts');
    }
  },

  async createPost(data) {
    try {
      const response = await axios.post(baseURL, data);
      return response.data;
    } catch {
      throw new Error('Failed to create Blog Post');
    }
  },

  async getPendingPosts() {
    try {
      const response = await axios.get(`${baseURL}/pending`);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Posts');
    }
  },

  async deletePost(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete Blog Post');
    }
  },

  async approvePost(id) {
    try {
      const response = await axios.put(`${baseURL}/approve/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to Approve Blog Post');
    }
  },

  async getPostById(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to load Blog Post');
    }
  },

  async editPost(id, data) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data);
      return response.data;
    } catch {
      throw new Error('Failed to edit post');
    }
  }
};

export default studentHighlightService;
```

---

## 9. sdFormService.js  
Server & database request form processing

```javascript
import axios from 'axios';
const baseURL = '/api/sd-forms';

const sdFormService = {
  async getAllForms() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load forms data');
    }
  },

  async addForm(formData) {
    try {
      const response = await axios.post(baseURL, formData);
      return response.data;
    } catch {
      throw new Error('Failed to add form');
    }
  },

  async deleteForm(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete form');
    }
  },

  async getForm(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to load form');
    }
  },

  async approveForm(id) {
    try {
      const response = await axios.post(`${baseURL}/${id}/approve`);
      return response.data;
    } catch {
      throw new Error('Failed to approve form');
    }
  },

  async createUser(email, nId) {
    try {
      const response = await axios.post('/api/students/createUser', { email, nId });
      return response.data;
    } catch {
      throw new Error('Failed to create user');
    }
  }
};

export default sdFormService;
```

---

## 10. resourceService.js  
Student resource creation and management

```javascript
import axios from 'axios';
const baseURL = '/api/student-resources';

const resourceService = {
  async getAllResources() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch {
      throw new Error('Failed to load resource data');
    }
  },

  async addResource(data) {
    try {
      const response = await axios.post(baseURL, data);
      return response.data;
    } catch {
      throw new Error('Failed to add resource');
    }
  },

  async deleteResource(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to delete resource');
    }
  },

  async editResource(id, data) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data);
      return response.data;
    } catch {
      throw new Error('Failed to update resource');
    }
  },

  async getResourceByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch resource by ID');
    }
  }
};

export default resourceService;
```

---

## 11. profileService.js  
User profile loading, updating, and avatar uploads

```javascript
import axios from 'axios';
const baseURL = '/api/profile';

export const profileService = {
  async getProfileByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch profile by ID');
    }
  },

  async getMyProfile() {
    try {
      const response = await axios.get(`${baseURL}/me`);
      return response.data;
    } catch {
      throw new Error('Failed to fetch your profile');
    }
  },

  async updateProfile(id, data) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async uploadAvatar(id, file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(`${baseURL}/${id}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data;
    } catch {
      throw new Error('Failed to upload profile picture');
    }
  }
};
```

---

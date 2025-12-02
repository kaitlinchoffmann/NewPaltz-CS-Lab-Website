# Profile Route

Express routes that handle all profile-related API requests. Imports two database functions getProfileById and updateProfile from the profileModel. The GET /:id route retrieves a user profile by its ID, logs useful debugging information, calls the database function, and returns the result as JSON. The PUT /:id route receives updated profile information from the request body, sends it to the database through updateProfile, and responds with a confirmation message.

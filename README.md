# SocialConnect API (Kalvium assignment)

## Overview
Small Express API to create and read social posts. Storage is a JSON file at `data/posts.json` (simple file-based persistence for the assignment).

## Endpoints
- `POST /api/posts`
  - Body JSON: `{ "content": "text", "author": "name", "tags": ["a","b"] }`
  - Validations:
    - `content` required, 1-280 characters
    - `author` required
    - `tags` optional array of strings, max 5 tags
  - Response: created post object

- `GET /api/posts`
  - Returns all posts as JSON array sorted newest-first (`createdAt` desc)

## Run locally
1. `npm install`
2. `npm start`
3. Server listens on `process.env.PORT || 3000`

## Test with curl
Create post:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \'
  -d '{"content":"Hello world","author":"Alice","tags":["intro","hello"]}'
```

Get posts:
```bash
curl http://localhost:3000/api/posts
```

## Deploy to Render (step-by-step)
1. Create a GitHub repository and push this project (all files & folders).
2. Go to https://render.com and log in / sign up.
3. Click **New +** → **Web Service**.
4. Connect your GitHub repo and choose the repo you pushed.
5. Configure:
   - Name: `social-api-[yourname]` (example: `Social-API-Mahesh`)
   - Environment: Node
   - Branch: main (or your branch)
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Click **Create Web Service**.
7. Wait for build & deploy to complete. Render will provide a URL like ` `.
8. Test endpoints with Postman / curl against the live URL:
   - `POST https://<your-service>.onrender.com/api/posts`
   - `GET https://<your-service>.onrender.com/api/posts`
9. Take screenshots for submission: Postman test showing 201 response, Render dashboard showing successful deploy, and the live API URL served. Replace the placeholder `screenshots.pdf` with your screenshots PDF before submitting.

## Notes / Error handling
- If `data/posts.json` is missing, the server will create it automatically.
- If `data/posts.json` is corrupted (invalid JSON), the API will return a 500 error telling you to fix or delete the file to reset.
- CORS is enabled so the provided frontend can fetch the API.

## Files included in this ZIP
- `server.js`
- `routes/posts.js`
- `package.json`
- `data/posts.json` (initially empty array)
- `README.md`
- `screenshots.pdf` (placeholder — replace with your actual screenshots)
- `.gitignore`
- `.env.example`

Good luck! If you want, I can also:
- Push this to a GitHub repository for you (I can't access your GitHub without auth, but I can provide the exact `git` commands to run).
- Help craft the Postman tests and exact screenshot checklist.

GitHub Link: https://github.com/maheshnagireddy3006/Social-API-Mahesh.git

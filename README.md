# Resume_Analyser

An intelligent web application that allows users to upload their resumes (PDF or DOCX), get detailed AI-powered feedback, and view a real-time preview of the analyzed resume. Built with React.js, Tailwind CSS, and a FastAPI backend integrated with Gemini AI and Cloudinary for file handling.

Features

📄 Upload resumes in PDF format

🤖 AI-generated feedback on resume content, formatting, and clarity

🖼️ Real-time preview of analyzed resume (via Cloudinary)

💾 Auto-save feedback linked with user accounts

🔐 Authentication system with secure session management

☁️ Cloud-based file storage (Cloudinary)

⚡ Fast and scalable backend using FastAPI and Uvicorn

## Screenshots


![Home Page](https://raw.githubusercontent.com/koushal78/Resume_Analyser/main/frontend/public/Screenshot%202025-11-10%20220140.png)

Upload Page

![Home Page](https://raw.githubusercontent.com/koushal78/Resume_Analyser/main/frontend/public/Screenshot%202025-11-10%20220213.png)

## Demo


<video width="600" controls>
  <source src="https://github.com/koushal78/Resume_Analyser/raw/main/frontend/public/Recording%202025-11-10%20221531.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>





## Deployment

To run frontend  

```bash
  npm run dev
```

To run Backend  

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file



`MONGO_URL `

`SESSION_SECRET`




`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`NODE_ENV `

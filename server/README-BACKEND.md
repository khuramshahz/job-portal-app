Backend notes:

- Resume uploads are stored in `server/uploads` and served at `/uploads/<filename>`.
- Apply endpoint expects `multipart/form-data` with field `resume` (file) and `jobId`, `coverLetter` fields.

Example cURL:

curl -X POST http://localhost:5000/api/applications \
  -H "Authorization: Bearer <token>" \
  -F "jobId=<job id>" \
  -F "coverLetter=I am interested" \
  -F "resume=@/path/to/resume.pdf"

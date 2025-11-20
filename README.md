How to Add a New Blog Post
Write the Post: Write your blog post in a text editor and save it as a Markdown file (e.g., my-security-post.md).
Upload to GitHub:
In your repo, click Add file > Upload files.
Upload your .md file (you can put it in a posts folder if you want to be organized, or just the root).
Click Commit changes.
Get the Link:
Click on the file you just uploaded in GitHub.
Click the Raw button (top right of the file view).
Copy the URL from your browser bar.
Update the Website:
Open constants.ts in GitHub and click the Edit (pencil) icon.
Scroll down to blogPosts: [...].
Add a new entry inside the brackets like this:
code
TypeScript
{
  id: "2", // Unique number
  title: "My New Security Post",
  excerpt: "A short summary of what this is about...",
  date: "December 20, 2023",
  readTime: "5 min read",
  tags: ["Security", "Cloud"],
  markdownUrl: "PASTE_YOUR_RAW_URL_HERE" 
},
Click Commit changes.

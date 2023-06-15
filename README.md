
# Breadit - A Modern Fullstack Reddit Clone 

Built with the Next.js App Router, TypeScript & Tailwind


![Thumbnail](https://uploadthing.com/f/6227b383-132b-4de8-8e0d-7c63b1ed16cd_thumbnail-Recovered-alt.png)


## Features

 - Infinite scrolling for dynamically loading posts
 - Authentication using NextAuth & Google
 - Custom feed for authenticated users
 - Advanced caching using [Upstash Redis](https://upstash.com/?utm_source=Josh2)
 - Optimistic updates for a great user experience
 - Modern data fetching using React-Query
 - A beautiful and highly functional post editor
 - Image uploads & link previews
 - Full comment functionality with nested replies
 - ... and much more


## Getting started

To get started with this project, run

```bash
  git clone -b starter-code https://github.com/joschan21/breadit.git
```

and copy these .env.example variables into a separate .env file:

```bash
DATABASE_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

REDIS_URL=
REDIS_SECRET=
```
and that's all you need to get started!


## Acknowledgements

- [Upstash Redis](https://upstash.com/?utm_source=Josh2)
- [Code with Antonio](https://www.youtube.com/@codewithantonio) for thumbnail design inspiration
- Shadcn's [Taxonomy respository](https://github.com/shadcn/taxonomy) for showcasing the post editor

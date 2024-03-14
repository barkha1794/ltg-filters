import { z } from "zod";
import { Heading, Para, SubHeading } from "../ui/text";

const postSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
);

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return postSchema.parse(data);
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <Heading>Posts</Heading>
      <ul className="flex flex-col gap-8">
        {posts.map(({ id, title, body }) => (
          <li key={id}>
            <SubHeading>{title}</SubHeading>
            <Para>{body}</Para>
          </li>
        ))}
      </ul>
    </main>
  );
}

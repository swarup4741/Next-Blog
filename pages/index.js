import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
    console.log(posts);
    return (
        <div>
            <Head>
                <title>My Next Blog</title>
            </Head>

            <div className="posts">
                {posts.map((post, idx) => (
                    <Post post={post} key={idx} />
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    // Get files from 'posts' dir

    const files = fs.readdirSync(path.join("posts"));

    // Get slug and front matter from posts

    const posts = files.map((file) => {
        // create slug

        const slug = file.replace(".md", "");

        // Get front matter

        const markdownWithMeta = fs.readFileSync(
            path.join("posts", file),
            "utf-8"
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter,
        };
    });

    return {
        props: {
            posts: posts.sort(sortByDate),
        },
    };
}

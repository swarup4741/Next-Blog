import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Link from "next/link";
import Image from "next/image";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function PostPage({
    frontmatter: { title, date, cover_image, image_dim },
    slug,
    content,
}) {
    const width = image_dim.split("x")[0];
    const height = image_dim.split("x")[1];
    return (
        <div style={{ marginTop: "90px" }}>
            <Link href="/" passHref>
                <a className="btn btn-back">Go Back</a>
            </Link>
            <div className="card-page">
                <h1 className="post-title">{title}</h1>
                <div className="post-date">Posted on {date}</div>
                <Image
                    src={cover_image}
                    alt="post image"
                    width={width}
                    height={height}
                    objectFit="cover"
                    objectPosition="center"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkWtpdDwADtgG7to+MOwAAAABJRU5ErkJggg=="
                />
                <div
                    className="post-body"
                    dangerouslySetInnerHTML={{
                        __html: marked(content, {
                            renderer: new marked.Renderer(),
                            highlight: (code, lang) => {
                                return hljs.highlight(code, {
                                    language: lang,
                                }).value;
                            },
                            pedantic: false,
                            gfm: true,
                            breaks: false,
                            sanitize: false,
                            smartLists: true,
                            smartypants: false,
                            xhtml: false,
                        }),
                    }}
                ></div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"));

    const paths = files.map((file) => ({
        params: {
            slug: file.replace(".md", ""),
        },
    }));

    console.log(paths);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join("posts", slug + ".md"),
        "utf-8"
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    };
}

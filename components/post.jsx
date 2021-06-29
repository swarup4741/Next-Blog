import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
    const width = post.frontmatter.image_dim.split("x")[0];
    const height = post.frontmatter.image_dim.split("x")[1];
    return (
        <div className="card">
            <Image
                src={post.frontmatter.cover_image}
                alt="post cover image"
                height={height}
                width={width}
                objectPosition="center"
                objectFit="cover"
                quality={50}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkWtpdDwADtgG7to+MOwAAAABJRU5ErkJggg=="
            />

            <div className="post-date">Posted on {post.frontmatter.date}</div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.excerpt}</p>
            <Link href={`/blog/${post.slug}`} passHref>
                <a className="btn">Read More</a>
            </Link>
        </div>
    );
}

import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className="container">
                <Link href="/">
                    <h1 style={{ fontSize: "26px", cursor: "pointer" }}>
                        Next Blog
                    </h1>
                </Link>
            </div>
        </header>
    );
}

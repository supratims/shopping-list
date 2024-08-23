import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex container flex-row p-24 justify-between">
            <Link href="/">Home</Link>
            <Link href="/logout">Logout</Link>
        </nav>
    );
}

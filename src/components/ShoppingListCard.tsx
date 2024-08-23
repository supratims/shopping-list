import Link from 'next/link';

interface ShoppingListCardProps {
    list: {
        id: string;
        title: string;
        items: Array<{ id: string; name: string; checked: boolean }>;
    };
}

export default function ShoppingListCard({ list }: ShoppingListCardProps) {
    return (
        <div className="card p-4">
            <Link href={`/lists/${list.id}`}>
                <div className="card">
                    <h2>{list.title}</h2>
                    <p>{list.items.length} items</p>
                </div>
            </Link>
        </div>
        
    );
}

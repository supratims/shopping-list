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
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8 py-3 w-40">
            <Link href={`/lists/${list.id}`}>
                <div className="px-4 py-2">
                    <h2>{list.title}</h2>
                    
                </div>
            </Link>
        </div>
        
    );
}

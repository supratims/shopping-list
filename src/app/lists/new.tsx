// pages/lists/new.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewListPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');

    const createList = () => {
        const newList = {
            id: Date.now().toString(),
            title,
            items: [],
            categories: []
        };
        const lists = JSON.parse(localStorage.getItem('shoppingLists') || "") || [];
        lists.push(newList);
        localStorage.setItem('shoppingLists', JSON.stringify(lists));
        router.push('/');
    };

    return (
        <div>
            <h1>Create New Shopping List</h1>
            <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="List Title"
            />
            <button onClick={createList}>Create List</button>
        </div>
    );
}

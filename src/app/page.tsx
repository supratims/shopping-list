"use client"

import { useState, useEffect } from 'react';
import ShoppingListCard from '../components/ShoppingListCard';

interface ShoppingList {
    id: string;
    title: string;
    items: Array<{ id: string; name: string; checked: boolean }>;
    categories: Array<{
        name: string;
        items: Array<{ id: string; name: string; checked: boolean }>;
    }>;
}

export default function HomePage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [newListName, setNewListName] = useState<string>('');

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem('shoppingLists') || '[]') as ShoppingList[];
        setShoppingLists(lists);
    }, []);

    const createNewList = () => {
        const listName = newListName.trim() !== '' ? newListName : `New List ${shoppingLists.length + 1}`;
        const newList: ShoppingList = {
            id: Date.now().toString(),
            title: listName,
            items: [],
            categories: []
        };
        const updatedLists = [...shoppingLists, newList];
        setShoppingLists(updatedLists);
        localStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
        setNewListName('');  // Clear the input field after creating the list
    };

    return (
        <div>
            <h1>Your Shopping Lists</h1>
            <div className="grid">
                {shoppingLists.map(list => (
                    <ShoppingListCard key={list.id} list={list} />
                ))}
            </div>
            <input 
                type="text" 
                value={newListName} 
                onChange={(e) => setNewListName(e.target.value)} 
                placeholder="Enter new list name" 
            />
            <button onClick={createNewList}>Create New List</button>
        </div>
    );
}

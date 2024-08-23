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
        <div className='container mx-auto px-2 text-center'>
            <h1 className='text-gray-800 font-bold text-2xl '>My Shopping Lists</h1>
            <div className="grid">
                {shoppingLists.map(list => (
                    <ShoppingListCard key={list.id} list={list} />
                ))}
            </div>
            <div className="flex mt-4 p-4 mx-auto justify-center items-center">
              <input 
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-4 leading-tight focus:outline-none"
                  type="text" 
                  value={newListName} 
                  onChange={(e) => setNewListName(e.target.value)} 
                  placeholder="Enter new list" 
              />
              <button className="text-sm font-medium text-blue-900 px-4" onClick={createNewList}>Add</button>
            </div>

        </div>
    );
}

"use client"
import { useState, useEffect } from 'react';
import Category from '../../../components/Category';

interface ShoppingList {
    id: string;
    title: string;
    items: Array<{ id: string; name: string; checked: boolean }>;
    categories: Array<{
        name: string;
        items: Array<{ id: string; name: string; checked: boolean }>;
    }>;
}

export default function ShoppingListPage({params}: {params : {id: string} }) {
    const id = params.id;
    const [list, setList] = useState<ShoppingList | null>(null);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>('');

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem('shoppingLists') || '[]') as ShoppingList[];
        const foundList = lists.find(l => l.id === id);
        setList(foundList || null);
        if (foundList) setNewTitle(foundList.title);
    }, [id]);

    const handleCheck = (itemId: string) => {
        if (!list) return;

        const updatedCategories = list.categories.map(category => ({
            ...category,
            items: category.items.map(item => 
                item.id === itemId ? { ...item, checked: !item.checked } : item
            ).sort((a, b) => Number(a.checked) - Number(b.checked))
        }));

        const updatedList = { ...list, categories: updatedCategories };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const addItemToCategory = (categoryName: string, itemName: string) => {
        if (!list) return;

        const updatedCategories = list.categories.map(category => {
            if (category.name === categoryName) {
                const newItem = {
                    id: Date.now().toString(),
                    name: itemName,
                    checked: false
                };
                return {
                    ...category,
                    items: [...category.items, newItem]
                };
            }
            return category;
        });

        const updatedList = { ...list, categories: updatedCategories };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const removeItemFromCategory = (categoryName: string, itemId: string) => {
        if (!list) return;

        const updatedCategories = list.categories.map(category => {
            if (category.name === categoryName) {
                return {
                    ...category,
                    items: category.items.filter(item => item.id !== itemId)
                };
            }
            return category;
        });

        const updatedList = { ...list, categories: updatedCategories };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const renameItemInCategory = (categoryName: string, itemId: string, newName: string) => {
        if (!list) return;

        const updatedCategories = list.categories.map(category => {
            if (category.name === categoryName) {
                return {
                    ...category,
                    items: category.items.map(item =>
                        item.id === itemId ? { ...item, name: newName } : item
                    )
                };
            }
            return category;
        });

        const updatedList = { ...list, categories: updatedCategories };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const addCategory = (name: string) => {
        if (!list) return;

        const newCategory = { name, items: [] };
        const updatedList = { ...list, categories: [...list.categories, newCategory] };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const removeCategory = (categoryName: string) => {
        if (!list) return;

        const updatedCategories = list.categories.filter(cat => cat.name !== categoryName);
        const updatedList = { ...list, categories: updatedCategories };
        setList(updatedList);
        updateListInStorage(updatedList);
    };

    const updateListInStorage = (updatedList: ShoppingList) => {
        const lists = JSON.parse(localStorage.getItem('shoppingLists') || '[]') as ShoppingList[];
        const updatedLists = lists.map(l => l.id === updatedList.id ? updatedList : l);
        localStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
    };

    const saveTitle = () => {
        if (list) {
            const updatedList = { ...list, title: newTitle };
            setList(updatedList);
            updateListInStorage(updatedList);
            setIsEditingTitle(false);
        }
    };

    if (!list) return <div>Loading...</div>;

    return (
        <div>
            {isEditingTitle ? (
                <div className='flex space-x-3'>
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                    />
                    <button className="btn btn-primary" onClick={saveTitle}>Save</button>
                    <button onClick={() => setIsEditingTitle(false)}>Cancel</button>
                </div>
            ) : (
                <div className='flex space-x-3'>
                    <h1>{list.title}</h1>
                    <button className="btn btn-primary"  onClick={() => setIsEditingTitle(true)}>Edit Title</button>
                </div>
            )}

            {list.categories.map(category => (
                <Category 
                    key={category.name} 
                    category={category} 
                    onCheck={handleCheck} 
                    removeCategory={removeCategory}
                    addItem={addItemToCategory}
                    removeItem={removeItemFromCategory}
                    renameItem={renameItemInCategory}
                />
            ))}
            <input 
                type="text" 
                placeholder="New Category Name" 
                onKeyDown={e => {
                    if (e.key === 'Enter') addCategory(e.target.value);
                }}
            />
        </div>
    );
}

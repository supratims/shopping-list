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
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
    

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem('shoppingLists') || '[]') as ShoppingList[];
        const foundList = lists.find(l => l.id === id);
        setList(foundList || null);
        if (foundList) setNewTitle(foundList.title);
        setNewCategoryName('');
    }, [id]);

    

    const handleCheck = (itemId: string) => {
        console.log("checked ", itemId);
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
        if (!name) return;
        if (!list) return;

        const newCategory = { name, items: [] };
        const updatedList = { ...list, categories: [...list.categories, newCategory] };
        setList(updatedList);
        updateListInStorage(updatedList);
        setNewCategoryName('');
        setIsAddingCategory(false);
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
        if (!newTitle){
            return false;
        }
        if (list) {
            const updatedList = { ...list, title: newTitle };
            setList(updatedList);
            updateListInStorage(updatedList);
            setIsEditingTitle(false);
        }
    };

    const deleteList = (id: string) => {
        if (!list) return;
        
        setIsEditingTitle(false);
    }

    if (!list) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            {isEditingTitle ? (
                <div className='flex items-center px-4 py-2'>
                    <div className="flex justify-between border-b-2 border-teal-400 py-2">
                        <input 
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-4 leading-tight focus:outline-none"
                            type="text" 
                            value={newTitle} 
                            onChange={(e) => setNewTitle(e.target.value)} 
                        />
                        <button 
                            className="rounded rounded-full flex-shrink-0 bg-teal-600 hover:bg-teal-400 border-teal-600 
                                hover:border-teal-500 text-sm border-2 text-white py-1 px-2" onClick={saveTitle}>Save</button>
                        <button 
                            className="ml-2 rounded rounded-full flex-shrink-0 hover:bg-red-600 border-red-600 
                                hover:border-teal-600 text-sm border-2 text-red-600 py-1 px-2" onClick={e => deleteList(list.id)}>Delete</button>

                    </div>
                </div>

            ) : (
                <div className='flex space-x-3 px-5'>
                    <h3 className="text-lg font-bold text-gray-900" onClick={() => setIsEditingTitle(true)}>{list.title}</h3>
                </div>
            )}

            {list.categories.map(category => (
                <div className="divide-y divide-gray-200 px-4">
                    <Category 
                        key={category.name} 
                        category={category} 
                        onCheck={handleCheck} 
                        removeCategory={removeCategory}
                        addItem={addItemToCategory}
                        removeItem={removeItemFromCategory}
                        renameItem={renameItemInCategory}
                    />
                </div>

            ))}
            <div className="flex p-4 m-4 justify-center">
                {isAddingCategory ? (
                    <>
                        <input 
                            type="text" 
                            value={newCategoryName} 
                            placeholder="New Category Name" 
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            onChange={(e) => setNewCategoryName(e.target.value)} 
                            onKeyDown={e => {
                                if (e.key === 'Enter') addCategory(newCategoryName);
                            }}
                        />
                        <button className="text-sm text-blue-700" onClick={e => {addCategory(newCategoryName)}}>Save</button>
                    </>
                ) : (
                    <div className="">
                        <button className="text-lg text-blue-900 font-bold" onClick={e => setIsAddingCategory(true)}>Add New</button>
                    </div>
                )}
            </div>

        </div>
    );
}

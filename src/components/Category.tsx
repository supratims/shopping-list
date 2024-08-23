import { useState } from 'react';
import ShoppingListItem from './ShoppingListItem';

interface CategoryProps {
    category: {
        name: string;
        items: Array<{ id: string; name: string; checked: boolean }>;
    };
    onCheck: (id: string) => void;
    removeCategory: (name: string) => void;
    addItem: (categoryName: string, itemName: string) => void;
    removeItem: (categoryName: string, itemId: string) => void;
    renameItem: (categoryName: string, itemId: string, newName: string) => void;
}

export default function Category({ category, onCheck, removeCategory, addItem, removeItem, renameItem }: CategoryProps) {
    const [newItem, setNewItem] = useState<string>('');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            addItem(category.name, newItem);
            setNewItem('');  // Clear the input field after adding
        }
    };

    return (
        <div className="category px-3 py-3">
            <div className="flex space-x-4 justify-between">
                <h3 className='text-lg font-medium'>{category.name}</h3>
                <button className='text-sm font-light text-gray-500 float-right' onClick={() => removeCategory(category.name)}>Delete</button>
            </div>
            
            <div className="flex flex-col space-y-2 pl-4">
                {category.items.map(item => (
                    <ShoppingListItem 
                        key={item.id} 
                        item={item} 
                        onCheck={onCheck} 
                        removeItem={() => removeItem(category.name, item.id)}
                        renameItem={(newName) => renameItem(category.name, item.id, newName)}
                    />
                ))}
            </div>
            <div className="flex items-center border-b-2 border-teal-500 py-2">
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)} 
                    placeholder="Add new item" 
                />
                <button onClick={handleAddItem} className="rounded-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-3 rounded"
                        type="button">
                            Add
                        </button>
            </div>

            
            
        </div>
    );
}

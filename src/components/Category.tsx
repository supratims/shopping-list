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
            <div className="flex space-x-4">
                <h3>{category.name}</h3>
                <button onClick={() => removeCategory(category.name)}>Remove Category</button>
            </div>
            
            <div className="flex flex-col space-y-4">
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
            <div className="pl-4 flex space-x-4">
                <input 
                    type="text" 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)} 
                    placeholder="Add new item" 
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            
            
        </div>
    );
}

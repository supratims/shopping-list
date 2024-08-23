import { useState } from 'react';

interface ShoppingListItemProps {
    item: {
        id: string;
        name: string;
        checked: boolean;
    };
    onCheck: (id: string) => void;
    removeItem: () => void;
    renameItem: (newName: string) => void;
}

export default function ShoppingListItem({ item, onCheck, removeItem, renameItem }: ShoppingListItemProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(item.name);

    const handleRename = () => {
        if (newName.trim() !== '') {
            renameItem(newName);
            setIsEditing(false);
        }
    };

    return (

        
        <div className="flex items-center justify-between">

            {isEditing ? (
                <>
                    
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button className='text-sm text-indigo-500' onClick={handleRename}>Save</button>
                </>
            ) : (
                <>
                    <div className='flex items-center '>
                        <input className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={() => onCheck(item.id)} 
                        />
                        <div onClick={() => setIsEditing(true)}><span className='ml-3 block text-gray-900'>{item.name}</span></div>
                    </div>
                    <div>
                        <button className='text-sm text-gray-500 ml-1' onClick={removeItem}>Delete</button>
                    </div>

                </>
            )}
            
        </div>
    );
}


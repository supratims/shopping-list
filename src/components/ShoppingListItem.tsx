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
        <div className="p-2">
            <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => onCheck(item.id)} 
            />
            {isEditing ? (
                <>
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <button onClick={handleRename}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{item.name}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={removeItem} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
    );
}

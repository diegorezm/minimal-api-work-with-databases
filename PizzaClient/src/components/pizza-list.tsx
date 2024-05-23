import React, { useState } from "react";
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import PizzaInterface from "../models/pizza-interface";

type Props = {
  data: PizzaInterface[]
  name: string
  handleCreate: (p: PizzaInterface) => void
  handleUpdate: (p: PizzaInterface) => void
  handleDelete: (id: number) => void
}
export default function PizzaList({ data, name, handleCreate, handleDelete, handleUpdate }: Props) {
  const [formData, setFormData] = useState<PizzaInterface>({ id: 0, name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState(null)

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId) {
      handleUpdate(formData);
      setEditingId(null);
    } else {
      handleCreate(formData);
    }
    setFormData({ id: 0, name: '', description: '' });
  };

  const handleEdit = (item: PizzaInterface) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
  };

  return (
    <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{name}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} />
        <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} />
        <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
        {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>}
      </form>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {data.map(item => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
      {error && <p>{error}</p>}
    </Box>
  )
}
import { useEffect, useState } from 'react'
import './App.css'
import PizzaInterface from './models/pizza-interface';
import PizzaList from './components/pizza-list';

function App() {

  const [data, setData] = useState<PizzaInterface[]>([]);
  const [maxId, setMaxId] = useState(0);

  const fetchPizzaData = () => {
    const pizzaData: PizzaInterface[] = [
      { id: 1, name: 'Margherita', description: 'Tomato sauce, mozzarella, and basil' },
      { id: 2, name: 'Pepperoni', description: 'Tomato sauce, mozzarella, and pepperoni' },
      { id: 3, name: 'Hawaiian', description: 'Tomato sauce, mozzarella, ham, and pineapple' },
    ];
    setData(pizzaData);
    setMaxId(Math.max(...pizzaData.map(pizza => pizza.id)));
  };
  
  useEffect(() => {
    fetchPizzaData()
  }, [])

  const handleCreate = (item: PizzaInterface) => {
    // Simulate creating item on API
    const newItem = { ...item, id: data.length + 1 };
    setData([...data, newItem]);
    setMaxId(maxId + 1);
  };

  const handleUpdate = (item: PizzaInterface) => {
    const updatedData = data.map(pizza => pizza.id === item.id ? item : pizza);
    setData(updatedData);
  };

  const handleDelete = (id: number) => {
    // Simulate deleting item on API
    const updatedData = data.filter(pizza => pizza.id !== id);
    setData(updatedData);
  };


  return (
    <>
      <PizzaList
        data={data}
        name='Pizza'
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate} />
    </>
  )
}

export default App

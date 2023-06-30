import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import Food from '../../components/Food';

interface FoodProps {
    image: string,
    name: string;
    description: string;
    price: number;
    id: string;
}


function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>({
    description: '',
    id: '',
    image: '',
    price: 0,
    name: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(()=>{
    async function fecthData(){
      const response = await api.get('/foods');
      setFoods(response.data)
    }
    fecthData()
  },[])

 const handleAddFood = async (food: Partial<FoodProps> )=> {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods((state) => [...state, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: string) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
   setModalOpen((state) => !state)
  }

 const toggleEditModal = () => {

  setEditModalOpen((state) => !state)

  }

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }


    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
             
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
         
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
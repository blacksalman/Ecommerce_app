import { useState ,useEffect} from 'react';
import styled from 'styled-components'
// import { popularProducts } from '../data';
import Product from './Product';
import axios from 'axios';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [porducts, setProducts] = useState([]);
  const [filteredPorducts, setFilteredProducts] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${BASE_URL}/products?category=${cat}`
            : `${BASE_URL}/products`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

   useEffect(()=>{
     cat && setFilteredProducts(
      porducts.filter((item) => Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)
        )
       )
     );

   },[porducts , cat, filters]);

   useEffect(()=>{
    if((sort === 'newest')) {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b)=> a.createdAt - b.createdAt)
      );
    } else if((sort === 'asc')) {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b)=> a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b)=> b.price - a.price)
      );
    } 

   },[sort])
  return (
    <Container>
        {cat ? filteredPorducts.map(item=>(
            <Product item={item} key={item.id}/>
        )) : porducts.slice(0,6).map(item=>(
          <Product item={item} key={item.id}/>
      ))}
    </Container>
  )
}

export default Products
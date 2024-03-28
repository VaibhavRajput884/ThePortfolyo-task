import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './indexStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import ServiceCards from '../Cards/ServicesCard'
import TestimonialCard from '../Cards/TestimonialCard'


const Testimonails = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');

  const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data.user.testimonials);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }, []);

  return (
    <Container id="testimonials">
      <Wrapper>
        <Title>Testimonials</Title>
        <Desc>
          See what people say about us!
        </Desc>
        <br />
        <CardContainer>
          {toggle === 'all' && userData
            .map((project) => (
              <TestimonialCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {userData
            .filter((item) => item.category == toggle)
            .map((project) => (
              <TestimonialCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Testimonails
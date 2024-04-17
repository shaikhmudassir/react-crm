import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div<{ isDragging: boolean }>`
border: 1px solid lightgrey;
border-radius: 4px;
padding: 12px;
margin-bottom: 12px;
background-color: ${props => (props.isDragging ? '#e6f7ff' : 'white')};
box-shadow: ${props =>
  props.isDragging ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
transition: background-color 0.2s ease, box-shadow 0.2s ease;

&:hover {
  background-color: #f0f0f0;
}
`;

export const Task = (props: any) => {
  // return {<Container>{props.task.name}</Container>}
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.name}
        </Container>
      )}
    </Draggable>
  );
};

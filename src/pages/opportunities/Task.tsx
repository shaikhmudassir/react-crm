import React from 'react';
import styled, {css} from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div<{ isDragging: boolean }>`
background-color: white;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
padding: 16px;
transition: transform 0.2s ease, box-shadow 0.2s ease;

&:hover {
  transform: translateY(-4px);
}

${props =>
  props.isDragging &&
  css`
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  `}
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

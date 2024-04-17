import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};

`;

export const KanbanColumn = (props: any) => {
  return (
    <Container>
      <Title>{props.column?.title}</Title>
      <Droppable droppableId={props.column?.id}>
        {(provided, snapshot) => (
          <TaskList 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            >
            {props.tasks?.map((opp: any, index: any) => (
              <Task key={opp.id} task={opp} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

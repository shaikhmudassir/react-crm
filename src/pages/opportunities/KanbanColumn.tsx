import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
border: 2px dashed ${props => (props.isDraggingOver ? '#1890ff' : 'transparent')};
  border-radius: 1px;
  padding: 12px;
  background-color: white;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #1890ff;
  }
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

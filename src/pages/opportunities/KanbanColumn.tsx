import React from 'react';
import styled, {css} from 'styled-components';
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

const ColumnHeader = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px 8px 0 0;
  padding: 12px 16px;
  font-weight: bold;
  color: #333333;
  border-bottom: 2px solid #cccccc;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
border: 2px solid transparent;
border-radius: 8px;
padding: 16px;
background-color: #ffffff;
transition: border-color 0.2s ease;

&:hover {
  border-color: #1890ff;
}

${props =>
  props.isDraggingOver &&
  css`
    border-color: #1890ff;
  `}
`;

export const KanbanColumn = (props: any) => {
  return (
    <Container>
      <ColumnHeader>{props.column?.title}</ColumnHeader>
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

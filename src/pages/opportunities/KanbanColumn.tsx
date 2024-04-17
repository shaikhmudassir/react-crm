import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export const KanbanColumn = (props:any)=> {
    return (
      <Container>
        <Title>{props.column?.title}</Title>
        <TaskList>
          {props.tasks?.map((opp:any) => <Task key={opp.id} task={opp} />)}
        </TaskList>
      </Container>
    );
}

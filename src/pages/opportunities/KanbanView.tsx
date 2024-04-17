import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { KanbanColumn } from './KanbanColumn';
import styled from 'styled-components';

const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;
padding: 20px;
background-color: #f5f5f5;
`;

interface KANBANVIEW {
  data: any;
}
interface KANBANDATA {
  opportunities: any;
  stages: any;
}
const KanbanBoard = (props: KANBANVIEW) => {
  const { data } = props;
  // const [columnNames, setColumnNames] = useState<string[]>([]);
  const [formattedData, setFormattedData] = useState<KANBANDATA>({
    opportunities: {},
    stages: {},
  });
  const columnOrder = [
    'NEEDS ANALYSIS',
    'VALUE PROPOSITION',
    'QUALIFICATION',
    'CLOSED WON',
  ];
  useEffect(() => {
    if (data) {
      const result = data.reduce(
        (acc: any, opportunity: any) => {
          // Add opportunity to the opportunities object
          acc.opportunities[opportunity.id] = opportunity;

          // Update stages object
          if (!acc.stages[opportunity.stage]) {
            acc.stages[opportunity.stage] = {
              id: opportunity.stage,
              title: opportunity.stage,
              oppIds: [opportunity.id],
            };
            // setColumnNames(prevState => [...prevState, opportunity.stage])
          } else {
            acc.stages[opportunity.stage]['oppIds'].push(opportunity.id);
          }
          return acc;
        },
        { opportunities: {}, stages: {} }
      );
      console.log('result->', result);
      setFormattedData(result);
    }
  }, [data]);
  const dragEnd = () => {};
  return (
    <Container>
      <DragDropContext onDragEnd={dragEnd}>
        {columnOrder &&
          columnOrder.map((stageName) => {
            const stageObj = formattedData?.stages[stageName];
            const opportunities = stageObj?.oppIds.map(
              (oppId: any) => formattedData.opportunities[oppId]
            );
            // console.log("all-one->",opportunities);
            return (
              <KanbanColumn
                key={stageObj?.id}
                column={stageObj}
                tasks={opportunities}
              />
            );
          })}
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;

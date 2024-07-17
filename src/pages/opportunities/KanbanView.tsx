import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { KanbanColumn } from './KanbanColumn';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;
padding: 20px;
background-color: #f5f5f5;
width: 100%;
overflow-x: scroll;
white-space: nowrap;
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
    [
      "Enquiry Received",
      "Enquiry Received"
    ],
    [
      "Qualification",
      "Qualification"
    ],
    [
      "Quotation Sent",
      "Quotation Sent"
    ],
    [
      "Negotiation/Review",
      "Negotiation/Review"
    ],
    [
      "Closed Won",
      "Closed Won"
    ],
    [
      "Closed Lost",
      "Closed Lost"
    ],
    [
      "Closed-Lost to Competition",
      "Closed-Lost to Competition"
    ]
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
            const stageObj = formattedData?.stages[stageName[0]];
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

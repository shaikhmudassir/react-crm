import React from 'react';
import styled, { css } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

const Container = styled.div<{ isDragging: boolean }>`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${props =>
    props.isDragging &&
    css`
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    `}
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
`;

export const Task = (props: any) => {
  const { name, id, amount, created_at, created_by, created_on_arrow } = props.task;
  const formattedDate = new Date(created_at).toLocaleDateString();
  const navigate = useNavigate();
  const editHandle = (opportunityDetails:any) => {
    // navigate('/contacts/edit-contacts', { state: { value: contactDetails, address: newAddress } })
    // let country: string[] | undefined;
    // for (country of countries) {
    //     if (Array.isArray(country) && country.includes(opportunityDetails?.country || '')) {
    //         const firstElement = country[0];
    //         break;
    //     }
    // }
    navigate('/app/opportunities/edit-opportunity', {
      state: {
        value: {
          name: opportunityDetails?.name,
          account: opportunityDetails?.account?.id,
          amount: opportunityDetails?.amount,
          currency: opportunityDetails?.currency,
          stage: opportunityDetails?.stage,
          teams: opportunityDetails?.teams,
          lead_source: opportunityDetails?.lead_source,
          probability: opportunityDetails?.probability,
          description: opportunityDetails?.description,
          assigned_to: opportunityDetails?.assigned_to,
          contact_name: opportunityDetails?.contact_name,
          due_date: opportunityDetails?.closed_on,
          tags: opportunityDetails?.tags,
          opportunity_attachment: opportunityDetails?.opportunity_attachment,
      }, id: opportunityDetails?.opportunityId,
      contacts: opportunityDetails?.contacts || [], leadSource: opportunityDetails?.leadSource || [], currency: opportunityDetails?.currency || [], tags: opportunityDetails?.tags || [], account: opportunityDetails?.account || [], stage: opportunityDetails?.stage || [], users: opportunityDetails?.users || [], teams: opportunityDetails?.teams || [], countries: opportunityDetails?.countries || []
      }
     }
    )
}
  const opportunityDetail = (opportunityId: any) => {
    navigate(`/app/opportunities/opportunity-details`, {
      state: {
        opportunityId,
        detail: true
      }
    });
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={() => opportunityDetail(id)}
        >
          <Title>{name}</Title>
          <Subtitle>
            <strong>Amount:</strong> {amount}
          </Subtitle>
          <Subtitle>
            <strong>Created By:</strong> {created_by.email}
          </Subtitle>
          <Subtitle>
            <strong>Created On:</strong> {formattedDate}
          </Subtitle>
        </Container>
      )}
    </Draggable>
  );
};

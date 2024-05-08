import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.common.primaryColor};
  padding-bottom: 2pc;
  height: 100%;
`;

type LeadDetailsSectionProps = {
  leadDetails: any;
};

export default function LeadDetailsSection(props: LeadDetailsSectionProps) {
  const { leadDetails } = props;

  return (
    <Wrapper>

    </Wrapper>
  );
}

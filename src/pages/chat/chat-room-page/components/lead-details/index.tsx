import { Grid, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Heading, HeadingWrapper } from '../profile/styles';

export const Wrapper = styled.div`
  background: ${(props) => props.theme.common.primaryColor};
  padding-bottom: 2pc;
  height: 100%;
  padding: 16px; /* Add padding here */
`;

const HorizontalRuler = styled.hr`
  margin-top: 16px; /* Add margin-top to create space */
  margin-bottom: 16px; /* Add margin-bottom for consistency */
`;

type LeadDetailsSectionProps = {
  leadDetails: any;
};

export default function LeadDetailsSection(props: LeadDetailsSectionProps) {
  const { leadDetails } = props;
  const [formData, setFormData] = useState({ ...leadDetails });
  const handleChange = useCallback(
    (field: any) => (e: any) => {
      setFormData({ ...formData, [field]: e.target.value });
    },
    [formData]
  );

  return (
    <Wrapper>
      {leadDetails && (
        <LeadDetailsForm formData={leadDetails} handleChange={handleChange} />
      )}
    </Wrapper>
  );
}
interface ILEADDETAILSFORM {
  formData: any;
  handleChange: (fieldName: string) => void;
}
const LeadDetailsForm = (props: ILEADDETAILSFORM) => {
  const { formData, handleChange } = props;
  return (
    <>
      <HeadingWrapper>
        <Heading>Contact Info</Heading>
      </HeadingWrapper>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              value={`${formData.first_name} ${formData.last_name}`}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone || ''}
              onChange={() => handleChange('phone')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Country"
              value={formData.country || ''}
              onChange={() => handleChange('country')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email || ''}
              onChange={() => handleChange('email')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Status"
              value={formData.status || ''}
              onChange={() => handleChange('status')}
            />
          </Grid>
        </Grid>
        <HorizontalRuler />
        <Typography variant="h6" gutterBottom>
          Company Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Industry"
              value={formData.industry || ''}
              onChange={() => handleChange('industry')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Company"
              value={formData.company || ''}
              onChange={() => handleChange('company')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Organization"
              value={formData.organization || ''}
              onChange={() => handleChange('organization')}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

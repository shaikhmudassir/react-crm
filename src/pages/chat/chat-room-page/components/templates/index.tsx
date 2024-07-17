// import Icon from "common/components/icons";
import { IconBase } from "react-icons";
import {
  AboutItem,
  ActionSection,
  ActionText,
  Avatar,
  AvatarWrapper,
  Heading,
  HeadingWrapper,
  MediaButton,
  MediaImage,
  MediaImagesWrapper,
  PersonalInfo,
  Section,
  Wrapper,
} from "./../profile/styles";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  Checkbox
} from '@mui/material';
import { useState } from "react";
import { sampleTemplateDetails } from "../../../../template/types";
type TemplatesSectionProps = {
  onSend:(template:any)=> void
};
const templates = sampleTemplateDetails.filter((i)=>i.status==='approved');
export default function TemplatesSection(props: TemplatesSectionProps) {
  const { onSend } = props;
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleCheckboxChange = (template:any) => {
    setSelectedTemplate(selectedTemplate === template ? null : template);
  };

  const handleSend = () => {
    if (selectedTemplate) {
      onSend(selectedTemplate);
    }
  };
  return (
    <Wrapper>
      
      <Section>
      <Box>
      <List>
        {templates.map((template, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Checkbox
              checked={selectedTemplate === template}
              onChange={() => handleCheckboxChange(template)}
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1">{template.name}</Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {template.messageBody}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={!selectedTemplate}
        >
          Send
        </Button>
      </Box>
    </Box>
      </Section>
    </Wrapper>
  );
}

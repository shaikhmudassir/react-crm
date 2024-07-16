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

type TemplatesSectionProps = {
  name: string;
  image: string;
};

export default function TemplatesSection(props: TemplatesSectionProps) {
  const { name, image } = props;

  return (
    <Wrapper>
      <Section>
        Templates here
      </Section>
    </Wrapper>
  );
}

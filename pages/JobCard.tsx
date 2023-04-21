import { rem, Card, Text } from '@mantine/core';

export type JobCardData = {
  'title': string;
  'description': string;
  'contact': string;
  'time-committment': string;
  'minimum-commitment': string;
  'start-date': string;
  'number-of-people-to-fill-this-role': string;
  'applicant-characteristics': string;
  'link': string;
};

type JobCardProps = {
  data: JobCardData;
  color: string;
};

export default function JobCard({ data, color }: JobCardProps) {
  return(
    <Card
      component="a"
      href={data.link}
      target="_blank"
      sx={{ backgroundColor: `${color}` }}
    >
      <Text weight={500} size="lg" mb="md">
        {data.title}
      </Text>
      <Text size="sm" color="dimmed" lineClamp={10}>
        {data.description}
      </Text>
    </Card>
  );
}

JobCard.defaultProps = {
  data: {
    'title': "",
    'description': "",
    'contact': "",
    'time-committment': "",
    'minimum-commitment': "",
    'start-date': "",
    'number-of-people-to-fill-this-role': "",
    'applicant-characteristics': "",
    'link': ""
  },
  color: "darkBlue",
};

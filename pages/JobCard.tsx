import { Badge, Button, Card, Text } from '@mantine/core';

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
};

export default function JobCard({ data }: JobCardProps) {
  return(
    <Card>
      <Badge>{data.title}</Badge>
      <Text>{data.description}</Text>
      <Button>{data.link}</Button>
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
  }
};

import { createStyles, Card, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  text_title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8],
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.dark[8],
  },
}));

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
  const { classes } = useStyles();
  return(
    <Card
      component="a"
      href={data.link}
      target="_blank"
      radius="md"
      sx={{ backgroundColor: `${color}` }}
    >
      <Text className={classes.text_title} weight={500} size="lg" mb="md">
        {data.title}
      </Text>
      <Text className={classes.text}  size="sm" lineClamp={10}>
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

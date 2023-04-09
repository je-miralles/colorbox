import { Card, Text, Group } from '@mantine/core';

export type JobCardData = {
    'title': string;
    'description': string;
    'contact': string;
    'time-committment': string;
    'minimum commitment': string;
    'start date': string;
    'number of people to fill this role': string;
    'applicant-characteristics': string;
    'Link to more details': string;
};

type JobCardProps = {
    data: JobCardData;
};

export default function JobCard({ data }: JobCardProps) {
    return (
        <Card>{data.title}</Card>
    );
}

JobCard.defaultProps = {
    data: {
        'title': "",
        'description': "",
        'contact': "",
        'time-committment': "",
        'minimum commitment': "",
        'start date': "",
        'number of people to fill this role': "",
        'applicant-characteristics': "",
        'Link to more details': ""
    }
};

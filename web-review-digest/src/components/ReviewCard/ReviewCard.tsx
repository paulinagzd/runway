import React from "react"
import { Typography, Card, Rate, Col } from 'antd';
const { Title, Text } = Typography;

type Props = {
  title: string
  content: string
  author: string
  rating: number
  timestamp: string
}

const ReviewCard = (p: Props) => {
  const {
    title,
    content,
    author,
    rating,
    timestamp,
  } = p;
  return (
    <Col span={8}>
      <Card
        className="card"
        title={(
          <>
            <Rate value={rating} />
            <Title ellipsis>{title}</Title>
            <Title level={3}>{author}</Title>
          </>
        )}
      >
        <Text>{content}</Text>
        <Text type="secondary">
          {new Date(timestamp).toLocaleDateString("en-US")}
        </Text>
      </Card>
    </Col>
  );
};

export default ReviewCard;

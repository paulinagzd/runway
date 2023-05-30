import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCard from '../components/ReviewCard/ReviewCard';

const exampleProps = {
  title: 'Title',
  content: 'Content',
  author: 'Author',
  rating: 5,
  timestamp: '5/29/2023',
}

test('renders card with expected attributes', () => {
  render(<ReviewCard{...exampleProps} />);
  const titleText = screen.getByText(exampleProps.title);
  const contentText = screen.getByText(exampleProps.content);
  const authorText = screen.getByText(exampleProps.author);
  const timestampText = screen.getByText(exampleProps.timestamp);

  expect(titleText).toBeInTheDocument();
  expect(contentText).toBeInTheDocument();
  expect(authorText).toBeInTheDocument();
  expect(timestampText).toBeInTheDocument();
  expect(titleText).toBeInTheDocument();
});

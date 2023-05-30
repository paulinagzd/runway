import React, {FC, useState, useEffect } from "react"
import { Row, Empty } from 'antd';
import ReviewCard from "../ReviewCard/ReviewCard";
import './Feed.css'

const endpoint: string = 'http://localhost:8080/reviews'

interface FieldDetail {
  label: string
}

interface CardFields {
  id: FieldDetail
  title: FieldDetail
  content: FieldDetail
  author: {
    [name: string]: FieldDetail
  }
  [`im:rating`]: FieldDetail
  updated: FieldDetail
}

const Feed: FC = () => {
  const [todayDate, setTodayDate] = useState<any>(localStorage.getItem('todayDate') ? localStorage.getItem('todayDate') : '')
  const [reviews, setReviews] = useState<any>(localStorage.getItem('reviews')  ? localStorage.getItem('reviews') : []);

  useEffect (() => {
    const fetchReviews = async () => {
      const response: Response = await fetch(endpoint, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
      }
      );

      const newData = await response.json();

      // returns data only from the specified date (today)
      const filteredData = newData.feed.entry.filter((d: any) => {
        // most reviews will show up empty for the reviews of the day
        // to change it to a specific date when there were submitted reviews,
        // change the second part to the desired date
        return new Date(d["updated"]["label"]).toLocaleDateString("en-US") === localStorage.getItem('todayDate');
      });

      setReviews({"feed": {"entry": filteredData}});
      localStorage.setItem('reviews', JSON.stringify({"feed": {"entry": filteredData}}))
    }
    
    // fetching reviews every different day
    if (todayDate !== new Date().toLocaleDateString("en-US")) {
      fetchReviews()
      localStorage.setItem('todayDate', new Date().toLocaleDateString("en-US"))
      setTodayDate(new Date().toLocaleDateString("en-US"))
    }  
  }, [todayDate])

  return (
    <div className="container">
      <Row
        justify="center"
        align="middle"
        style={{minHeight: '100vh'}}
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 }
        ]}
      >
        { 
          reviews && reviews.feed && reviews.feed.entry.length > 0 ? (
            reviews.feed.entry.map(({id, title, content, author, updated, 'im:rating': rating}: CardFields) => {
              return (
                <ReviewCard
                  key={id.label}
                  title={title.label}
                  content={content.label}
                  author={author.name.label}
                  rating={parseInt(rating.label)}
                  timestamp={updated.label}
                />
              )
            })
          ) : <Empty data-testid="empty"/>
        }
      </Row>
    </div>
  );
};

export default Feed;

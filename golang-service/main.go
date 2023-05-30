package main

import (
	"fmt"
	"time"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	router := gin.Default()

	// CORS config to avoid front-end errors
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST"}
	config.AllowHeaders = []string{"Content-Type"}

	router.Use(cors.New(config))

	// get reviews
	router.GET("/reviews", getReviews)

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}

	fmt.Println(srv.ListenAndServe())
}

type review struct {
	Feed struct {
		EntriesList []struct {
			ID struct {
				Label string `json:"label"`
			} `json:"id"`
			Title struct {
				Label string `json:"label"`
			} `json:"title"`
			Content struct {
				Label string `json:"label"`
			} `json:"content"`
			Author struct {
				Name struct {
					Label string `json:"label"`
				} `json:"name"`
			} `json:"author"`
			Rating struct {
				Label string `json:"label"`
			} `json:"im:rating"`
			Timestamp struct {
				Label string `json:"label"`
			} `json:"updated"`
		} `json:"entry"`
	} `json:"feed"`
}

// Function that gathers all reviews of specified JSON (currently only reading page 1 of app reviews)
func getReviews(c *gin.Context) {
	// Sleep Cycle App Example
	response, err := http.Get("https://itunes.apple.com/us/rss/customerreviews/id=320606217/sortBy=mostRecent/page=1/json")
	if err != nil {
			fmt.Println(err)
			return
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err)
	}

	// returns a structured array of objects for easier handling
	jsonString := []byte(body)
	var tempReviews review
	err2 := json.Unmarshal(jsonString, &tempReviews)
	if err2 != nil {
		fmt.Println(err2)
		return
	}

	c.IndentedJSON(http.StatusOK, tempReviews)
}

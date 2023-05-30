# README.md
## Running Server
(_Service used Gin for HTTP requests as well as CORS config._)
1. Install dependencies
	`go get .`

2. Start the application
	`go run .`

## Running Client
1. Install dependencies
	`npm install`

2. Start the application
	`npm start`

## Examples
#### Rendering all reviews
<img width="1440" alt="Screenshot 2023-05-30 at 10 21 48" src="https://github.com/paulinagzd/runway/assets/31547357/bbbcb239-07d9-470a-917e-21673c4398f7">

#### Rendering review from specific days
<img width="1440" alt="Screenshot 2023-05-30 at 10 23 52" src="https://github.com/paulinagzd/runway/assets/31547357/dc31a9fe-23ec-4129-87b7-bc6fd7068e48">
<img width="1046" alt="Screenshot 2023-05-30 at 10 36 25" src="https://github.com/paulinagzd/runway/assets/31547357/f39e6e0d-30bf-44b6-8dce-6832daf2d0bf">
<img width="1360" alt="Screenshot 2023-05-30 at 10 43 53" src="https://github.com/paulinagzd/runway/assets/31547357/2a543f36-2581-43bd-8650-a5b46c3e1a21">

#### Renders empty component
<img width="902" alt="Screenshot 2023-05-30 at 8 44 19" src="https://github.com/paulinagzd/runway/assets/31547357/ca455d6b-07ad-49c0-8e86-0efce8a2ccbd">

### Obstacles
1. A dreaded triple-threat on my machine (no proper setup for web/mobile dev in this laptop, storage too full for a software update and the re-downloading of dev tools on the limited storage). I’m used to long setup processes on work laptops and using my personal computer for one took more time than I’d like, making my delivery a bit later than I would have wanted.
2. Started out on mobile, there’s a folder with limited React Native code but with no memory logic. Quickly migrated to React (web) and modified the CORS logic, as well as choosing to store information on localStorage.
3. Re-ramping up to Go; the only other time I’ve used the language was for low-level infrastructure code. Took a little while to get the hang of its syntax again with a different application.

### Key Takeaways
1. Very nice to have a more well-rounded application on the language. Spent some time looking up about HTTP logic.
2. Had a lot of fun with it! Passed a 4 hour mark of pure coding, considering the slower Golang ramp-up due to the fewer years of experience
3. Having time as a limiter,  here are a few things I would have liked to improve:
	1. Thorough testing / mocking API calls with Jest.
	2. Component styling, centering, etc.
	3. Correcting the date query; currently set at 12AM-11:59PM per day but a more refined version would be a query from now to 24 hours before.
	4. Exporting data from back-end to written MD file, would take a while to ramp up on Go.
	
> Think about how to support any number of apps, and how this would affect your design.  
Data querying:  for shortened purposes, review queries are set to page=1 . For most applications, there usually aren’t that many reviews for the request to need more pages. But thinking about scalability, getting every page of reviews and filtering them would require more application work. 

```
https://itunes.apple.com/us/rss/customerreviews/id=595068606/sortBy=mostRecent/page=1/json
```

Service would change into creating endpoints that can handle multiple requests. Filtering queries would be implemented from the service instead of the web app.

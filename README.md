# Josh Kingswell

## Time spent

Between 3 and 4 hours

## Get Started

Install deps and then either:

- Run `npm run start` and navigate to http://localhost:5173

OR

- Run `docker build -t optix .`
- Then run `docker run -p 5173:80 optix` and navigate to http://localhost:5173

## Notes

All tasks completed besides `On mobile, this must appear as information...`. I misread this task at first, but I believe the use
of toast notifications makes it moot. The toasts will display errors the same for all users.

### More time?

Had I spent more time on this, I would have liked to have implemented the following:

- Modal form with a JS breakpoint utilising the mui react hook or react MediaQuery, so only users with tablets or bigger recieved the form in a modal.
- A toggle to switch the table into a card/tile view.
  - Utilising some form of breakpoint to display the card/tile view to mobile users as default as scrollable tables are not ideal.
- Setup either redux or use a react context provider + reducer to handle the data and data calls better.
- Removed material ui and created components myself for better styling and control!
- Created a docker compose file for ease of use.

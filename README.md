# lendenAssign
**Features**
Real-time multiplayer gameplay using Socket.IO.
Interactive user interface for game play.
Players can enter their names to join a game.
Keeps track of the winner and stores game results in a database.
Responsive design for various screen sizes.
**Prerequisites**
Before running the project, ensure you have the following installed on your machine:
Node.js (v14 or higher recommended)
npm (comes with Node.js)
**Install dependencies:** npm install
**Start the server:** npm run dev
**Access the application:** Open your browser and navigate to http://localhost:3000.

**File Structure**
app.js: Backend server that handles routes, database interaction, and Socket.IO communication.
public/: Contains static files (HTML, CSS, JavaScript, images).
templates/views/: Contains Handlebars templates for rendering HTML.
Controller: Contains function to perform the operation related with API’s
Models: Contain Schema for the database
**How to Play:**
1 Open the application in your browser (http://localhost:3000).
2 Enter your name and click "Search for a player."
3 Wait for an opponent to join the game.
4 Play the game by clicking on the grid cells when it's your turn.
5 The game announces the winner or a draw at the end and saves the result.
Saving Game Results: The game results are sent to the backend via a POST request to the
 /save-game endpoint, which stores the data in the database.

**Troubleshooting:**
Ensure the server is running on http://localhost:3000.
Check for any errors in the console (browser or terminal).
Ensure all dependencies are correctly installed by running npm install.
Technologies Used:
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Real-Time Communication: Socket.IO

**Other references:**
Socket.IO Documentation
Express.js Documentation

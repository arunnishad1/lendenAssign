# lendenAssign
**Features**<br>
Real-time multiplayer gameplay using Socket.IO.<br>
Interactive user interface for game play.<br>
Players can enter their names to join a game.<br>
Keeps track of the winner and stores game results in a database.<br>
Responsive design for various screen sizes.<br>
**Prerequisites**<br>
Before running the project, ensure you have the following installed on your machine:<br>
Node.js (v14 or higher recommended)<br>
npm (comes with Node.js)<br>
**Install dependencies:** npm install<br>
**Start the server:** npm run dev<br>
**Access the application:** Open your browser and navigate to http://localhost:3000.<br>

**File Structure**<br>
app.js: Backend server that handles routes, database interaction, and Socket.IO communication.<br>
public/: Contains static files (HTML, CSS, JavaScript, images).<br>
templates/views/: Contains Handlebars templates for rendering HTML.<br>
Controller: Contains function to perform the operation related with API’s<br>
Models: Contain Schema for the database<br>
**How to Play:** <br>
1 Open the application in your browser (http://localhost:3000).<br>
2 Enter your name and click "Search for a player."<br>
3 Wait for an opponent to join the game.<br>
4 Play the game by clicking on the grid cells when it's your turn.<br>
5 The game announces the winner or a draw at the end and saves the result.<br>
Saving Game Results: The game results are sent to the backend via a POST request to the<br>
 /save-game endpoint, which stores the data in the database.<br>

**Troubleshooting:** <br>
Ensure the server is running on http://localhost:3000.<br>
Check for any errors in the console (browser or terminal).<br>
Ensure all dependencies are correctly installed by running npm install.<br>
Technologies Used:
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Real-Time Communication: Socket.IO

**Other references:** <br>
Socket.IO Documentation<br>
Express.js Documentation<br>

# Hostel Complaints Portal

**Live Deployment:** [https://shridhar-1.github.io/Hostel-Complaint-System/](https://shridhar-1.github.io/Hostel-Complaint-System/)

## What I Built
I chose **Track 3: Hostel Complaint System**. I built a responsive web application that allows students to easily submit, track, and manage hostel maintenance and service issues. The application features a submission form with input validation and a dynamic dashboard where users can view submitted tickets, filter them by category and status, update their progress, and delete resolved records. 

## Tech Stack Used
* **Frontend:** Pure HTML5 and CSS3 (Custom styling, fully responsive without external frameworks)
* **Logic & Interactivity:** Vanilla JavaScript (DOM manipulation, event listeners)
* **Data Persistence:** Browser `localStorage` (Client-side storage to persist data across page reloads without needing a backend server)

## One Challenge I Faced
The biggest challenge was handling the dynamic statistics (Total, Pending, In Progress, Resolved) and making sure they updated correctly in real-time whenever a user applied a filter or changed a complaint's status. Since I built this with Vanilla JavaScript instead of a framework like React, I had to write custom logic to clear the DOM, recalculate the array lengths based on the active dropdown filters, and re-render the HTML cards from scratch on every state change.

## One Future Improvement
If I had more time, the biggest improvement would be migrating data storage from `localStorage` to a real backend database (like Firebase or a Node.js/MongoDB REST API). This would allow multiple users across different devices to see the same live complaints. I would also add user authentication so that only verified hostel residents could submit tickets, and only admins could change a ticket's status to "Resolved".

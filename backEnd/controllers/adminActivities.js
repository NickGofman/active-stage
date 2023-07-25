'use strict';
const pool = require('../database');
const blockUserAndUnassignEvents = (req, res) => {
  const { userId } = req.params;

  // Construct the query to update the user's status to 'Banned'
  const blockUserQuery = `UPDATE user SET Status = 'Banned' WHERE UserId = ?`;

  pool.query(blockUserQuery, [userId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // After blocking the user, update the assigned events
    // Construct the query to set UserId to null and change the status to 'Published' for assigned events of the blocked user
    const unassignEventsQuery = `
      UPDATE event
      SET UserId = NULL,
          Status = 'Published'
      WHERE UserId = ?
        AND (Status = 'Assigned' OR Status='Published')
        AND Date >= CURDATE()
    `;

    pool.query(unassignEventsQuery, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // If any assigned events were updated, inform the client
      const numUpdatedEvents = result.affectedRows;
      if (numUpdatedEvents > 0) {
        return res.status(200).json({
          message: `User banned.`,
        });
      } else {
        // If no events were updated, inform the client
        return res
          .status(200)
          .json({ message: `User banned.` });
      }
    });
  });
};



module.exports = {
  blockUserAndUnassignEvents,
};
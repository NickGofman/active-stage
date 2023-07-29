'use strict';
const pool = require('../database');
const getBandNames = (req, res) => {
  console.log('BACK END getBandNames');
  // const { startDate, endDate } = req.params;
  console.log('bobobobdy', req.body);
  const { startDate, endDate, musicalTypeId } = req.body;
  let query = `
    SELECT DISTINCT musician.BandName
    FROM musician
    JOIN musician_register_event as mre ON musician.UserId = mre.UserId
    JOIN event ON mre.UserId = event.UserId
    
    WHERE event.Status = 'Closed'
    AND event.Date >= DATE(?)
    AND event.Date <= DATE(?)
  `;
  const queryParams = [startDate, endDate];
  if (musicalTypeId) {
    query += ' AND event.MusicalTypeID = ?';
    queryParams.push(musicalTypeId);
  }

  // Execute the query and retrieve the band names
  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching band names.' });
    }

    const bandNames = results.map((result) => result.BandName);
    return res.status(200).json(bandNames);
  });
};

const getFilteredReports = (req, res) => {
  const { startDate, endDate, musicalTypeId, bandName } = req.body;
  console.log('BACKEND getFilteredReports');
  let query = `
    SELECT 
      e.EventID,
      mt.MusicalTypeName,
      DATE_FORMAT(e.Date, '%d - %m - %Y') AS Date,
      e.Income,
      e.Status,
      m.BandName
    FROM
      event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    LEFT JOIN typesdescription AS mt ON e.MusicalTypeID = mt.MusicalTypeID
    WHERE
      DATE(e.Date) >= DATE(?)
      AND DATE(e.Date) <= DATE(?)
      AND e.Status = 'Closed'
      AND e.Income > 0
      AND e.UserId IS NOT NULL
  `;

  const queryParams = [startDate, endDate];

  if (musicalTypeId) {
    query += ' AND mt.MusicalTypeID = ?';
    queryParams.push(musicalTypeId);
  }

  if (bandName) {
    query += ' AND m.BandName = ?';
    queryParams.push(bandName);
  }

  query += ' GROUP BY e.EventID ORDER BY e.Date ASC';
  pool.query(query, queryParams, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

const getMusicalStylesByDate = (req, res) => {
  console.log('ccccc', req.body);
  const { startDate, endDate, bandName } = req.body;
  console.log('BACK END getMusicalStylesByDate', startDate, endDate);
  let query = `
SELECT DISTINCT typesdescription.MusicalTypeID, typesdescription.MusicalTypeName
FROM musician
JOIN musician_register_event ON musician.UserId = musician_register_event.UserId
JOIN event ON musician_register_event.UserId = event.UserId
JOIN typesdescription ON event.MusicalTypeID = typesdescription.MusicalTypeID
WHERE event.Status = 'Closed'
  AND event.Date >= DATE(?)
  AND event.Date <= DATE(?) 
  `;
  const queryParams = [startDate, endDate];
  if (bandName) {
    query += ' AND musician.BandName = ?';
    queryParams.push(bandName);
  }

  // Execute the query and retrieve the band names
  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching Musical Styles.' });
    }

    return res.status(200).json(results);
  });
};
module.exports = {
  getBandNames,
  getFilteredReports,
  getMusicalStylesByDate,
};

//////// search api//////
app.get("/searchAll", async (req, res, next) => {
  let { query } = req.query;
  // const { name, email, mobile, address } = req.body;

  if (query && query.length >= 3) {
    try {
      const regex = new RegExp(query, 'ims');

      let results = await Register.find( {       
        $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { mobile: { $regex: regex } },
        { address: { $regex: regex } },
      ],
      isDeleted: false
    });
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while searching.' });
    }
  } else {
    res.status(400).json({ error: 'Query must be at least 3 characters long.' });
  }
});

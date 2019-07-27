
 const imagehandler = (req, res,db) => {
   const { id } = req.body;
   db("users")
     .returning("entries")
     .where("id", "=", id)
     .increment("entries", 1)
     .then(entries => {
       res.json(entries[0]);
     })
     .catch(err => res.status(400).json("unable to get entries"));
 };



module.exports = {
    imagehandler : imagehandler
}
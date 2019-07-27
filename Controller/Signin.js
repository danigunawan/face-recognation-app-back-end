
const handleSignin = (req, res, bcrypt,db) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isvalid = bcrypt.compareSync(password, data[0].hash);

      if (isvalid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to get user"));
      }
      {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

module.exports ={
    handleSignin: handleSignin
} 
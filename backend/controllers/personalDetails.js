const PersonalDetails = require("../model/personalDetails");

exports.addPersonalDetails = async (req, res) => {
  const { userId, yearsOfExperience, preferredTechnologies } = req.body;
  const resume = req.file.path;
console.log(userId, yearsOfExperience, preferredTechnologies, resume);

  try {
    const personalDetails = new PersonalDetails({
      user: userId,
      resume,
      yearsOfExperience,
      preferredTechnologies,
    });

    await personalDetails.save();
    res.status(201).send("Personal details added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding personal details.");
  }
};

exports.getUserData = async (req , res) => {
   const { userId } = req.params;
   try {
     // Find all personal details for the specified user ID
     const personalDetails = await PersonalDetails.find({ user: userId });

     if (!personalDetails) {
       return res
         .status(404)
         .json({
           message: "Personal details not found for the specified user",
         });
     }

     res.status(200).json(personalDetails);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
   }
}

const router = require("express").Router();
const Transaction = require("../db/transaction");
const UserBL = require("../db/user");

router.get("/:id", async (req, res) => {
  try {
    const user = await UserBL.findById(req.params.id);
    if (!user) {
      res.status(404).send("No such user");
      return;
    }
    let data = {
      Borrowed: [],
      Lent: [],
    };
    const borr = await Promise.all(
      user.borrowers.map((lenderId) => {
        return Transaction.findById(lenderId);
      })
    );

    const lend = await Promise.all(
      user.lenders.map((borrowerId) => {
        return Transaction.findById(borrowerId);
      })
    );
    data.Borrowed = borr;
    data.Lent = lend;
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

// create a borrow request
router.post("/borrow/:id", async (req, res) => {
  try {
    const borrower = await UserBL.findById(req.params.id);
    const lender = await UserBL.findOne({ upi: req.body.upi });
    if (!borrower || !lender || borrower.upi === lender.upi) {
      res.status(404).send("Borrower or lender doesn't exists");
      return;
    }
    const newTransaction = new Transaction({
      borrowedFrom: lender.name,
      borrowedTo: borrower.name,
      ...req.body,
    });
    await newTransaction.save();
    await borrower.updateOne({ $push: { borrowers: newTransaction._id } });
    await lender.updateOne({ $push: { lenders: newTransaction_id } });
    res.status(200).send("Request successfully made");
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

module.exports = router;

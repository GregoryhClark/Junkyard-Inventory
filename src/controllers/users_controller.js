addWaitlist: (req, res) => {
    const db = req.app.get('db');
    console.log('req.body is now' , req.body)
    const {pendingWaitMake, pendingWaitModel, pendingWaitColor, pendingWaitYear, auth_id}
    db.add_waitlist([pendingWaitMake, pendingWaitModel, pendingWaitColor, pendingWaitYear, auth_id])
    .then((list) => {res.status(200).send(list)})
    .catch ( () => res.status(500).send())
}
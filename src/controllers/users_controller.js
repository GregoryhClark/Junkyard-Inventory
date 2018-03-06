
module.exports = {

    addWaitlist: (req, res) => {
        const db = req.app.get('db');
        console.log('req.body is now', req.body)
        const { pendingWaitMake, pendingWaitModel, pendingWaitColor, pendingWaitYear, auth_id } = req.body;
        db.add_waitlist([pendingWaitMake, pendingWaitModel, pendingWaitColor, pendingWaitYear, auth_id])
            .then((list) => { res.status(200).send(list) })
            .catch(() => res.status(500).send())
    },

    getColor: (req, res) => {
        const db = req.app.get('db');
        db.get_colors()
            .then((colors) => { res.status(200).send(colors) })
            .catch(() => res.status(500).send())
    }, 
    getMakes: (req, res) => {
        const db = req.app.get('db');
        db.get_makes()
            .then((makes) => { res.status(200).send(makes) })
            .catch(() => res.status(500).send())
    },
    getModels: (req, res) => {
        const db = req.app.get('db');
        db.get_models()
            .then((models) => { res.status(200).send(models) })
            .catch(() => res.status(500).send())
    },
    getYears: (req, res) => {
        const db = req.app.get('db');
        db.get_years()
            .then((years) => { res.status(200).send(years) })
            .catch(() => res.status(500).send())
    },
}
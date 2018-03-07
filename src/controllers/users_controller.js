
module.exports = {

    addWaitlist: (req, res) => {
        const db = req.app.get('db');
        console.log('req.body is now', req.body)
        // console.log('while just req is now', req)
        const { user_id, tempColor, tempMake, tempModel, tempYear } = req.body;
        db.add_waitlist([user_id, tempColor, tempMake, tempModel, tempYear])
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

    getModelsByMake: (req, res) => {
        const db = req.app.get('db');
        db.get_by_make([req.params.make])
        .then((model) => { res.status(200).send(model) })
        .catch(() => res.status(500).send())
    },

    // getModels: (req, res) => {
    //     const db = req.app.get('db');
    //     db.get_models()
    //         .then((models) => { res.status(200).send(models) })
    //         .catch(() => res.status(500).send())
    // },

    getYears: (req, res) => {
        const db = req.app.get('db');
        db.get_years()
            .then((years) => { res.status(200).send(years) })
            .catch(() => res.status(500).send())
    },
}

module.exports = {



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

    getYears: (req, res) => {
        const db = req.app.get('db');
        db.get_years()
            .then((years) => { res.status(200).send(years) })
            .catch(() => res.status(500).send())
    },
    addWaitlist: (req, res) => {
        const db = req.app.get('db');
        // console.log('req.body is now', req.body)
        // console.log('while just req is now', req)
        const { user_id, tempColor, tempMake, tempModel, tempYear } = req.body;
        db.add_waitlist([user_id, tempColor, tempMake, tempModel, tempYear])
            .then((list) => { res.status(200).send(list) })
            .catch(() => res.status(500).send())
    },
    updateProfile: (req, res) => {
        const db = req.app.get('db');
        const { user_id, tempName, tempEmail, tempCell } = req.body;
        db.update_profile([tempName, tempEmail, tempCell, user_id])
            .then((profile) => { res.status(200).send(profile) })
            .catch(() => res.status(500).send())
    },
    getAllInventory: (req, res) => {
        const db = req.app.get('db');
        db.get_all_inventory()
            .then((inventory) => { res.status(200).send(inventory) })
            .catch(() => res.status(500).send())
    },
    getFiltered: (req, res) => {
        const db = req.app.get('db');
        db.get_filtered([req.params.make, req.params.model, req.params.year, req.params.color])
            .then((car) => { res.status(200).send(car) })
            .catch(() => res.status(500).send())
    },
    enterInventory:(req, res) => {
        const db = req.app.get('db');
        const { tempColor, tempMake, tempModel, tempYear } = req.body;
        db.add_inventory([tempMake, tempModel, tempYear, tempColor])
            .then((car) => { res.status(200).send(car) })
            .catch(() => res.status(500).send())
    },
    deleteInventory: (req, res) =>{
        const db = req.app.get('db');
        db.delete_inventory([req.params.id])
        .then((inventory) => { res.status(200).send(inventory) })
        .catch(() => res.status(500).send())
    }
}
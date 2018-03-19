require('dotenv').config();

const nodemailer = require('nodemailer')
const {
    EMAIL_PASS,
    EMAIL_USER
} = process.env;

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
    enterInventory: (req, res) => {
        const db = req.app.get('db');
        const { tempColor, tempMake, tempModel, tempYear } = req.body;
        db.add_inventory([tempMake, tempModel, tempYear, tempColor])
            .then((car) => { res.status(200).send(car) })
            .catch(() => res.status(500).send())
    },
    deleteInventory: (req, res) => {
        const db = req.app.get('db');
        db.delete_inventory([req.params.id])
            .then((inventory) => { res.status(200).send(inventory) })
            .catch(() => res.status(500).send())
    },
    deleteWaitlist: (req, res) => {
        const db = req.app.get('db');
        db.delete_waitlist([req.params.id])
            .then((inventory) => { res.status(200).send(inventory) })
            .catch(() => res.status(500).send())
    },




    //THis needs to be finished... I stopped while working on it.
    editInventory: (req, res) => {
        const db = req.app.get('db');
        const { } = req.body
        db.edit_inventory([])
            .then((inventory) => { res.status(200).send(inventory) })
            .catch(() => res.status(500).send())
    },
    getWaitlist: (req, res) => {
        const db = req.app.get('db');
        db.get_waitlist([req.params.id])
            .then((list) => { res.status(200).send(list) })
            .catch(() => res.status(500).send())
    },
    notifyWaitlist: (req, res) => {
        const db = req.app.get('db');
        var { tempColor, tempMake, tempModel, tempYear } = req.body;
        tempYear = parseInt(tempYear);
        console.log('req.body is now', req.body)
        console.log('tempYear is now', tempYear)
        db.check_waitlists([tempMake, tempModel, tempYear, tempColor])
            .then((users) => {
                console.log('users is now ', users)
                res.status(200).send(users)

                users.map((user) => {

                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: EMAIL_USER, // generated ethereal user
                            pass: EMAIL_PASS // generated ethereal password
                        }
                    });

                    // setup email data with unicode symbols
                    console.log('hey, wise guy!',user.email)
                    let mailOptions = {
                        from: `"Test Greg" <${EMAIL_USER}>`, // sender address
                        to: `${user.email}`, // list of receivers
                        subject: `We have your ${tempMake} ${tempModel}!`, // Subject line
                        text: `Hey ${user.user_name}, We just got your ${tempMake} ${tempModel} into inventory! Hurry down to check it out before it's gone!`, // plain text body
                        html: `<b>Hey ${user.user_name}, We just got your ${tempMake} ${tempModel} into inventory! Hurry down to check it out before it's gone!</b>` // html body
                    };

                    //send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);

                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


                    });

                })




            })
            .catch((err) => res.status(500).send(err))






    }
}
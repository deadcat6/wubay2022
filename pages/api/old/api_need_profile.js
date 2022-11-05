import firebase_need_profile from '../../../firebase/old/firebase_need_profile.js';


async function handler(req, res) {
    if (req.method === 'POST') {

        const data = req.body;

        const {email} = data;
        const needProfile = await firebase_need_profile(email);
        //console.log("bdhjabd jhabvdhjevfhsfbisb")
        //console.log(needProfile);

        //false = user added i think
        res.status(201).json({message: 'inserted user into database', needProfile: needProfile});
    }
}

export default handler;
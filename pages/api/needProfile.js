import checkProfile from '../../firebase/firebase_needProfile.js';


async function handler(req, res) {
    if (req.method === 'POST') {

        const data = req.body;

        const {email} = data;
        const needProfile = await checkProfile(email);
        console.log("bdhjabd jhabvdhjevfhsfbisb")
        console.log(needProfile);

        //false = user added i think
        res.status(201).json({message: 'inserted user into database', needProfile: needProfile});
    }
}

export default handler;
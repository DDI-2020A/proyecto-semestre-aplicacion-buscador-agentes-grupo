import { v4 as uuidv4 } from 'uuid';

const COLLECTION = "props";

const upload = async (file, id, uid,ref) => {

    //upload file

return ;
}


const update = async (values, id, uid) => {
    const { db } = await import('../../utils/firebase_sdk');
    let ref = db.collection(COLLECTION);
    ref = ref.doc(id);
    const property = { ...values, id };

    return ref.set(property, { merge: true });
}

const drop = async id => {
    console.log('deleted');
}

export { upload, update };
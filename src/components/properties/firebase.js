import { v4 as uuidv4 } from 'uuid';

const COLLECTION = "propertiess";

const upload = async file => {
    const { storage } = await import('../../utils/firebase_sdk');
    const metadata = {
        contentType: 'image/jpeg'
    }
    const storageRef = storage.ref();
    const imgFile = storageRef.child(`${COLLECTION}/${uuidv4()}`);

    const task = imgFile.put(file, metadata);

    return task;
}

const create = async values => {
    const {db} = await import('../../utils/firebase_sdk')
    let ref = db.collection(COLLECTION);
    ref = ref.doc()
    const id = ref.id
    const property = {...values,id};

    return ref.set(property, { merge: true });
}

const update = async (values,id) => {
    const {db} = await import('../../utils/firebase_sdk');
    let ref = db.collection(COLLECTION);
    ref = ref.doc(id);
    const property = {...values,id};

    return ref.set(property, { merge: true });
}

const drop = async id => {
    console.log('deleted');
}

export { upload, create, update };
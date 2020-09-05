//user
export const saveUserDoc = async (db,userData) => {
    const ref = db.collection('users').doc(userData.uid);

    return ref.set(userData, { merge: true });
};

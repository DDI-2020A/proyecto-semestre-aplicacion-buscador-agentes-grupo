import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import UserResults from './UserResults';


const UserSearch = () => {
    const [visible, setVisible] = useState(false);
    const [profile,setProfile] = useState(null);
    const [profiles,setProfiles] = useState([]);

    useEffect(() => {
        const init = async () => {
            const { db } = await import('../../utils/firebase_sdk');
    
            const snap = await db.collection('users').get();

            const profiles = snap.docs.map(
                (profile,index) => {
                    return {...profile.data(),key:index};
                }
            );
            console.log(profiles);
            setProfiles(profiles);
        }        

        init();

    }, [])

    return (
        <div>
            <UserResults users={profiles}/> 
        </div>
    )
}
export default UserSearch;

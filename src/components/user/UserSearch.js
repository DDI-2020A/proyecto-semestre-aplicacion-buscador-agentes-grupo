import React, { useState, useEffect } from 'react'
import UserResults from './UserResults';
import SearchInput  from './SearchInput';


const UserSearch = () => {
    const [profiles,setProfiles] = useState([]);

    const upadteResults = (results) => {
        setProfiles(results);
    }
    
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
            <SearchInput action={upadteResults}/> 
            <UserResults users={profiles}/>
        </div>
    )
}
export default UserSearch;

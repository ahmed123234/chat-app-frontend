import { useState } from 'react';
import {People, ActiveStatus, NotificationsAndSounds, ManageStorage, MessageRequests, SwitchAccount, ChangePhoto, EditProfile  } from './index'
import NewGroupLayout from '../NewGroupLayout';
import ChatSettings from '../ChatSettings';

function ProfileSettings({settingSelected, setSettingSelected}) {

    const [editProfile, setEditProfile] = useState(false);
    return (
        <>
            {settingSelected === "notifications & sounds" && <NotificationsAndSounds settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}

            {settingSelected === "active status" && <ActiveStatus settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'manage storage' && <ManageStorage settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'people' && <People settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'message requests' && <MessageRequests settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'switch account' && <SwitchAccount settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'change photo' && <ChangePhoto settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {settingSelected === 'edit profile' && <EditProfile 
                settingSelected={settingSelected}
                setSettingSelected={setSettingSelected}
                // editProfile={editProfile}
                // setEditProfile={setEditProfile}
            

            />}

            {/* {settingSelected === "create new group" && <NewGroupLayout/>} */}
            {settingSelected === 'chat settings' && <ChatSettings settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}
            {/* {settingSelected === "create new group" && <NewGroupLayout settingSelected={settingSelected} setSettingSelected={setSettingSelected} groupMembers={groupRef.current} />} */}


        </>
    )
}

export default ProfileSettings
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../redux/profileSlice';
import { RootState, AppDispatch } from '../../redux/store';
import Button from "@/components/Button/Button";
import TransactionSection from "@/components/TransactionSection/TransactionSection";
import './User.scss'

const User = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile.data);
    const profileStatus = useSelector((state: RootState) => state.profile.status);

    const [isEditing, setIsEditing] = useState(false);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setEditFirstName(profile.firstName);
            setEditLastName(profile.lastName);
        }
    }, [profile]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        await dispatch(updateProfile({ firstName: editFirstName, lastName: editLastName }));
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        if (profile) {
            setEditFirstName(profile.firstName);
            setEditLastName(profile.lastName);
        }
        setIsEditing(false);
    };

    if (profileStatus === 'loading' && !profile) {
        return <main className="main bg-dark"><p>Loading profile...</p></main>;
    }

    return (
        <main className="main bg-dark">
            {profile ? (
                <div className="header">
                    {!isEditing ? (
                        <>
                            <h1>Welcome back<br />{profile.firstName} {profile.lastName}</h1>
                            <Button className="edit-button" text="Edit Name" onClick={handleEditClick} />
                        </>
                    ) : (
                        <div className="edit-container">
                            <h1>Welcome back</h1>
                            <div className="edit-inputs">
                                <input
                                    type="text"
                                    value={editFirstName}
                                    onChange={(e) => setEditFirstName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editLastName}
                                    onChange={(e) => setEditLastName(e.target.value)}
                                />
                            </div>
                            <div className="edit-buttons">
                                <Button className="save-button" text="Save" onClick={handleSaveClick} />
                                <Button className="cancel-button" text="Cancel" onClick={handleCancelClick} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <TransactionSection title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
            <TransactionSection title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
            <TransactionSection title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
        </main>
    )
}

export default User;

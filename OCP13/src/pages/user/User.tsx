import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../redux/profileSlice';
import { RootState, AppDispatch } from '../../redux/store';
import Button from "@/components/Button/Button";
import TransactionSection from "@/components/TransactionSection/TransactionSection";
import './User.scss'

const User = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile.data);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    return (
        <main className="main bg-dark">
            {profile ? (
                <div className="header">
                    <h1>Welcome back<br />{profile.firstName} {profile.lastName}</h1>
                    <Button className="edit-button" text="Edit Name" />
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
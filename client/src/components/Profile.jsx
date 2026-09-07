
import axios from 'axios';

function Profile({ setActiveModal, user, setUser }) {

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            
            console.log('Logout successful!');
            setUser(null);
            setActiveModal(null);
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    };

    return (
        <div className='profile-window'>
            {user ? (
                <>
                    <button className="profile-row" onClick={() => setActiveModal('account')}>Account</button>
                    <button className="profile-row" onClick={handleLogout}>Log out</button>
                </>
                
            ) : (
                <>
                    <button className="profile-row" onClick={() => setActiveModal('register')}>Sign in</button>
                    <button className="profile-row" onClick={() => setActiveModal('login')}>Log in</button>
                </>

            )}
        </div>
    );
}

export default Profile;
import UserAuth from '../../components/auth/UserAuth';
import ProfileUpdateAuth from '../../components/auth/ProfileUpdateAuth';

const UserProfileUpdate = () => {
  return (
    <UserAuth>
      <div className='container-fluid'>
        <div className='row'>
          <ProfileUpdateAuth />
        </div>
      </div>
    </UserAuth>
  );
};

export default UserProfileUpdate;

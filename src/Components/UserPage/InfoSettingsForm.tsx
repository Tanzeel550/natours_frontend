import { USER_IMAGES_BASE_URL } from '../../config';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { startUpdateMe } from '../../actions/authActions';
import { AppProps } from '../../store/configStore';

const mapStateToProps = ({ auth }: AppProps) => ({ user: auth.user!! });
const connector = connect(mapStateToProps, { startUpdateMe });
type propsFromRedux = ConnectedProps<typeof connector>;

const InfoSettingsForm = ({ user, startUpdateMe }: propsFromRedux) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(`${USER_IMAGES_BASE_URL}/${user.photo}`);
  const [rawPhoto, setRawPhoto] = useState(user.photo);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let rawPhoto = e.target.files[0];
      let photo = URL.createObjectURL(rawPhoto);
      // Remember: React only understands the image if it is in the form of the link. But when we upload the image, it is not in the form of link
      // so we use URL.createObjectURL(img);
      // but here comes the tricky part, multer cannot understand photo if it is in the form of link. It only understands raw photo!
      // so we have made another field in state so that we can send raw photo to multer in the backend.
      // Sometimes you will have to refresh the page to see the result
      setPhoto(photo);
      // @ts-ignore
      setRawPhoto(rawPhoto);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('photo', rawPhoto);

    try {
      await startUpdateMe(formData);
    } catch (e) {}
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            required={true}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            className="form__input"
            id="email"
            type="email"
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form__group form__photo-upload">
          <img className="form__user-photo" src={photo} alt="" />
          <label htmlFor="photo" className="btn-text">
            Upload New Photo:{' '}
          </label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={loadImage}
            name="photo"
          />
        </div>
        <div className="form__group right">
          <button type="submit" className="btn btn--small btn--green">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default connector(InfoSettingsForm);

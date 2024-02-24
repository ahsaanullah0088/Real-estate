import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
} from "../redux/user/userSlice";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser ,loading , error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePrec] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handFileUpload(file);
    }
  }, [file]);
  const handFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(formData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({
            ...formData,
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png":
              downloadURL,
          })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
         return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
    return (
      <div className=" p-3 max-w-lg mx-auto">
        <h1 className=" text-3xl font-semibold my-7 text-center">Profile</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2  "
            src={formData.avatar || currentUser.avatar}
            alt=" profile image"
          />
          <p className=" text-sm self-center">
            {fileUploadError ? (
              <span className=" text-red-700">
                Error image upload ( image must be less than two mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className=" text-slate-700">
                {`Uploading ${filePerc}%`}
              </span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder=" username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className=" border p-3 rounded-lg"
            id="username"
          />
          <input
            type="text"
            placeholder=" email"
            onChange={handleChange}
            defaultValue={currentUser.email}
            className=" border p-3 rounded-lg"
            id="email"
          />
          <input
            type="password"
            placeholder=" password"
            className=" border p-3 rounded-lg"
            id="password"
          />

          <button disabled = {loading} className=" bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            { loading ? 'Loading...' : 'Update' }

          </button>
        </form>
        <div className=" flex justify-between mt-5 ">
          <span className=" text-red-700 cursor-pointer">Delete ccount</span>
          <span className=" text-red-700 cursor-pointer">Sign out</span>
        </div>
        <p className="text-red-700">{error ? error: ''} </p>
        <p className="text-green-700">{updateSuccess ? 'User is updated successfully': ''} </p>

      </div>
    );
  };


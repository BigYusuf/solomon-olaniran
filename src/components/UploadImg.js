import { app } from '../../firebase';
import { getStorage, ref as storageRef , uploadBytesResumable, getDownloadURL} from "firebase/storage";

export const handleUpload = (setFileUrl, file) => {
    
    const fileName = `images/${new Date().getTime() + file.name}`;
    const storage = getStorage(app);
    const storeRef = storageRef(storage, fileName);
    const uploadTask = uploadBytesResumable(storeRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // Handle unsuccessful uploads
            console.log(error)
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFileUrl(url);
           // setFileUrl(()=>({...formData, [formData.img]: url}))
        });
      }
    );
}
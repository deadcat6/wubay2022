import {storage} from './firebase_config';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuidv4} from "uuid";

export async function uploadImages(imgArray) {

  const uploadOne = (img) => {
    const storageRef = ref(storage, uuidv4());
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      (snapshot) => {
      }, () => {
      }, () => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          return downloadURL;
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const result = [];
  imgArray.map(img => {
    result.push(uploadOne(img));
  })
  return result;
};

export async function uploadImage(img) {
  console.log("uploadImageuploadImageuploadImage"+  img)
  let result;
  const storageRef = ref(storage, uuidv4());
  const uploadTask = uploadBytesResumable(storageRef, img);
  await uploadTask.on(
    (snapshot) => {
    }, () => {
    }, () => {
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        result = downloadURL;
        console.log("resultresultresultresultresultresult" + result)
        //return result;
       // return downloadURL;;
      })
      return result;
    },
    (error) => {
      console.log(error);
    }
  );


};
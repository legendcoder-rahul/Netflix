import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { initializeApp } from "firebase/app";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCkuVHcIITPfIrJOLLuFDajOtca9TOY7bM",
  authDomain: "netflix-clone-d02bc.firebaseapp.com",
  projectId: "netflix-clone-d02bc",
  storageBucket: "netflix-clone-d02bc.firebasestorage.app",
  messagingSenderId: "936110761749",
  appId: "1:936110761749:web:a9147ea70b5c22bc83ab1c",
  measurementId: "G-TGZ1HPX7W8"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
try {
    
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user= res.user;
    await addDoc(collection(db,"users"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email,
    })

} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('_').join(" "));
}
}

const login = async(email,password) => {
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('_').join(" "));
}
    }


const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}
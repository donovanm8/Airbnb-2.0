import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase/init";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SigninModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const isOpen = useSelector((state) => state.modals.loginModalOpen);

  const dispatch = useDispatch();

  async function handleSignin() {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGoogleSignup() {
    const userCred = await signInWithPopup(auth, googleProvider);
    console.log(userCred);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser.email,
          uid: currentUser.uid,
          name: currentUser.displayName,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="headerBtn bg-airbnb text-white"
      >
        Sign in
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex items-center justify-center"
      >
        <div className="bg-white w-[90%] h-[600px] md:w-[560px] md:h-[600px] rounded-3xl">
          <div className="flex flex-col">
            <div className="flex border-b p-2">
              <XMarkIcon
                className="w-7 cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => dispatch(closeLoginModal())}
              />
              <h1 className="flex-grow flex items-center justify-center font-bold">
                Sign in
              </h1>
            </div>
            <div className="p-4">
              <h1 className="mt-8 mb-4 font-semibold text-2xl">
                Welcome back to Airbnb
              </h1>
              <input
                className="input"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full bg-airbnb rounded-md text-white py-3 font-bold hover:bg-opacity-90"
                onClick={handleSignin}
              >
                Sign in
              </button>
              <h1 className="text-center my-4 font-semibold">or</h1>
              <button
                onClick={handleGoogleSignup}
                className="w-full bg-white border border-black rounded-md py-2.5 font-medium flex items-center justify-center space-x-2 hover:bg-gray-500 hover:bg-opacity-10"
              >
                <span>Sign up with</span>
                <Image src={"https://rb.gy/128f7"} width={20} height={10} />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { useFlashMessage } from '@/app/context/FlashMessageContext';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

  useEffect(()=> {
    if (status === 'authenticated') {
      router.push('/members'); // Redirect to the members pager if already authenticated
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      passcode: { value: string };
    };

    const result = await signIn('credentials', {
      redirect: false,
      passcode: target.passcode.value,
    });

    if (result?.ok) {
      setFlashMessage({ type: 'success', message: 'Successfully signed in!' });
      router.push('/members'); // Redirect to the members page after successful login
    } else if (result?.error) {
      setFlashMessage({ type: 'error', message: 'Incorrect passcode. Please try again.' });
    } else {
      setFlashMessage({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <Image
          src='/images/logo_group.png'
          alt='MommiEnglish logo and slogan group'
          width={600}
          height={150}
        />
        <form className="card-form" onSubmit={handleSignIn}>
          <input name="passcode" type="password" placeholder="Passcode" className="form-field" />
          <button type="submit" className="red-border-button" >Sign in</button>
        </form>
        {/* <button
          onClick={() => router.push('/auth/signup')}
          className="red-button"
        >
          Sign up
        </button> */}
      </div>
    </div>
  );
}

// // app/auth/signin/page.tsx for admin
// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "../../components/signin.module.css"

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const result = await signIn("admin-login", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       setError(result.error);
//     } else {
//       router.push("/admin"); // Redirect to admin dashboard upon success
//     }
//   };

//   return (
//     <div className={styles["login-container"]}>
//       <div className={styles["login-card"]}>
//         <h1>Admin Sign In</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button className="red-button" type="submit">Sign In</button>
//         </form>

//         {/* Error message */}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

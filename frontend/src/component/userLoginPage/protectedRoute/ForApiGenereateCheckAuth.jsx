// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ForApiGenereateCheckAuth = () => {
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/api/user-check-auth",
//           {
//             withCredentials: true,
//           }
//         );
//         setIsAuth(true);
//       } catch (err) {
//         setIsAuth(false);
//       }
//     };
//     checkAuth();
//   }, []);
// };

// export default ForApiGenereateCheckAuth;

import { useEffect, useState } from "react";
import axios from "axios";

const useApiGenerateCheckAuth = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8000/api/user-check-auth", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  return isAuth;
};

export default useApiGenerateCheckAuth;

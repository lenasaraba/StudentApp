import { useAppSelector } from "../../app/store/configureStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserProfile from "./components/UserProfile";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.account.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return <UserProfile />;
}

import React, { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loadingImage from "../../public/image-page.png";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center space-x-2">
        <Image
          // src={loadingImage}
          src="/image-page.png"
          width={100}
          height={100}
          alt="Picture of quiz app"
        />
        <h1 className="font-bold text-white text-3xl">QUIZ APP</h1>
      </div>
    );
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;

import { useRouter } from 'next/navigation'; 
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { RootState } from "@/redux/store";

export const useAuth = (redirectTo = "/") => {
    const router = useRouter();
    const { token } = useSelector((state : RootState) => state.authenticate);

    useEffect(() => {
        const isLoggingOut = localStorage.getItem("loggingOut");
        if (!token) {
            if (isLoggingOut) {
                localStorage.removeItem("loggingOut"); // Clear flag
                return;
            }
            toast.error("Login first");
            router.push(redirectTo)
        }
    }, [token]);

    return token; 

};


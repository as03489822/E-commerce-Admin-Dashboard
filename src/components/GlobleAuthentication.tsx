import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export const Auth = (redirectTo = "/") => {
    const router = useRouter();
    const { token } = useSelector(state => state.authenticate);

    useEffect(() => {
        if (!token) {
            toast.error("Login first");
            router.push(redirectTo)
        }
    }, [token]);

    return token; 
};  

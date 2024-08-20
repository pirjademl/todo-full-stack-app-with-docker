import { useEffect, useState } from "react";

const usePostData = (url: string, params: any, method: string) => {
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    useEffect(() => {
        async function sendData() {
            try {
                const response = await fetch(url, {
                    method: method,
                    body: params,
                });
                if (response.ok) {
                    setisLoading(false);
                    setIsSuccessful(true);
                }
            } catch (error) {
                setisLoading(false);
                setisError(true);
            } finally {
                setisLoading(false);
            }
        }
        sendData();
    }, [url, params]);
    return { isLoading, isError, isSuccessful };
};
export { usePostData };

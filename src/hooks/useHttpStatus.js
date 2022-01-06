import { useState, useCallback } from "react";
const useHttpStatus = () => {
    const [httpStatus, setHttpStatus] = useState([]);
    //loading functionality
    const loadingStatus = useCallback(({ type, id = -1 }) => {
        setHttpStatus((existingStatus) => {
            const findIndexNo = existingStatus.findIndex((item) => item.type === type && item.id === id);
            const data = { type, status: 'REQUEST', id };

            if (findIndexNo == -1) {
                return [...existingStatus, data]
            }
            return [...existingStatus.slice(0, findIndexNo), data, ...existingStatus.slice(findIndexNo + 1)];
        });
    }, []);

    const successStatus = useCallback(({ type, id = -1 }) => {
        setHttpStatus((existingStatus) =>
            existingStatus.filter((item) => !(item.type === type && item.id === id))
        );
    }, []);

    const errorStatus = useCallback(({ type, payload, id = -1 }) => {
        setHttpStatus((existingStatus) =>
            existingStatus.map((item) => {
                if (item.type === type && item.id === id) {
                    return { ...item, status: 'FAIL', payload };
                }
                return item;
            }),
        );
    }, []);

    return { httpStatus, loadingStatus, successStatus, errorStatus }
}
export default useHttpStatus;
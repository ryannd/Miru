import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export default function useUser(){
    const { data, mutate, error } = useSWR('/api/anilist/user');

    const loading = !data;
    const loggedOut = data && data.errors;

    return {
        loading,
        loggedOut,
        user: data,
        mutate
    }
}
import api from "./api";

export const postChat = async (message: string) => {
    // encodeURIComponent is important for passing strings in URL
    const res = await api.post(`/chat/post-chat/${encodeURIComponent(message)}`);
    return res.data?.content || res.data || "I didn't get a proper response.";
}
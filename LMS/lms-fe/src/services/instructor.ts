import api from "./api";

export const getInstructors = async () => {
    const res = await api.get("/instructor/get-all-instructors");
    return res.data;
}

export const addInstructor = async (instructor: any) => {
    const res = await api.post("/instructor/add-instructor", instructor);
    return res.data;
}   

export const updateInstructor = async (instructor: any) => {
    const res = await api.put("/instructor/update-instructor", instructor);
    return res.data;
}   

export const deleteInstructor = async (instructorId: string) => {
    const res = await api.delete("/instructor/delete-instructor", { data: { instructorId } });
    return res.data;
}
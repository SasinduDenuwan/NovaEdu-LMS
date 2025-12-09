import api from "./api";

export const getAllCourses = async () => {
    const res = await api.get("/course/get-all-courses");
    return res.data;
}

export const addCourse = async (course: any) => {
    const res = await api.post("/course/add-course", course);
    return res.data;
}   

export const updateCourse = async (course: any) => {
    const res = await api.put("/course/update-course", course);
    return res.data;
}   

export const deleteCourse = async (courseId: string) => {
    const res = await api.delete("/course/delete-course", { data: { courseId } });
    return res.data;
}
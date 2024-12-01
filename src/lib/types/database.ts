export interface Student {
    id: string;
    stud_Fname: string;
    stud_Mname?: string;
    stud_Lname: string;
    stud_yr: number;
    program: string;
    stud_email: string;
    login_pw: string;
    advisor: string;
    status: string;
    address: string;
    contact_num: string;
}

export interface Advisor {
    id: string;
    name: string;
    email: string;
    department: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
